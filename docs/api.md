# API Reference

<!--
docs-baseline:
  Everything under docs/api.md and docs/api/*.md was written and verified (every
  signature/option/example checked against source and test/**/*.spec.ts, or run
  directly against the library) as of the commit and package version below.

  git-commit: f6c54906b3fc94b37401ac7b94788ff58ccea51b
  package-version: 7.0.0
  date: 2026-09-10

  To refresh after later changes: `git diff f6c54906b3fc94b37401ac7b94788ff58ccea51b..HEAD -- src/`
  (or a narrower path for one category) to see what moved since this baseline, update the
  affected doc section(s), then bump git-commit/package-version/date above to the new HEAD.
-->

valgen validators all share the same small set of conventions. This page covers those shared
conventions once; the per-category pages document every individual validator function.

- [Type Rules](./api/type-rules.md) - primitive/shape checks: `isString`, `isNumber`, `isObject`, `isArray`, `isTuple`, `isEnum`, `isDate`, ...
- [Logical Rules](./api/logical-rules.md) - comparisons and constraints: `isEqual`, `isGt`, `range`, `lengthMin`, `isEmpty`, ...
- [Utility Rules](./api/utility-rules.md) - combinators that compose other validators: `allOf`, `oneOf`, `pipe`, `optional`, `nullable`, `required`, ...
- [Format Rules](./api/format-rules.md) - string format checks: `isEmail`, `isURL`, `isUUID`, `isIBAN`, `isMACAddress`, ...

## The `Validator` shape

Every validator - whether a pre-built instance or one you construct with `vg.xxx(...)` - is a
callable with the same shape:

```ts
interface Validator<T, I = T> {
  (input: I, options?: ExecutionOptions, context?: Context): T;
  silent(input: I, options?: ExecutionOptions, context?: Context): { value?: T; errors?: ErrorIssue[] };
  id: string;
}
```

- **Calling it directly** validates `input` and either returns the (possibly coerced) value or
  throws a `ValidationError`.
- **`.silent(...)`** never throws - it returns `{ value }` on success or `{ errors }` on failure.
  Use this at API boundaries where you want to turn a validation result into e.g. an HTTP 400
  response without a try/catch.

```ts
import { isEmail } from 'valgen';

isEmail('a@b.com'); // => 'a@b.com'
isEmail('not-an-email'); // throws ValidationError

const result = isEmail.silent('not-an-email');
// => { errors: [{ message: '...', rule: 'isEmail', value: 'not-an-email' }] }
```

## Pre-built instances vs. factories

Every rule is available as a **factory** through the `vg` namespace, and factories are the only
way to use a rule that needs a required argument or non-default options:

```ts
import { vg } from 'valgen';

const validateAge = vg.isGt(0);
const validateRole = vg.isEnum(['admin', 'user']);
const validateId = vg.isUUID(4); // UUID v4 only
```

Rules that need **no** arguments and use default options are *also* re-exported as ready-to-use,
already-constructed instances directly from the package root - these are the same kind of
`Validator` object, just pre-built for convenience:

```ts
import { isString, isEmail, isUUID } from 'valgen';

isString('hello');
isEmail('a@b.com');
isUUID('e6a3b1c0-...'); // accepts any UUID version
```

**A pre-built export is not a factory.** `isString` above is already a validator - calling
`isString(x)` validates `x`. It is *not* `isString()(x)`. Each per-category page marks every
function as **Pre-built** or **Factory only** so you don't have to guess or check `src/index.ts`
yourself. Calling a factory-only function directly with your input (e.g. `isEnum(input)` instead
of `vg.isEnum(['a','b'])(input)`) will not raise a type error for `any`-typed input, but will
validate the wrong thing - it validates `input` as if it were the factory's *options argument*.

## `ExecutionOptions`

Every validator call accepts an options object as its second argument, on top of whatever
rule-specific options a given function documents:

| Option | Type | Description |
|---|---|---|
| `coerce` | `boolean` | When supported by the rule, convert compatible input into the target type instead of rejecting it (e.g. `"42"` -> `42` for `isNumber({ coerce: true })`). |
| `label` | `string` | A human-readable name for the value, used in error messages (`{{label}}` template) instead of the raw property name. |
| `maxErrors` | `number` | Stop collecting further issues once this many have been recorded for the current validation run (throws immediately instead of continuing to accumulate). Defaults to unlimited. |
| `onFail` | `(issue, context) => string \| Partial<ErrorIssue>` | Intercepts a failure before it's recorded - return a string to replace the message, an object to patch the issue, or a falsy value to suppress the issue entirely. |

## Errors

A failed validation throws a `ValidationError` (extends `Error`) carrying an `issues: ErrorIssue[]`
array - one entry per failure (there can be more than one if `isObject` validates several
properties, for example):

```ts
interface ErrorIssue {
  message: string;
  rule: string; // the failing validator's id, e.g. "isEmail"
  value: any; // the offending value
  location?: string; // dotted path, e.g. "user.email", for nested validators
  label?: string;
  // ...
}
```

## Composing validators

Rules are designed to compose. A few common patterns:

```ts
import { vg } from 'valgen';

// Optional field that must be a valid email when present
const email = vg.optional(vg.isEmail());

// One of several shapes
const id = vg.oneOf([vg.isNumber(), vg.isUUID()]);

// A pipeline: trim, then require non-empty
const name = vg.pipe([vg.trim(), vg.isNotEmpty()]);

// A full object schema
const userSchema = vg.isObject({
  id: vg.isUUID(),
  email: vg.isEmail(),
  role: vg.optional(vg.isEnum(['admin', 'user'])),
});
```

See [Utility Rules](./api/utility-rules.md) for the full list of combinators (`allOf`, `oneOf`,
`pipe`, `nullable`, `optional`, `required`, `forwardRef`, `iif`, ...).

## Writing a custom validator

Every rule in this library - and any rule you write yourself - is built with the same `validator()`
factory:

```ts
import { validator, type Context, type Nullish, type ValidationOptions } from 'valgen';

function isEven(options?: isEven.Options) {
  return validator<number, unknown>(
    isEven.name,
    (input: unknown, context: Context, _this): Nullish<number> => {
      if (input == null) return input as any;
      const n = Number(input);
      if (Number.isInteger(n) && n % 2 === 0) return n;
      context.fail(_this, 'Value must be an even number', input);
    },
    options,
  );
}

namespace isEven {
  export interface Options extends ValidationOptions {}
}

const validate = isEven();
validate(4); // => 4
validate(3); // throws ValidationError
```

The function you pass to `validator()` receives `(input, context, _this)` (`_this` is the
validator itself, used to attribute errors to the right rule) and should either `return` the
validated (or coerced) value, or call `context.fail(_this, message, value)` to record an issue -
`validator()`'s wrapper takes care of turning accumulated issues into a thrown `ValidationError`
(or a `.silent()` result) for you.
