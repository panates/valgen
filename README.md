# VALGEN

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![CI Tests][ci-test-image]][ci-test-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Fast runtime type validator, converter and io (encoding/decoding) library for TypeScript and
JavaScript.

- **Composable** - build complex schemas out of small validators with `allOf`, `oneOf`, `pipe`,
  `optional`, `nullable`, `isObject`, `isArray`, ...
- **Coercing** - most rules can convert compatible input (`"42"` -> `42`, `"true"` -> `true`, ...)
  instead of just rejecting it, via the `coerce` option.
- **Two calling conventions** - call a validator directly and catch a `ValidationError`, or use
  `.silent(...)` to get back `{ value }` / `{ errors }` without throwing.
- **Typed** - every validator infers its output type, so a passing call narrows the type of its
  return value.
- **Fast** - the core dispatch path and every rule are covered by a dedicated benchmark suite (see
  [Benchmarking](#benchmarking) below); performance regressions are something this project
  actively measures, not just hopes for.

## Installation

```sh
npm install valgen --save
```

## Quick start

```ts
import { vg, isEmail, ValidationError } from 'valgen';

// Individual, ready-to-use validators
isEmail('a@b.com'); // => 'a@b.com'
isEmail('not-an-email'); // throws ValidationError

// A full object schema, built from composable rules
const userSchema = vg.isObject({
  id: vg.isUUID(),
  email: vg.isEmail(),
  age: vg.optional(vg.pipe([vg.isNumber({ coerce: true }), vg.isGt(0)])),
  role: vg.isEnum(['admin', 'user']),
});

try {
  const user = userSchema({
    id: 'e6a3b1c0-70b6-4a3e-9b34-1e2f2e3d1a11',
    email: 'a@b.com',
    age: '30', // coerced to a number
    role: 'admin',
  });
} catch (e) {
  if (e instanceof ValidationError) {
    console.error(e.issues); // one entry per failing field
  }
}

// Or avoid the try/catch entirely
const result = userSchema.silent({ email: 'not-an-email' });
if (result.errors) {
  // result.errors: ErrorIssue[]
}
```

## Documentation

The full API reference lives under [`docs/`](docs/api.md):

- **[API overview](docs/api.md)** - the `Validator` shape, `.silent()`, pre-built instances vs.
  factories, `ExecutionOptions`, error shape, composition patterns, and how to write a custom rule.
- **[Type Rules](docs/api/type-rules.md)** - `isString`, `isNumber`, `isObject`, `isArray`,
  `isTuple`, `isEnum`, `isDate`, `isRecord`, `isInstanceOf`, ...
- **[Logical Rules](docs/api/logical-rules.md)** - `isEqual`, `isGt`/`isGte`/`isLt`/`isLte`,
  `range`, `lengthMin`/`lengthMax`, `isEmpty`/`isNotEmpty`, `isDefined`.
- **[Utility Rules](docs/api/utility-rules.md)** - `allOf`, `oneOf`, `pipe`, `optional`,
  `nullable`, `required`, `fixed`, `getLength`, `forwardRef`, `iif`, string helpers.
- **[Format Rules](docs/api/format-rules.md)** - `isEmail`, `isURL`, `isUUID`, `isIBAN`,
  `isMACAddress`, `isCreditCard`, and every other string-format check.

## Scripts

| Command | Description |
|---|---|
| `npm test` | Run the test suite (mocha). |
| `npm run citest` | Run the test suite with coverage (c8). |
| `npm run qc` | Lint + circular-dependency check. |
| `npm run bench` | Run the benchmark suite (see below). |
| `npm run build` | Type-check and compile to `build/`. |

## Benchmarking

Every validator rule has a dedicated benchmark case measuring throughput (ops/sec) and per-call
memory allocation (heap/RSS), under `benchmark/rules/`.

```sh
# Run every rule
npm run bench

# Run one or more rules (case-insensitive, comma-separated, "*" wildcards allowed)
npm run bench -- -s isEmail,isURL
npm run bench -- -s "is*"
```

Results print to the console as they complete and are also written to [`BENCHMARKS.md`](BENCHMARKS.md)
at the end of the run.

## Node Compatibility

- node `>= 20.0`

### License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/valgen
[npm-url]: https://npmjs.org/package/valgen
[downloads-image]: https://img.shields.io/npm/dm/valgen.svg
[downloads-url]: https://npmjs.org/package/valgen
[ci-test-image]: https://github.com/panates/valgen/actions/workflows/test.yml/badge.svg
[ci-test-url]: https://github.com/panates/valgen/actions/workflows/test.yml
[coveralls-image]: https://img.shields.io/coveralls/panates/valgen/master.svg
[coveralls-url]: https://coveralls.io/r/panates/valgen
