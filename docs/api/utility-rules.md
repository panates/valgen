# Utility Rules

Utility rules are combinators and helpers that compose, wrap, or transform other validators rather than checking a primitive type themselves.

## allOf

Runs every rule in the list against the same original input and requires all of them to pass.

**Availability:** Factory only (`vg.allOf(...)`) — not in the pre-built export list in `src/index.ts`.

**Signature**
```ts
allOf<T = any>(rules: Validator[], options?: allOf.Options): Validator<T>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| *(none of its own)* | — | — | `allOf.Options` only extends the shared `ValidationOptions` (`coerce`, `onFail`) — no `allOf`-specific options. |

**Behavior**
- Calls every rule with the *same, unchanged* `input` (unlike `pipe`, it does not feed one rule's output into the next).
- Does **not** short-circuit: every rule in the list is evaluated even after an earlier one has already failed, so a failing input can surface issues from multiple rules at once.
- Returns the original `input` unchanged if all rules pass.
- If one or more rules fail, the accumulated failures are thrown together as a single `ValidationError` when the outermost call completes.

**Example**
```ts
import { isNumber, vg } from 'valgen';

// must be a number AND greater than 5 AND less than 10
const codec = vg.allOf([isNumber, vg.isGt(5), vg.isLt(10)]);

codec(6); // => 6
codec('x'); // throws: "Value must be a number"
codec(5); // throws: "... must be greater than ..."
codec(10); // throws: "... must be lower than ..."
```

## exists

Checks that a property is present on its parent object, independent of whether its value is `undefined`.

**Availability:** Factory only (`vg.exists(...)`).

**Signature**
```ts
exists(options?: exists.Options): Validator<unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| *(none of its own)* | — | — | `exists.Options` only extends the shared `ValidationOptions` — no `exists`-specific options. |

**Behavior**
- Passes when `input !== undefined` (any defined value, including `null` or `0`, is fine).
- When `input === undefined`, it still passes if the surrounding object explicitly *has* the property (checked via `Object.getOwnPropertyDescriptor` on `context.scope`/`context.property`) — this only works when `exists()` is nested inside an object schema (e.g. `vg.isObject({...})`) that populates `context.scope`/`context.property`; used standalone, an `undefined` input always fails.
- Fails with `` `{{label}}` must exist `` (rendered as e.g. `` `a` must exist ``, or `Value must exist` at the root) when the property is truly absent.

**Example**
```ts
import { vg } from 'valgen';

vg.exists()(0); // => 0
vg.exists()(null); // => null
vg.exists()(undefined); // throws: "Value must exist"

const objVal = vg.isObject({ a: vg.exists() });
objVal({ a: 1 }); // => { a: 1 }
objVal({}); // throws: "`a` must exist"
```

## fixed

Ignores whatever input it is given and always returns the same constant value.

**Availability:** Factory only (`vg.fixed(...)`).

**Signature**
```ts
fixed<T, I>(value: T): Validator<T, I>
```

**Behavior**
- Never inspects or validates `input` and never calls `context.fail` — it always succeeds.
- Always returns the exact `value` passed to the factory, regardless of what is passed in at call time.
- Useful for injecting a constant field into an object schema, or as the "otherwise" branch of another combinator (e.g. `iif`).

**Example**
```ts
import { vg } from 'valgen';

vg.fixed(0)(1); // => 0
vg.fixed(null)(1); // => null
```

## getLength

Extracts a numeric length or size from a string, array, `ArrayBuffer`, `Set`/`Map`, or any object exposing a `length`/`size` property.

**Availability:** Factory only (`vg.getLength(...)`).

**Signature**
```ts
getLength(): Validator<number, string | any[] | ArrayBuffer | { length: number } | { size: number }>
```

**Behavior**
- Returns `input.length` for strings and arrays.
- Returns `input.byteLength` for an `ArrayBuffer`.
- Returns `input.length` for any object exposing a numeric `length` property (checked before `size`).
- Otherwise returns `input.size` for any object exposing a numeric `size` property — this covers `Set` and `Map`, even though the JSDoc comment on the source only mentions "Array, String, ArrayBuffer, Buffer or any object with the 'length' property" and doesn't call out `size`-based objects.
- Fails with `Unable to get length` for anything else (e.g. numbers, booleans, plain objects without `length`/`size`).
- Takes no options; it's typically piped into a comparison rule to enforce a min/max length.

**Example**
```ts
import { vg } from 'valgen';

vg.getLength()('1234'); // => 4
vg.getLength()([1, 2, 3, 4]); // => 4
vg.getLength()(new ArrayBuffer(4)); // => 4
vg.getLength()(new Set([1, 2, 3, 4])); // => 4
vg.getLength()(new Map([['a', 1], ['b', 2]])); // => 2
vg.getLength()({ length: 4 }); // => 4

// combine with a comparison rule to enforce a minimum length
const minLength3 = vg.pipe([vg.getLength(), vg.isGte(3)]);
minLength3('ab'); // throws (length 2 < 3)
```

## nullable

Wraps a rule so that `null` or `undefined` pass through untouched, and anything else is delegated to the nested rule.

**Availability:** Factory only (`vg.nullable(...)`).

**Signature**
```ts
nullable<T, I>(nested: Validator<T, I>, options?: nullable.Options): Validator<Nullish<T>, Nullish<I>>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| *(none of its own)* | — | — | `nullable.Options` only extends the shared `ValidationOptions` — no `nullable`-specific options. |

**Behavior**
- If `input == null` (i.e. `null` **or** `undefined`), it is returned as-is without ever calling the nested rule — despite the name, `nullable` tolerates both `null` and `undefined`, not just `null`.
- For any other input, delegates to `nested(input)` and returns/throws exactly what the nested rule does.

**Example**
```ts
import { isNumber, isString, vg } from 'valgen';

vg.nullable(isNumber)(0); // => 0
vg.nullable(isString)(''); // => ''
vg.nullable(isString)(undefined); // => undefined
vg.nullable(isString)(null); // => null
```

## oneOf

Tries a list of rules against the input in order and returns the result of the first one that passes.

**Availability:** Factory only (`vg.oneOf(...)`).

**Signature**
```ts
oneOf(rules: (Validator | [Validator, Record<string, Validator>])[], options?: oneOf.Options): Validator
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| *(none of its own)* | — | — | `oneOf.Options` only extends the shared `ValidationOptions` — no `oneOf`-specific options. |

**Behavior**
- Each entry is either a plain `Validator`, or a `[Validator, discriminatorRecord]` tuple.
- For a plain entry, `oneOf` calls it directly; if it throws or fails, it moves on to the next entry (short-circuits on the **first success**, not the first failure).
- For a `[validator, discriminator]` tuple, `input` must be an object. `oneOf` first runs each rule in `discriminator` against the matching property of `input` (e.g. `discriminator.kind(input.kind)`); only if **every** discriminator key passes does it go on to run the tuple's main `validator` against the whole `input`. If any discriminator key fails (or `input` isn't an object), that entry is skipped entirely — the main validator never runs — and `oneOf` moves to the next candidate. This lets you dispatch between differently-shaped objects using a cheap "tag" check (e.g. a `kind` field) instead of trying and catching a full shape validation for each candidate.
- An unexpected exception thrown by a discriminator or a rule (as opposed to a normal validation failure) is caught and treated the same as a failure — `oneOf` just moves on to the next candidate.
- If no entry passes, it fails with `Value didn't match one of required rules`.

**Example**
```ts
import { isNull, isNumber, isObject, isString, vg } from 'valgen';

// simple form: first rule that passes wins
const simple = vg.oneOf([isNull, isNumber]);
simple(6); // => 6
simple(null); // => null
simple('x'); // throws: "Value didn't match one of required rules"

// discriminated form: pick the object shape based on `kind`
const pet = vg.oneOf([
  isString,
  [isObject, { kind: vg.isEqual('dog') }],
  [isObject, { kind: vg.isEqual('cat') }],
  vg.isEqual(5),
]);
pet({ kind: 'cat', name: 'Molly' }); // => { kind: 'cat', name: 'Molly' }
pet({ kind: 'dog', name: 'Daisy' }); // => { kind: 'dog', name: 'Daisy' }
pet('Daisy'); // => 'Daisy'
pet(5); // => 5
pet({ kind: 'bird', name: 'Bluey' }); // throws: "Value didn't match one of required rules"
```

## optional

Wraps a rule so that `undefined` passes through untouched, and anything else (including `null`) is delegated to the nested rule.

**Availability:** Factory only (`vg.optional(...)`).

**Signature**
```ts
optional<T, I>(nested: Validator<T, I>, options?: optional.Options): Validator<Maybe<T>, Maybe<I>>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| *(none of its own)* | — | — | `optional.Options` only extends the shared `ValidationOptions` — no `optional`-specific options. |

**Behavior**
- If `input === undefined`, it is returned as-is without calling the nested rule.
- Unlike `nullable`, `null` is **not** special-cased — it is passed straight through to the nested rule, so `optional(x)(null)` fails unless `x` itself accepts `null`.
- For any other input, delegates to `nested(input)` and returns/throws exactly what the nested rule does.

**Example**
```ts
import { isNumber, isString, vg } from 'valgen';

vg.optional(isNumber)(0); // => 0
vg.optional(isString)(''); // => ''
vg.optional(isString)(undefined); // => undefined
vg.optional(isString)(null); // throws (null is not undefined, and isString rejects null)
```

## pipe

Chains a list of validators so that each one's output becomes the next one's input.

**Availability:** Factory only (`vg.pipe(...)`).

**Signature**
```ts
pipe<T>(rules: Validator[], options?: pipe.Options): Validator<T>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `returnIndex` | `number` | `undefined` (last step) | Return the intermediate output produced after `rules[returnIndex]` instead of the final step's output. All steps still run (and their results still feed forward into subsequent steps) — this only changes which intermediate value is handed back to the caller. |

**Behavior**
- Feeds the input through each rule in order: `rules[0]`'s output becomes `rules[1]`'s input, and so on.
- **Short-circuits** on the first rule that records a failure: as soon as a step adds to the shared context's error list, `pipe` stops immediately and does not run the remaining rules.
- If every rule succeeds, returns the last rule's output — or, if `returnIndex` is given, the output of that specific step (even though later steps still ran for validation purposes).

**Example**
```ts
import { isBoolean, isNumber, isString, vg } from 'valgen';

vg.pipe([isString, vg.matches(/^[a-z]+$/)])('abc'); // => 'abc'
vg.pipe([isString, vg.matches(/^[a-z]+$/)])('123'); // throws: "Value must match requested format"

// each step's output feeds the next: string -> number -> boolean
vg.pipe([isString, isNumber, isBoolean])(1, { coerce: true }); // => true

// returnIndex pins the result to an earlier step, while later steps still validate
vg.pipe([isString, isNumber, vg.isGte(5)], { returnIndex: 0 })('123', {
  coerce: true,
}); // => '123' (the string form, even though isNumber/isGte(5) ran too)
vg.pipe([isString, isNumber, vg.isGte(5)], { returnIndex: 1 })('123', {
  coerce: true,
}); // => 123
```

## required

Wraps a rule so that `null`/`undefined` input fails (or falls back to a default) before being handed to the nested rule.

**Availability:** Factory only (`vg.required(...)`).

**Signature**
```ts
required<T, I>(nested: Validator<T, I>, options?: RequiredValidatorOptions): Validator<Nullish<T>, I>
```
Note: unlike the other combinators here, the options type is not exposed as a `required.Options` namespace member — it's a standalone exported interface, `RequiredValidatorOptions`.

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `default` | `any` | `undefined` | Value substituted when `input` is `null` or `undefined`. The substituted default is then still run through the nested rule like any other input — it is not returned raw. |

**Behavior**
- If `input == null` (i.e. `null` or `undefined`) and `options.default` is set, `input` is replaced with `options.default`.
- If, after that substitution, `input` is still `null`/`undefined` (no default was configured, or the default itself is nullish), it fails with `Value required`.
- Otherwise, delegates to `nested(input)` — so a configured `default` must itself satisfy the nested rule, or validation still fails (just with the nested rule's own error instead of `Value required`).

**Example**
```ts
import { isNumber, isString, vg } from 'valgen';

vg.required(isNumber)(0); // => 0
vg.required(isString)(''); // => ''
vg.required(isString)(undefined); // throws: "Value required"
vg.required(isString)(null); // throws: "Value required"

// with a default value, substituted (and still validated) when input is nullish
vg.required(isNumber, { default: 0 })(undefined); // => 0
vg.required(isString, { default: 'hello world' })(undefined); // => 'hello world'
```

## stringReplace

Runs `String(input).replace(searchValue, replacer)`, mirroring `String.prototype.replace`.

**Availability:** Factory only (`vg.stringReplace(...)`).

**Signature**
```ts
stringReplace(
  searchValue: string | RegExp | { [Symbol.replace](...): string },
  replacer: string | ((substring: string, ...args: any[]) => string),
): Validator<string>
```

**Behavior**
- `null`/`undefined` input is passed through unchanged (the replace is skipped).
- Any other input is coerced with `String(input)` and then `.replace(searchValue, replacer)` is applied, exactly like the native method — `searchValue` can be a string, a `RegExp` (with or without the global flag), or any object implementing `Symbol.replace`, and the replacer can be a literal string or a substitution callback.
- Never fails/throws on its own; it always returns the replaced string (or the passed-through nullish value).

**Example**
```ts
import { vg } from 'valgen';

vg.stringReplace(/-/g, '_')('a-b'); // => 'a_b'
vg.stringReplace('-', '_')('a-b'); // => 'a_b'
vg.stringReplace('-', '_')(null); // => null
vg.stringReplace('-', '_')(undefined); // => undefined
```

## stringSplit

Runs `String(input).split(separator, limit)`, mirroring `String.prototype.split`.

**Availability:** Factory only (`vg.stringSplit(...)`).

**Signature**
```ts
stringSplit(
  separator: string | RegExp | { [Symbol.split](...): string[] },
  limit?: number,
): Validator<string[], string>
```

**Behavior**
- `null`/`undefined` input is passed through unchanged (the split is skipped).
- Any other input is coerced with `String(input)` and then `.split(separator, limit)` is applied, exactly like the native method.
- Never fails/throws on its own; it always returns the resulting array (or the passed-through nullish value).

**Example**
```ts
import { vg } from 'valgen';

vg.stringSplit(',')('a,b'); // => ['a', 'b']
vg.stringSplit(',')(null); // => null
vg.stringSplit(',')(undefined); // => undefined
```

## trim

Removes whitespace from both ends of a string, mirroring `String.prototype.trim`.

**Availability:** Factory only (`vg.trim(...)`).

**Signature**
```ts
trim(): Validator<string, string>
```

**Behavior**
- `null`/`undefined` input is passed through unchanged.
- Any other input is coerced with `String(input)` and then `.trim()` is applied.
- Never fails/throws on its own.

**Example**
```ts
import { vg } from 'valgen';

vg.trim()(' a '); // => 'a'
vg.trim()(' a'); // => 'a'
vg.trim()('a '); // => 'a'
vg.trim()(null); // => null
vg.trim()(undefined); // => undefined
```

## trimStart

Removes whitespace from the beginning of a string, mirroring `String.prototype.trimStart`.

**Availability:** Factory only (`vg.trimStart(...)`).

**Signature**
```ts
trimStart(): Validator<string, string>
```

**Behavior**
- `null`/`undefined` input is passed through unchanged.
- Any other input is coerced with `String(input)` and then `.trimStart()` is applied (trailing whitespace is left untouched).
- Never fails/throws on its own.

**Example**
```ts
import { vg } from 'valgen';

vg.trimStart()(' a '); // => 'a '
vg.trimStart()(' a'); // => 'a'
vg.trimStart()(null); // => null
vg.trimStart()(undefined); // => undefined
```

## trimEnd

Removes whitespace from the end of a string, mirroring `String.prototype.trimEnd`.

**Availability:** Factory only (`vg.trimEnd(...)`).

**Signature**
```ts
trimEnd(): Validator<string, string>
```

**Behavior**
- `null`/`undefined` input is passed through unchanged.
- Any other input is coerced with `String(input)` and then `.trimEnd()` is applied (leading whitespace is left untouched).
- Never fails/throws on its own.

**Example**
```ts
import { vg } from 'valgen';

vg.trimEnd()(' a '); // => ' a'
vg.trimEnd()('a '); // => 'a'
vg.trimEnd()(null); // => null
vg.trimEnd()(undefined); // => undefined
```

## forwardRef

Defers to a validator produced lazily by a callback, so a schema can reference itself (directly or through a cycle of other schemas).

**Availability:** Factory only — but imported directly (`import { forwardRef } from 'valgen'`), not via `vg`. It is exported straight from `src/core/utilities.ts` through `src/core/index.ts` and `src/index.ts`'s `export * from './core/index.js'`, so there is no `vg.forwardRef`. It is still a factory: you must call `forwardRef(fn)` to get a validator — there is no ready-made instance.

**Signature**
```ts
forwardRef<T, I>(fn: (context: Context) => Validator<T, I>): Validator<T, I>
```

**Behavior**
- On every call, invokes `fn(context)` to resolve the actual validator to delegate to, then calls that validator with `input`.
- Resolving the target lazily (inside the returned validator, rather than eagerly at construction time) is what allows a schema to refer to a validator — often itself, or one that's still being defined — that doesn't exist yet at the point `forwardRef(...)` is written.
- Typical use is a recursive/self-referential object schema, e.g. a tree or linked-list shape, and/or breaking circular references between two schemas that reference each other.

**Example**
```ts
import { forwardRef, isString } from 'valgen';
import { vg } from 'valgen';

// minimal: resolve the target validator lazily
forwardRef(() => isString)(1, { coerce: true }); // => '1'

// realistic: a self-referential object schema (e.g. a linked list of nodes),
// referencing `circularCodec` from inside its own definition
const circularCodec = vg.isObject(
  {
    id: vg.isNumber(),
    child: vg.optional(forwardRef(() => circularCodec)),
  },
  { detectCircular: true },
);
```

## iif

Picks between two validators (or plain values) based on whether a "check" validator passes.

**Availability:** Factory only — but imported directly (`import { iif } from 'valgen'`), not via `vg`. It is exported straight from `src/core/utilities.ts` through `src/core/index.ts` and `src/index.ts`'s `export * from './core/index.js'`, so there is no `vg.iif`. As with `forwardRef`, it is still a factory: you must call `iif(check, then, else)` to get a validator.

**Signature**
```ts
iif<TOutput1, TOutput2, TDefault1, TDefault2>(
  check: Validator<any>,
  then: TDefault1 | Validator<TOutput1, any>,
  else_?: TDefault2 | Validator<TOutput2, any>,
): Validator<any, any>
```

**Behavior**
- Calls `check(input)`; if it does **not** throw, the "then" branch is selected, otherwise the "else" branch is selected.
- If the selected branch is itself a `Validator`, it is called with `input` and its result/throw becomes `iif`'s result. Otherwise, the selected branch is a plain value and is returned as-is (ignoring `input` entirely) — this is how `iif(check, 1, 2)` can return a constant.
- `else_` is optional; if the check fails and no `else_` was given, the branch value is `undefined`.

**Example**
```ts
import { iif, isDefined, isEmpty, isNumber, isString } from 'valgen';

// plain constants as branches
iif(isEmpty, 1, 2)(''); // => 1
iif(isEmpty, 1, 2)('-'); // => 2

// validators as branches: coerce differently depending on the check
iif(isDefined, isString, isNumber)(1, { coerce: true }); // => '1'
iif(isEmpty, isString, isNumber)('2', { coerce: true }); // => 2
```
