import { readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import c from 'ansi-colors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  type BenchCase,
  type BenchResult,
  printResults,
  runBench,
} from './harness.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rulesDir = path.join(__dirname, 'rules');
const BENCH_EXT = '.bench.ts';

/** Every rule name that has a bench/rules/<name>.bench.ts file. */
function discoverRuleNames(): string[] {
  return readdirSync(rulesDir)
    .filter(f => f.endsWith(BENCH_EXT))
    .map(f => f.slice(0, -BENCH_EXT.length))
    .sort();
}

/**
 * Expands a comma-separated `-s` value into actual rule names.
 * "all" / "none" are special-cased (case-insensitively); otherwise each
 * comma-separated item is either an exact name or a wildcard pattern - a
 * leading and/or trailing "*" matches by suffix / prefix / substring, e.g.
 * "isDate*", "*Address", "*is*". Matching is always case-insensitive
 * (rule names are the validator's function name, e.g. "isDefined"), but the
 * original casing from `all` is what's returned.
 */
function resolveList(value: string, all: readonly string[]): string[] {
  const valueLower = value.toLowerCase();
  if (valueLower === 'all') return [...all];
  if (valueLower === 'none') return [];
  const items = valueLower
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  for (const item of items) {
    const matches = all.filter(v => {
      const vLower = v.toLowerCase();
      return item.startsWith('*') && item.endsWith('*')
        ? vLower.includes(item.replaceAll('*', ''))
        : item.startsWith('*')
          ? vLower.endsWith(item.replaceAll('*', ''))
          : item.endsWith('*')
            ? vLower.startsWith(item.replaceAll('*', ''))
            : vLower === item;
    });
    matches.forEach(v => seen.add(v));
  }
  return Array.from(seen);
}

async function main(): Promise<void> {
  const ruleNames = discoverRuleNames();

  const argv = await yargs(hideBin(process.argv))
    .scriptName('bench')
    .usage('$0 [options]')
    .option('rule', {
      alias: 's',
      type: 'string',
      default: 'all',
      describe:
        'Comma-separated rule names, "all", or "none" - case-insensitive, ' +
        'a leading and/or trailing "*" matches by prefix/suffix/substring, ' +
        `e.g. "isDefined*" (${ruleNames.join(', ')})`,
    })
    .strict()
    .help()
    .parse();

  const selected = resolveList(argv.rule, ruleNames);
  if (selected.length === 0) {
    console.error(
      c.red(
        `No rule matched "${argv.rule}". Available: ${ruleNames.join(', ')}`,
      ),
    );
    process.exitCode = 1;
    return;
  }

  console.log(c.bold.cyan(`Benchmarking: ${selected.join(', ')}`) + '\n');

  const results: BenchResult[] = [];
  for (const name of selected) {
    const mod = (await import(
      pathToFileURL(path.join(rulesDir, `${name}${BENCH_EXT}`)).href
    )) as {
      cases: BenchCase[];
    };
    for (const benchCase of mod.cases) {
      results.push(runBench(benchCase));
    }
  }
  printResults(results);
}

main().catch(err => {
  console.error(c.red(String(err?.stack ?? err)));
  process.exit(1);
});
