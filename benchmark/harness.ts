import { performance } from 'node:perf_hooks';
import c from 'ansi-colors';

/**
 * A single thing to measure. `fn` is called with no arguments once per
 * iteration and should do the actual work (e.g. call a validator).
 */
export interface BenchCase {
  name: string;
  fn: () => void;
}

export interface BenchOptions {
  /** Wall-clock time (ms) to spend warming up before timing starts. */
  warmupDurationMs?: number;
  /** Number of timed rounds used to compute mean/variance of ops/sec. */
  rounds?: number;
  /** Wall-clock time (ms) each round targets - iteration count adapts to it. */
  roundDurationMs?: number;
  /** Wall-clock time (ms) targeted for the dedicated memory-measurement pass. */
  memoryDurationMs?: number;
}

export interface BenchResult {
  name: string;
  /** Total iterations across all timed rounds. */
  iterations: number;
  rounds: number;
  opsPerSecondMean: number;
  opsPerSecondStdDev: number;
  /** Relative margin of error, i.e. how noisy the timing measurement is (%). */
  relativeMarginOfError: number;
  meanTimeNs: number;
  /** Average bytes of V8 heap retained per call, measured over a dedicated GC'd pass. */
  heapUsedPerOpBytes: number;
  /** Average bytes of RSS growth per call, over the same dedicated pass. */
  rssPerOpBytes: number;
  /** Whether `global.gc()` was available (via --expose-gc) for the memory pass. */
  gcForced: boolean;
}

const DEFAULTS: Required<BenchOptions> = {
  warmupDurationMs: 100,
  rounds: 5,
  roundDurationMs: 150,
  memoryDurationMs: 200,
};

function forceGc(): boolean {
  const gc = (globalThis as unknown as { gc?: () => void }).gc;
  if (typeof gc === 'function') {
    gc();
    return true;
  }
  return false;
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stdDev(values: number[], avg: number): number {
  if (values.length < 2) return 0;
  const variance =
    values.reduce((a, v) => a + (v - avg) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

const MIN_CALIBRATION_ITERATIONS = 1000;
const MIN_CALIBRATION_DURATION_MS = 10;
/** Roughly how much work (ms) to do between two elapsed-time checks. */
const CHECK_SLICE_MS = 2;
const MAX_CHECK_INTERVAL = 100_000;

/**
 * Measures roughly how long a single call to `fn` takes (checking the clock
 * after every call, so even a pathologically slow `fn` can't overshoot this
 * by more than one extra call) and derives how many calls make up about
 * `CHECK_SLICE_MS` of work. Run once per bench case; the same interval is
 * then reused for every round and the memory pass, so `performance.now()`
 * is checked on a consistent, stable cadence throughout - recalibrating on
 * every single call was itself a source of round-to-round noise.
 */
function calibrateCheckInterval(fn: () => void): number {
  const start = performance.now();
  let iterations = 0;
  let elapsedMs = 0;
  while (
    iterations < MIN_CALIBRATION_ITERATIONS &&
    elapsedMs < MIN_CALIBRATION_DURATION_MS
  ) {
    fn();
    iterations++;
    elapsedMs = performance.now() - start;
  }
  const avgMsPerIter = elapsedMs / iterations;
  if (avgMsPerIter <= 0) return MAX_CHECK_INTERVAL;
  return Math.min(
    MAX_CHECK_INTERVAL,
    Math.max(1, Math.round(CHECK_SLICE_MS / avgMsPerIter)),
  );
}

/**
 * Runs `fn` repeatedly until `targetDurationMs` of wall-clock time has
 * elapsed - iteration count adapts to how fast `fn` is, it is never a fixed
 * count. `checkInterval` (from `calibrateCheckInterval`) bounds how far a
 * round can overshoot its time budget: about `checkInterval` calls' worth,
 * which is ~`CHECK_SLICE_MS` regardless of how fast or slow `fn` is.
 */
function runForDuration(
  fn: () => void,
  targetDurationMs: number,
  checkInterval: number,
): { iterations: number; elapsedMs: number } {
  const start = performance.now();
  let iterations = 0;
  let elapsedMs = 0;
  while (elapsedMs < targetDurationMs) {
    for (let i = 0; i < checkInterval; i++) fn();
    iterations += checkInterval;
    elapsedMs = performance.now() - start;
  }
  return { iterations, elapsedMs };
}

/**
 * Measures throughput (ops/sec, across several rounds for statistical
 * stability) and average per-call memory footprint (heapUsed/RSS growth
 * over a dedicated, GC-bounded pass) for a single benchmark case.
 */
export function runBench(
  benchCase: BenchCase,
  options: BenchOptions = {},
): BenchResult {
  const opts = { ...DEFAULTS, ...options };
  const { fn } = benchCase;

  // Calibrate once so every phase below checks the clock on the same,
  // stable cadence (recalibrating per-phase was itself a source of noise).
  const checkInterval = calibrateCheckInterval(fn);

  // Warm up so the JIT has stabilized before we start timing.
  runForDuration(fn, opts.warmupDurationMs, checkInterval);

  // --- Timing: multiple rounds, so we can report a mean and a margin of error ---
  const roundOpsPerSecond: number[] = [];
  let totalIterations = 0;
  let totalElapsedMs = 0;
  for (let r = 0; r < opts.rounds; r++) {
    const { iterations, elapsedMs } = runForDuration(
      fn,
      opts.roundDurationMs,
      checkInterval,
    );
    totalIterations += iterations;
    totalElapsedMs += elapsedMs;
    roundOpsPerSecond.push(iterations / (elapsedMs / 1000));
  }
  const opsPerSecondMean = mean(roundOpsPerSecond);
  const opsPerSecondStdDev = stdDev(roundOpsPerSecond, opsPerSecondMean);
  // 95% CI-ish margin of error, expressed relative to the mean.
  const relativeMarginOfError =
    opsPerSecondMean > 0
      ? ((1.96 * (opsPerSecondStdDev / Math.sqrt(roundOpsPerSecond.length))) /
          opsPerSecondMean) *
        100
      : 0;
  const meanTimeNs = (totalElapsedMs * 1_000_000) / totalIterations;

  // --- Memory: a separate, GC-bounded, duration-targeted pass ---
  const gcForced = forceGc();
  const heapBefore = process.memoryUsage().heapUsed;
  const rssBefore = process.memoryUsage().rss;
  const { iterations: memoryIterations } = runForDuration(
    fn,
    opts.memoryDurationMs,
    checkInterval,
  );
  forceGc();
  const heapAfter = process.memoryUsage().heapUsed;
  const rssAfter = process.memoryUsage().rss;

  const heapUsedPerOpBytes = (heapAfter - heapBefore) / memoryIterations;
  const rssPerOpBytes = (rssAfter - rssBefore) / memoryIterations;

  return {
    name: benchCase.name,
    iterations: totalIterations,
    rounds: opts.rounds,
    opsPerSecondMean,
    opsPerSecondStdDev,
    relativeMarginOfError,
    meanTimeNs,
    heapUsedPerOpBytes,
    rssPerOpBytes,
    gcForced,
  };
}

function formatOps(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

type TimeUnit = 'ns' | 'µs' | 'ms';

/**
 * Picks a single time unit for the whole "mean time" column, based on the
 * largest value in the set - so every row is comparable at a glance instead
 * of silently switching units row to row (e.g. "24.9 ns" next to "3.13 µs").
 */
function pickTimeUnit(maxNs: number): TimeUnit {
  if (maxNs < 1000) return 'ns';
  if (maxNs < 1_000_000) return 'µs';
  return 'ms';
}

function formatTime(n: number, unit: TimeUnit): string {
  if (unit === 'ns') return n.toFixed(1);
  if (unit === 'µs') return (n / 1000).toFixed(2);
  return (n / 1_000_000).toFixed(2);
}

/** Colors the "±X.XX%" margin-of-error suffix by how noisy it is. */
function formatMarginOfError(pct: number, colorize = true): string {
  const text = `±${pct.toFixed(2)}%`;
  if (!colorize) return text;
  if (pct < 2) return c.green(text);
  if (pct < 10) return c.yellow(text);
  return c.red(text);
}

type ByteUnit = 'B' | 'KB';

/**
 * Picks a single byte unit shared by BOTH the "heap/op" and "rss/op"
 * columns, for the same reason as `pickTimeUnit` - one unit per table, not
 * one per cell.
 */
function pickByteUnit(maxAbsBytes: number): ByteUnit {
  return maxAbsBytes >= 1024 ? 'KB' : 'B';
}

/** Colors a byte figure: near-zero (likely GC noise) is dim, real growth stands out. */
function formatBytes(n: number, unit: ByteUnit, colorize = true): string {
  const abs = Math.abs(n);
  const magnitude = unit === 'B' ? abs.toFixed(0) : (abs / 1024).toFixed(2);
  // Rounds-to-zero deltas are just GC noise, not a real shrink - a "-0"
  // would wrongly suggest a meaningful direction, so drop the sign.
  const isZero = Number(magnitude) === 0;
  const text = `${n < 0 && !isZero ? '-' : ''}${magnitude}`;
  if (!colorize) return text;
  if (abs < 64) return c.dim(text);
  if (abs >= 1024) return c.yellow(text);
  return text;
}

const visibleLength = (s: string): number => c.unstyle(s).length;

function padVisual(
  s: string,
  width: number,
  align: 'left' | 'right' = 'left',
): string {
  const padding = ' '.repeat(Math.max(0, width - visibleLength(s)));
  return align === 'right' ? padding + s : s + padding;
}

/**
 * Renders a results table with ANSI colors (fastest case highlighted, noisy
 * measurements flagged, near-zero memory figures dimmed). Column widths are
 * computed from the visible (un-colored) text so alignment stays correct
 * despite the embedded escape codes - `console.table` can't do that itself.
 */
export function printResults(results: BenchResult[]): void {
  const gcAvailable = results.every(r => r.gcForced);
  if (!gcAvailable) {
    console.log(
      c.yellow(
        '⚠ --expose-gc not enabled: memory numbers are approximate. ' +
          'Run with `node --expose-gc ...` for more reliable figures.',
      ) + '\n',
    );
  }
  if (results.length === 0) return;

  const fastestOps = Math.max(...results.map(r => r.opsPerSecondMean));
  const timeUnit = pickTimeUnit(Math.max(...results.map(r => r.meanTimeNs)));
  const byteUnit = pickByteUnit(
    Math.max(
      ...results.map(r => Math.abs(r.heapUsedPerOpBytes)),
      ...results.map(r => Math.abs(r.rssPerOpBytes)),
    ),
  );

  const headers = [
    'name',
    'ops/sec',
    `mean time (${timeUnit})`,
    `heap/op (${byteUnit})`,
    `rss/op (${byteUnit})`,
    'samples',
  ];
  const rows = results.map(r => {
    const opsText = `${formatOps(r.opsPerSecondMean)} ${formatMarginOfError(r.relativeMarginOfError)}`;
    return [
      c.cyan(r.name),
      r.opsPerSecondMean === fastestOps ? c.bold.green(opsText) : opsText,
      formatTime(r.meanTimeNs, timeUnit),
      formatBytes(r.heapUsedPerOpBytes, byteUnit),
      formatBytes(r.rssPerOpBytes, byteUnit),
      r.iterations.toLocaleString('en-US'),
    ];
  });

  const widths = headers.map((h, i) =>
    Math.max(visibleLength(h), ...rows.map(row => visibleLength(row[i]))),
  );
  // Every column is a number except the case name - right-align those so the
  // digits line up in a column instead of ragging on the left.
  const aligns: ('left' | 'right')[] = headers.map((_, i) =>
    i === 0 ? 'left' : 'right',
  );

  const renderRow = (cells: string[]): string =>
    '  ' +
    cells.map((cell, i) => padVisual(cell, widths[i], aligns[i])).join('   ');

  console.log(renderRow(headers.map(h => c.bold(h))));
  console.log('  ' + widths.map(w => c.dim('─'.repeat(w))).join('   '));
  for (const row of rows) console.log(renderRow(row));
}

/**
 * Renders results as a plain-text (no ANSI) GitHub-flavored Markdown table,
 * one row per case, in the same column layout as `printResults`.
 */
export function resultsToMarkdown(results: BenchResult[]): string {
  if (results.length === 0) return '_No benchmark results._\n';

  const timeUnit = pickTimeUnit(Math.max(...results.map(r => r.meanTimeNs)));
  const byteUnit = pickByteUnit(
    Math.max(
      ...results.map(r => Math.abs(r.heapUsedPerOpBytes)),
      ...results.map(r => Math.abs(r.rssPerOpBytes)),
    ),
  );

  const headers = [
    'Name',
    'Ops/sec',
    `Mean time (${timeUnit})`,
    `Heap/op (${byteUnit})`,
    `RSS/op (${byteUnit})`,
    'Samples',
  ];
  const rows = results.map(r => [
    r.name,
    `${formatOps(r.opsPerSecondMean)} (${formatMarginOfError(r.relativeMarginOfError, false)})`,
    formatTime(r.meanTimeNs, timeUnit),
    formatBytes(r.heapUsedPerOpBytes, byteUnit, false),
    formatBytes(r.rssPerOpBytes, byteUnit, false),
    r.iterations.toLocaleString('en-US'),
  ]);

  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map((_, i) => (i === 0 ? ':---' : '---:')).join(' | ')} |`,
    ...rows.map(row => `| ${row.join(' | ')} |`),
  ];
  return lines.join('\n') + '\n';
}
