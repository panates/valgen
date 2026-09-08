# Logical Rules

Logical rules validate a value against a comparison, presence, or size constraint - equality, ordering, emptiness, length, and range checks.

## isDefined

Validates that a value is not `undefined` (note: `null` is considered defined - use `isNotNullish` to reject both).

**Availability:** Pre-built (`import { isDefined } from 'valgen'`) - re-exported in `src/index.ts` as `const isDefined = vg.isDefined();`.

**Signature**
```ts
isDefined(options?: isDefined.Options): Validator<any, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- Passes through any value that is not `=== undefined` unchanged, including `0`, `''`, and `null`.
- Throws (`Value must be defined`) only when the input is `undefined`.

**Example**
```ts
import { isDefined } from 'valgen';

isDefined(0);          // => 0
isDefined(null);       // => null
isDefined('');         // => ''
isDefined(undefined);  // throws ValidationError: "Value must be defined"
```

## isEmpty

Checks that the value is empty. The value should be a string, array, Set, Map, Buffer, ArrayBuffer, or plain object.

**Availability:** Pre-built (`import { isEmpty } from 'valgen'`) - re-exported in `src/index.ts` as `const isEmpty = vg.isEmpty();`.

**Signature**
```ts
isEmpty(options?: isEmpty.Options): Validator<any, any>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- `null`/`undefined` pass through unchanged (treated as empty).
- `Date` instances always pass (a Date has no "empty" concept, so it's exempt from the emptiness check).
- String: passes only if `''`; otherwise throws `Value must be an empty string`.
- Array: passes only if `length === 0`; otherwise throws `Value must be an empty array`.
- `Set`/`Map`: passes only if `size === 0`; otherwise throws `Value must be an empty Set`/`Value must be an empty Map`.
- `Buffer`: passes only if `length === 0`; otherwise throws `Value must be an empty Buffer`.
- `ArrayBuffer`: passes only if `byteLength === 0`; otherwise throws `Value must be an empty ArrayBuffer`.
- Plain object (not a `Date`): passes only if it has no own enumerable keys; otherwise throws `Value must be an empty Object`.
- Any other type not covered above (e.g. `number`, `boolean`, including `NaN`) falls through to a generic `Value must be empty` failure.

**Example**
```ts
import { isEmpty } from 'valgen';

isEmpty('');              // => ''
isEmpty([]);              // => []
isEmpty({});              // => {}
isEmpty(null);             // => null (treated as empty)
isEmpty('dd');            // throws ValidationError: "Value must be an empty string"
isEmpty([0]);             // throws ValidationError: "Value must be an empty array"
isEmpty(NaN as any);      // throws ValidationError: "Value must be empty"
```

## isNotEmpty

Checks that the value is not empty. The value should be a string, array, Set, Map, Buffer, ArrayBuffer, or plain object.

**Availability:** Pre-built (`import { isNotEmpty } from 'valgen'`) - re-exported in `src/index.ts` as `const isNotEmpty = vg.isNotEmpty();`.

**Signature**
```ts
isNotEmpty(options?: isNotEmpty.Options): Validator<any, any>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- `null`/`undefined` throw `Value must not be empty` (unlike `isEmpty`, nullish input is rejected here, not treated as passing).
- `Date` instances always pass.
- String: throws `Value must not be empty` if `''`.
- Number: throws `Value must not be NaN` if `NaN`; any other number (including `0`) passes.
- Array: throws `Array must not be empty` if `length === 0`.
- `Set`/`Map`: throws `Set must not be empty`/`Map must not be empty` if `size === 0`.
- `Buffer`: throws `Buffer must not be empty` if `length === 0`.
- `ArrayBuffer`: throws `ArrayBuffer must not be empty` if `byteLength === 0`.
- Plain object (not a `Date`): throws `Object must not be empty` if it has no own enumerable keys.
- Any other type (e.g. `boolean`) passes through unchanged (no explicit "empty" concept applies).

**Example**
```ts
import { isNotEmpty } from 'valgen';

isNotEmpty('abc');        // => 'abc'
isNotEmpty([1, 2]);       // => [1, 2]
isNotEmpty('');           // throws ValidationError: "Value must not be empty"
isNotEmpty([]);           // throws ValidationError: "Array must not be empty"
isNotEmpty(null as any);  // throws ValidationError: "Value must not be empty"
```

## isEqual

Validates that the value is strictly equal (`===`) to `compare`. `null`/`undefined` input is passed through unchanged.

**Availability:** Factory only (`vg.isEqual(compare)`) - not re-exported from the top-level `valgen` package (not present in `src/index.ts`).

**Signature**
```ts
isEqual<T>(compare: T, options?: isEqual.Options): Validator<any, any>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- `null`/`undefined` input always passes through unchanged, regardless of `compare`.
- Otherwise, passes only if `input === compare` (strict equality - no type coercion).
- Throws `Value must be equal to "<compare>"` otherwise.

**Example**
```ts
import { vg } from 'valgen';

vg.isEqual('a')('a');   // => 'a'
vg.isEqual(1)(1);       // => 1
vg.isEqual(true)(true); // => true
vg.isEqual('a')('b');   // throws ValidationError: "Value must be equal to..."
```

## isNotEqual

Validates that the value is not strictly equal (`===`) to `compare`. `null`/`undefined` input is passed through unchanged.

**Availability:** Factory only (`vg.isNotEqual(compare)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
isNotEqual(compare: any, options?: isNotEqual.Options): Validator<any, any>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- `null`/`undefined` input always passes through unchanged, regardless of `compare`.
- Otherwise, passes only if `input !== compare` (strict equality check for the failure condition - no type coercion).
- Throws `Value must not be equal to "<compare>"` when `input === compare`.

**Example**
```ts
import { vg } from 'valgen';

vg.isNotEqual('a')('b');          // => 'b'
vg.isNotEqual(1)(2);              // => 2
vg.isNotEqual('a')(null as any);  // => null (nullish passthrough)
vg.isNotEqual('a')('a');          // throws ValidationError: "Value must not be equal to..."
```

## isGt

Checks that the value is greater than `minValue`. Supports `number`, `bigint`, `Date`, and `string` comparisons (numbers and bigints can be compared against each other).

**Availability:** Factory only (`vg.isGt(minValue, options?)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
isGt<T extends range.Input>(minValue: T, options?: isGt.Options): Validator
```
(`range.Input` = `number | bigint | Date | string`)

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |
| `caseInsensitive` | `boolean` | `false` | For string comparisons, also passes if the lower-cased input is greater than the lower-cased `minValue` (in addition to the case-sensitive comparison). |

**Behavior**
- Numbers/bigints: passes if `input > minValue` (bigint `minValue` can be compared against a `number` input and vice versa, since the check only requires each side to independently be a number or bigint).
- `Date`: passes if both `minValue` and `input` are `Date` instances and `input > minValue`.
- `string`: passes if `input > minValue`, or (with `caseInsensitive: true`) if the lower-cased comparison holds.
- Any type mismatch between `input` and `minValue` (e.g. comparing a string input against a numeric `minValue`), or a value that fails the comparison, throws. There is **no** null/undefined passthrough here - nullish input falls through every branch and fails.
- Failure message: `` Value must be greater than <minValue> `` (string `minValue` is quoted, e.g. `"B"`; numbers/bigints/dates are interpolated directly).

**Example**
```ts
import { vg } from 'valgen';

vg.isGt(5)(6);                              // => 6
vg.isGt(5)(5);                              // throws ValidationError: "...must be greater than 5"
vg.isGt('B')('C');                          // => 'C'
vg.isGt('b', { caseInsensitive: true })('C'); // => 'C'
```

## isGte

Checks that the value is greater than or equal to `minValue`. Supports `number`, `bigint`, `Date`, and `string` comparisons.

**Availability:** Factory only (`vg.isGte(minValue, options?)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
isGte<T extends range.Input>(minValue: T, options?: isGte.Options): Validator<T>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |
| `caseInsensitive` | `boolean` | `false` | For string comparisons, also passes if the lower-cased input is `>=` the lower-cased `minValue`. |

**Behavior**
- Numbers/bigints: passes if `input >= minValue` (number/bigint values can be mixed across `input`/`minValue`).
- `Date`: passes if both are `Date` instances and `input >= minValue`.
- `string`: passes if `input >= minValue`, or (with `caseInsensitive: true`) if the lower-cased comparison holds.
- Type mismatches, or a value that fails the comparison, throw. No null/undefined passthrough.
- Failure message: `Value must be greater than or equal to <minValue>` (string `minValue` quoted).
- This validator is reused internally by `lengthMin` (see below) via `pipe([getLength(), isGte(minValue, { onFail: ... })])`.

**Example**
```ts
import { vg } from 'valgen';

vg.isGte(5)(5);                                       // => 5
vg.isGte(5)(4);                                        // throws ValidationError: "...must be greater than or equal to 5"
vg.isGte('abc', { caseInsensitive: true })('ABC');    // => 'ABC'
```

## isLt

Checks that the value is lower than `maxValue`. Supports `number`, `bigint`, `Date`, and `string` comparisons.

**Availability:** Factory only (`vg.isLt(maxValue, options?)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
isLt<T extends range.Input>(maxValue: T, options?: isLt.Options): Validator
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |
| `caseInsensitive` | `boolean` | `false` | For string comparisons, also passes if the lower-cased input is lower than the lower-cased `maxValue`. |

**Behavior**
- Numbers/bigints: passes if `input < maxValue`.
- `Date`: passes if both are `Date` instances and `input < maxValue`.
- `string`: passes if `input < maxValue`, or (with `caseInsensitive: true`) if the lower-cased comparison holds.
- Type mismatches, or a value that fails the comparison, throw. No null/undefined passthrough.
- Failure message: `Value must be lower than <maxValue>` (string `maxValue` quoted).

**Example**
```ts
import { vg } from 'valgen';

vg.isLt(5)(4);   // => 4
vg.isLt(5)(5);   // throws ValidationError: "...must be lower than 5"
vg.isLt('B')('A'); // => 'A'
vg.isLt('b', { caseInsensitive: true })('A'); // => 'A'
```

## isLte

Checks that the value is lower than or equal to `maxValue`. Supports `number`, `bigint`, `Date`, and `string` comparisons.

**Availability:** Factory only (`vg.isLte(maxValue, options?)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
isLte<T extends range.Input>(maxValue: T, options?: isLte.Options): Validator
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |
| `caseInsensitive` | `boolean` | `false` | For string comparisons, also passes if the lower-cased input is `<=` the lower-cased `maxValue`. |

**Behavior**
- Numbers/bigints: passes if `input <= maxValue`.
- `Date`: passes if both are `Date` instances and `input <= maxValue`.
- `string`: passes if `input <= maxValue`, or (with `caseInsensitive: true`) if the lower-cased comparison holds.
- Type mismatches, or a value that fails the comparison, throw. No null/undefined passthrough.
- Failure message: `Value must be lower than or equal to <maxValue>` (string `maxValue` quoted).
- This validator is reused internally by `lengthMax` (see below) via `pipe([getLength(), isLte(maxValue, { onFail: ... })])`.

**Example**
```ts
import { vg } from 'valgen';

vg.isLte(5)(5);     // => 5
vg.isLte(5)(6);     // throws ValidationError: "...must be lower than or equal to 5"
vg.isLte('B')('B'); // => 'B'
```

## lengthMin

Checks that the length of the value is at least `minValue`.

`lengthMin` is not a hand-rolled rule; it is composed from other validators: `allOf([pipe([getLength(), isGte(minValue, { onFail: ... })])])`. `getLength()` extracts the length/size of a string, array, or any object exposing a `length`/`size` property; `pipe` feeds that length into `isGte`; `allOf` wraps the pipeline so the composed validator still returns the *original* input (not the extracted length) on success.

**Availability:** Factory only (`vg.lengthMin(minValue)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
lengthMin(minValue: number): Validator
```
(no `options` parameter - the underlying `isGte`'s `onFail` is fixed internally and not configurable through `lengthMin`'s own signature)

**Behavior**
- Computes the length of the input via `getLength()` (works for strings and arrays, and objects with a numeric `length` or `size` property; throws `Unable to get length` internally if none apply).
- Passes if that length is `>= minValue`, returning the *original* input value (not the length) because of the `allOf` wrapper.
- On failure, uses a custom `onFail` message: `` Value length must be at least <minValue> `` (a plain string - it does not use the `{{label}}` template, unlike `lengthMax`).

**Example**
```ts
import { vg } from 'valgen';

vg.lengthMin(3)('1234');      // => '1234'
vg.lengthMin(3)([1, 2, 3, 4]); // => [1, 2, 3, 4]
vg.lengthMin(3)('ab');         // throws ValidationError: "Value length must be at least 3"
```

## lengthMax

Checks that the length of the value is at most `maxValue`.

Like `lengthMin`, this is composed from other validators: `allOf([pipe([getLength(), isLte(maxValue, { onFail: ... })])])`.

**Availability:** Factory only (`vg.lengthMax(maxValue)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
lengthMax(maxValue: number): Validator
```
(no `options` parameter)

**Behavior**
- Computes the length of the input via `getLength()`, same as `lengthMin`.
- Passes if that length is `<= maxValue`, returning the *original* input value because of the `allOf` wrapper.
- On failure, uses a custom `onFail` message that includes the `{{label}}` template: `` The length of {{label}} must be at most <maxValue> ``. When no `label`/`location`/`property` is set on the context, `{{label}}` resolves to the literal word `Value` (see `src/core/context.ts`), so the default rendered message is e.g. `The length of Value must be at most 3`.

**Example**
```ts
import { vg } from 'valgen';

vg.lengthMax(3)('12');         // => '12'
vg.lengthMax(3)([1, 2, 3]);    // => [1, 2, 3]
vg.lengthMax(3)('1245');       // throws ValidationError: "The length of Value must be at most 3"
```

## range

Checks that the value is between `minValue` and `maxValue`, inclusive on both ends. Supports `number`, `bigint`, `Date`, and `string` comparisons.

**Availability:** Factory only (`vg.range(minValue, maxValue, options?)`) - not re-exported from the top-level `valgen` package.

**Signature**
```ts
range<T extends range.Input>(minValue: T, maxValue: T, options?: range.Options): Validator<T>
```
(`range.Input` = `number | bigint | Date | string`; `range.Options` is a plain alias for `ValidationOptions`, adding no extra properties)

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `onFail` | `OnFailFunction` | - | Custom error message/issue builder (inherited from `ValidationOptions`). |
| `coerce` | `boolean` | - | Inherited from `ValidationOptions`; unused by this rule's logic. |

**Behavior**
- Numbers/bigints: passes if `minValue` and `maxValue` are both number/bigint, `input` is number/bigint, and `minValue <= input <= maxValue`. Unlike `isGt`/`isGte`/`isLt`/`isLte`, this rule does **not** mix numbers and bigints across `input`/`minValue`/`maxValue` - all three must independently satisfy `typeof x === 'number' || typeof x === 'bigint'`, but the comparison still works across mixed number/bigint values since the `>=`/`<=` operators coerce internally.
- `Date`: passes if `minValue`, `maxValue`, and `input` are all `Date` instances and `minValue <= input <= maxValue`.
- `string`: passes if `minValue`, `maxValue`, and `input` are all strings and `minValue <= input <= maxValue`. There is no `caseInsensitive` option for `range` (unlike `isGt`/`isGte`/`isLt`/`isLte`).
- A type mismatch among `input`/`minValue`/`maxValue`, or a value outside the bounds, throws. No null/undefined passthrough.
- Failure message: `Value must be between <minValue> and <maxValue>` (values interpolated directly, not quoted even for strings).

**Example**
```ts
import { vg } from 'valgen';

vg.range(5, 10)(5);   // => 5
vg.range(5, 10)(10);  // => 10
vg.range(5, 10)(7);   // => 7
vg.range(5, 10)(4);   // throws ValidationError: "Value must be between 5 and 10"
vg.range('B', 'D')('C'); // => 'C'
```
