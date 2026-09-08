# Type Rules

Type rules validate and (optionally) coerce the *shape* or *primitive type* of a value - strings, numbers, objects, arrays, dates, enums, etc.

## isAny

Does nothing and always succeeds, returning the original input value unchanged.

**Availability:** Pre-built (`import { isAny } from 'valgen'`)

**Signature**
```ts
isAny(): Validator<any, any>
```

isAny takes no options at all - the factory call `isAny()` (or `vg.isAny()`) accepts no arguments, and the returned validator ignores any `options`/`context` passed to it.

**Behavior**
- Always succeeds, for every input including `null` and `undefined`.
- Returns the input value as-is, with no type checking and no coercion.
- Useful as a permissive item/value rule inside `isArray`, `isRecord`, `isTuple`, etc.

**Example**
```ts
import { isAny, vg } from 'valgen';

isAny('anything'); // => 'anything'
isAny(null); // => null

// Used as a permissive value rule for isRecord:
vg.isRecord(vg.isString, isAny)({ a: 1, b: 'x' }); // => { a: 1, b: 'x' }
```

## isArray

Validates that the value is an array, optionally validating (and coercing) each item against an item rule.

**Availability:** Pre-built (`import { isArray } from 'valgen'`) - the pre-built instance has **no** item validator, so it only checks array-ness. Use `vg.isArray(itemValidator, options?)` (factory) to validate/coerce items.

**Signature**
```ts
isArray<T, I>(itemValidator?: Validator<T, I>, options?: isArray.Options): Validator<T[], I[] | I>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | If the value is non-null and not already an array, wraps it into a single-item array before validating. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any value for which `Array.isArray()` is `true` (or that was coerced into one).
- Throws `Value must be an array` for `null`, `undefined`, or any non-array, non-coercible value.
- When an `itemValidator` is supplied, each element is validated with it; a failing item raises `Item at index [i] is not valid. <underlying message>`, and the failure's `location` is appended to the parent context's location (e.g. `items[0]`).
- With `coerce: true`, a non-array, non-null input is wrapped as `[input]` first, then (if given) the item rule may itself coerce each element.

**Example**
```ts
import { isArray, vg } from 'valgen';
import { isInteger } from 'valgen';

isArray([true]); // => [true]
isArray(undefined); // throws ValidationError: 'Value must be an array'

vg.isArray(isInteger)([1, 2]); // => [1, 2]
vg.isArray(isInteger)(['1', '2']); // throws: 'Item at index [0] is not valid. Value must be a valid integer value'
vg.isArray(isInteger).silent(['1', '2']); // => { errors: [...] }
```

## isBigint

Validates that the value is a `bigint`.

**Availability:** Pre-built (`import { isBigint } from 'valgen'`)

**Signature**
```ts
isBigint(options?: isBigint.Options): Validator<bigint, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows converting a `number` or a `string` to `bigint` via `BigInt(input)`. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any `bigint` value unchanged.
- Without `coerce: true`, only an actual `bigint` passes - a plain `number` (even an integer like `5`) or a `string` both fail.
- With `coerce: true`, a `number` or `string` is converted via `BigInt(input)`; a value that can't be converted (a non-integer number, a non-numeric string) fails with the same `Value must be a BigInt` message rather than leaking the internal conversion error.
- `null`, `undefined`, and `NaN` always throw `Value must be a BigInt`.

**Example**
```ts
import { isBigint } from 'valgen';

isBigint(1n); // => 1n
isBigint(5); // throws ValidationError: 'Value must be a BigInt' (no coerce)
isBigint('4', { coerce: true }); // => 4n
isBigint(5, { coerce: true }); // => 5n
isBigint.silent(undefined); // => { errors: [...] }
```

## isBoolean

Validates that the value is a `boolean`.

**Availability:** Pre-built (`import { isBoolean } from 'valgen'`)

**Signature**
```ts
isBoolean(options?: isBoolean.Options): Validator<boolean | undefined, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows converting `1`/`0`, or common boolean-like strings, to `boolean`. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through `true`/`false` unchanged.
- With `coerce: true`: `1`/`0` become `true`/`false`; strings matching `/^(?:true|t|1|yes|y)$/i` become `true` and `/^(?:false|f|0|no|n)$/i` become `false` (case-insensitive).
- With `coerce: true`, a string that matches neither pattern raises `Invalid boolean string`.
- Without coercion, anything other than an actual `boolean` (including `1`, `'true'`, `NaN`) throws `Value must be a boolean`.

**Example**
```ts
import { isBoolean } from 'valgen';

isBoolean(true); // => true
isBoolean(1); // throws ValidationError: 'Value must be a boolean'
isBoolean(1, { coerce: true }); // => true
isBoolean('yes', { coerce: true }); // => true
isBoolean('maybe', { coerce: true }); // throws ValidationError: 'Invalid boolean string'
```

## isDate

Validates that the value is a `Date` instance (or, with `coerce: true`, a value that can be parsed into one), with an optional precision-trimming step.

**Availability:** Pre-built (`import { isDate } from 'valgen'`)

**Signature**
```ts
isDate(options?: isDate.Options): Validator<Date, Date | number | string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows converting a `number` (epoch ms) or a date-like `string` into a `Date`. |
| `trim` | `isDate.Precision` (`'year'\|'yr'\|'month'\|'mo'\|'day'\|'d'\|'hours'\|'hr'\|'minutes'\|'min'\|'seconds'\|'sec'\|'milliseconds'\|'ms'\|'tz'`) | `undefined` | Zeroes out the resulting `Date`'s fields below the given precision (e.g. `'day'` zeroes hours/minutes/seconds/ms). Only `year` through `seconds` have an effect; `milliseconds`/`ms`/`tz` are no-ops since a JS `Date` has no coarser storage below milliseconds. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- A `Date` instance passes through as long as it is itself valid (`date-fns.isValid`); an invalid `Date` (e.g. `new Date('invalid')`) fails.
- **Without `coerce: true`, a date *string* is rejected** even if well-formed ISO 8601 - only actual `Date` instances validate by default.
- With `coerce: true`, a `number` is treated as epoch milliseconds, and a `string` is parsed via an internal ISO-8601-like parser (accepting missing time parts, `Z`/`±HH:MM` offsets, etc.).
- Throws `Value is not valid date` for anything that isn't (or can't be coerced into) a valid `Date`.

**Example**
```ts
import { isDate, vg } from 'valgen';

isDate(new Date(1)); // => new Date(1)
isDate('2020-01-10T08:30:15Z'); // throws ValidationError: 'Value is not valid date' (no coerce)
isDate('2020-01-10T08:30:15Z', { coerce: true }); // => new Date('2020-01-10T08:30:15Z')

vg.isDate({ trim: 'day', coerce: true })('2020-05-10T08:30:15.123');
// => new Date('2020-05-10T00:00:00')
```

## isDateString

Validates that the value is (or, with `coerce: true`, can be normalized into) a date-formatted string within a given precision range.

**Availability:** Pre-built (`import { isDateString } from 'valgen'`)

**Signature**
```ts
isDateString(options?: isDateString.Options): Validator<string, Date | number | string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `precisionMin` | `isDateString.Precision` | `'minutes'` | The minimum precision the input string must carry (e.g. `'day'` rejects a bare year). |
| `precisionMax` | `isDateString.Precision` | `'tz'` | The maximum precision accepted; a string more precise than this fails unless the input was already a `Date`. |
| `coerce` | `boolean` | `false` | Allows converting a `Date`/`number`/loosely-formatted `string` into a normalized date string. |
| `trim` | `boolean` | `false` | When `coerce: true`, truncates the output string down to `precisionMax` instead of only validating precision. |
| `separators` | `boolean` | `true` | When coercing, controls whether `-`/`:`/`T` separators are included in the output (`false` produces a compact form like `20201101102345.123`). |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Accepts ISO-8601-like strings (`2020-01-10T08:30:15Z`, `2020-01-10T08:30`, `2020-01-10 08:30`, compact `20201101` form, etc.) as well as `Date`/`number` values when `coerce: true`.
- Without `coerce`, the original input string is returned unchanged if it parses and its precision falls within `[precisionMin, precisionMax]`.
- Throws `Minimum date precision should be <precisionMin>` / `Maximum date precision should be <precisionMax>` when precision is out of range, and `Value "<input>" is not a valid date string` when the input can't be parsed at all.
- With `coerce: true` and `trim: true`, the output is truncated to `precisionMax` (e.g. `precisionMax: 'day'` on a full timestamp yields just `'2020-11-01'`).

**Example**
```ts
import { isDateString, vg } from 'valgen';

isDateString('2020-01-10T08:30:15Z'); // => '2020-01-10T08:30:15Z'
isDateString('2020-01-10T08'); // throws ValidationError (unparseable / below default min precision)

vg.isDateString({ precisionMin: 'day' })('2020-11-01'); // => '2020-11-01'
vg.isDateString({ coerce: true, trim: true, precisionMax: 'day' })('2020-11-01T00:00:00+03:00');
// => '2020-11-01'
```

## isEnum

Validates that the value is one of a fixed set of enumeration members.

**Availability:** Factory only (`vg.isEnum(values, options?)`)

**Signature**
```ts
isEnum<T1>(values: any, options?: isEnum.Options): Validator<T1, any>
```

`values` may be a single value, an array of allowed values, or a plain object/TypeScript enum (its non-numeric-key values are used, so both string enums and numeric enums with reverse mappings work correctly).

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `caseInSensitive` | `boolean` | `false` | Compares `string` values case-insensitively (matching is done on `.toUpperCase()`), but the original input casing is returned. |
| `enumName` | `string` | `undefined` | Included in the failure message as `... (enumName)` for clearer errors. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

Note: `coerce` is inherited from `ValidationOptions` but has no effect in this rule's logic.

**Behavior**
- Passes through the input unchanged if it (or its uppercased form, when `caseInSensitive`) matches one of the allowed values.
- `null`/`undefined` always fail, even if not explicitly listed.
- Throws `Value must be one of enumeration member` (optionally suffixed `(enumName)`) otherwise.

**Example**
```ts
import { vg } from 'valgen';

vg.isEnum(['a', 'b'])('a'); // => 'a'
vg.isEnum(['a', 'b'])('c'); // throws ValidationError: 'Value must be one of enumeration member'
vg.isEnum(['a', 'b'], { enumName: 'Suit' })('c');
// throws: 'Value must be one of enumeration member (Suit)'

enum Enum2 { a = 'a', b = 'b' }
vg.isEnum(Enum2)('a'); // => 'a'

vg.isEnum(['A', 'B'], { caseInSensitive: true })('a'); // => 'a'
```

## isInstanceOf

Validates that the value is an instance of a given class.

**Availability:** Both, with **different call signatures**:
- Pre-built convenience function `import { isInstanceOf } from 'valgen'; isInstanceOf(clazz, input, options?)` - this calls straight through to a (per-class, memoized) validator and directly returns the result or throws; it is **not** itself a `Validator` factory.
- Factory only via `vg.isInstanceOf(clazz, options?)` - returns a standard `Validator` you call as `validate(input, options?)`.

**Signature**
```ts
// factory (vg.isInstanceOf)
isInstanceOf<T extends object>(clazz: Type<T>, options?: isInstanceOf.Options): Validator<T, unknown>

// pre-built convenience wrapper (top-level import)
isInstanceOf<T extends object>(clazz: Type<T>, input: any, options?: isInstanceOf.Options): T
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | If `input` is a plain object (per `@jsopen/objects`' `isPlainObject`), reassigns its prototype to `clazz.prototype` in place before the `instanceof` check. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through the input unchanged when `input instanceof clazz`.
- With `coerce: true`, a *plain* object is mutated (via `Object.setPrototypeOf`) to become an instance of `clazz`; an object that is already an instance of some *other* class is **not** coerced and still fails.
- Throws `Value must be an instance of "<clazz.name>"` for `null`, `undefined`, primitives, or mismatched instances.

**Example**
```ts
import { isInstanceOf, vg } from 'valgen';

class Class1 {}
const c1 = new Class1();

isInstanceOf(Class1, c1); // => c1
isInstanceOf(Class1, {}); // throws ValidationError: 'Value must be an instance of "Class1"'
isInstanceOf(Class1, {}, { coerce: true }); // => instance of Class1

const validate = vg.isInstanceOf(Class1);
validate(c1); // => c1
```

## isInteger

Validates that the value is an integer number.

**Availability:** Pre-built (`import { isInteger } from 'valgen'`)

**Signature**
```ts
isInteger(options?: isInteger.Options): Validator<number, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows parsing a `string` (via `parseFloat`) or converting a lossless `bigint` into an integer `number`. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any value for which `Number.isInteger()` is `true`.
- With `coerce: true`, a `string` is parsed with `parseFloat`, and a `bigint` is converted with `Number()` - but only if that conversion is lossless (`input === BigInt(n)`); a `bigint` too large to round-trip fails.
- `NaN`, non-integer floats (`1.5`), and (without coercion) `bigint`/`string` all throw `Value must be a valid integer value`.

**Example**
```ts
import { isInteger } from 'valgen';

isInteger(1); // => 1
isInteger('1'); // throws ValidationError: 'Value must be a valid integer value'
isInteger('4', { coerce: true }); // => 4
isInteger(10000000000000000001n, { coerce: true });
// throws: 'Value must be a valid integer value' (precision would be lost)
```

## isNull

Validates that the value is exactly `null`.

**Availability:** Pre-built (`import { isNull } from 'valgen'`)

**Signature**
```ts
isNull(options?: isNull.Options): Validator<null, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Accepted for interface consistency; unused by this rule's logic. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes only `null`; even `undefined` fails.
- Throws `Value must be null` otherwise.

**Example**
```ts
import { isNull } from 'valgen';

isNull(null); // => null
isNull(undefined); // throws ValidationError: 'Value must be null'
```

## isNotNull

Validates that the value is anything *other than* `null`.

**Availability:** Pre-built (`import { isNotNull } from 'valgen'`)

**Signature**
```ts
isNotNull(options?: isNotNull.Options): Validator<any, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Accepted for interface consistency; unused by this rule's logic. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through anything except `null` - notably, `undefined`, `''`, `0`, and `NaN` all pass.
- Throws `{{label}} is null` (renders as `Value is null` with the default label) when the input is `null`.

**Example**
```ts
import { isNotNull } from 'valgen';

isNotNull(undefined); // => undefined
isNotNull(0); // => 0
isNotNull(null); // throws ValidationError: 'Value is null'
```

## isNullish

Validates that the value is `null` or `undefined`.

**Availability:** Pre-built (`import { isNullish } from 'valgen'`)

**Signature**
```ts
isNullish(options?: isNullish.Options): Validator<null, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Accepted for interface consistency; unused by this rule's logic. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes `null` or `undefined` through unchanged.
- Throws `{{label}} is not nullish` (renders as `Value is not nullish`) for any other value.

**Example**
```ts
import { isNullish } from 'valgen';

isNullish(null); // => null
isNullish(undefined); // => undefined
isNullish(''); // throws ValidationError: 'Value is not nullish'
```

## isNotNullish

Validates that the value is neither `null` nor `undefined`.

**Availability:** Pre-built (`import { isNotNullish } from 'valgen'`)

**Signature**
```ts
isNotNullish(options?: isNotNullish.Options): Validator<any, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Accepted for interface consistency; unused by this rule's logic. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any value that is not `null` and not `undefined` (`0`, `''`, `NaN` all pass).
- Throws `{{label}} is null` for `null` specifically, and `{{label}} is undefined` for `undefined` specifically (rendering as `Value is null` / `Value is undefined`).

**Example**
```ts
import { isNotNullish } from 'valgen';

isNotNullish(0); // => 0
isNotNullish(null); // throws ValidationError: 'Value is null'
isNotNullish(undefined); // throws ValidationError: 'Value is undefined'
```

## isNumber

Validates that the value is a `number`.

**Availability:** Pre-built (`import { isNumber } from 'valgen'`)

**Signature**
```ts
isNumber(options?: isNumber.Options): Validator<number, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows parsing a `string` (via `parseFloat`) or converting a lossless `bigint` into a `number`. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any finite `number` (not `NaN`).
- With `coerce: true`, a `string` is parsed with `parseFloat`; a `bigint` is converted with `Number()` only if lossless.
- `NaN`, `bigint`/`string` without coercion, `null`, and `undefined` throw `Value must be a number`.

**Example**
```ts
import { isNumber } from 'valgen';

isNumber(1.1); // => 1.1
isNumber('1'); // throws ValidationError: 'Value must be a number'
isNumber('4.5', { coerce: true }); // => 4.5
isNumber(10000000000000000001n, { coerce: true });
// throws: 'Value must be a number' (precision would be lost)
```

## isObject

Validates an object against a property schema, with support for nested schemas, renaming/relabeling fields, controlling unknown properties, case-insensitive key matching, and circular-reference detection.

**Availability:** Pre-built (`import { isObject } from 'valgen'`) - the pre-built instance is called with **no schema**, so it only validates "is this an object" and passes every property through untouched (see the `additionalFields` default below). Use `vg.isObject(schema, options?)` (factory) for real schema validation.

**Signature**
```ts
isObject<T extends object = object, I = object | string>(
  schema?: isObject.Schema,
  options?: isObject.Options<T>,
): isObject.Validator<T, I>
```

Where:
```ts
type PropertyOptions = { label?: string; as?: string };
type Schema = Record<string | number, Validator | [Validator, PropertyOptions]>;
```
Each schema entry is either a bare `Validator` for that property, or a `[Validator, PropertyOptions]` tuple where `label` customizes the property's name in error messages and `as` renames the key in the *output* object.

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `ctor?.name` | Used as the error `context` label for this object (e.g. a class name). |
| `ctor` | `Type<T>` | `undefined` | Sets the prototype of the output object to `ctor.prototype` (`instanceof ctor` becomes `true`); may also define static `[preValidation]`/`[postValidation]` hooks invoked before/after this rule's own logic. |
| `additionalFields` | `boolean \| Validator \| 'error'` | `true` if `schema` is omitted entirely; otherwise `false` | Controls properties not declared in `schema`: `true` passes them through unchanged, `false` silently drops them, a `Validator` applies that rule to each of them, and `'error'` throws when any are present. |
| `caseInSensitive` | `boolean` | `false` | Matches input property names to schema keys case-insensitively; on a case-insensitive duplicate (e.g. both `name` and `Name` present), only the first-encountered key is used. |
| `detectCircular` | `boolean` | `false` | Tracks input objects already being converted (per root validation call) and returns the same (in-progress) output object instead of recursing infinitely when a cycle is found. |
| `coerce` | `boolean` | `false` | If the input is a `string`, parses it with `JSON.parse` first; also enables coercion in nested property validators (when they read `context.coerce`). |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Throws `Value must be an object` if the (possibly JSON-parsed) input is not a non-null object.
- Runs each schema property's validator against the corresponding input value; a required sub-rule (`vg.required(...)`) that finds the property missing raises a `Value required` error located at that property's path (e.g. `address.country`).
- Properties whose value comes back `undefined` are omitted from the output object entirely.
- Errors from nested properties accumulate `location`/`property`/`context`/`label` fields describing exactly where the failure occurred.
- An invalid schema entry (not a `Validator`, and not a `[Validator, PropertyOptions]` tuple whose first element is a `Validator`) throws synchronously when `isObject(...)` is *called* (a build-time error, not a validation-time one).

**Example**
```ts
import { isNumber, isString, vg } from 'valgen';

class Address {
  declare city?: string;
  declare country: string;
}
class Person {
  declare name: string;
  declare age: number;
  declare address?: Address;
}

const addressDef: vg.isObject.Schema = {
  city: [vg.optional(isString), { label: 'City' }],
  country: [vg.required(isString), { label: 'Country' }],
};
const personDef: vg.isObject.Schema = {
  name: [vg.required(isString), { label: 'Full Name', as: 'fullName' }],
  age: [vg.required(isNumber), { label: 'Age' }],
  address: vg.optional(vg.isObject(addressDef, { ctor: Address })),
};
const validatePerson = vg.isObject(personDef, { ctor: Person });

validatePerson({ name: 'John', age: '22' }, { coerce: true });
// => { fullName: 'John', age: 22 }  (instance of Person)

validatePerson.silent({ age: 22 });
// => { errors: [{ context: 'Person', rule: 'required', property: 'name',
//                 location: 'name', value: undefined, ... }] }
```

`additionalFields`:
```ts
// default (schema given, no additionalFields) => unknown props silently dropped
vg.isObject({ a: isString })({ a: '1', b: 5 } as any); // => { a: '1' }

// 'error' => unknown props reject the whole object
vg.isObject({ a: isString }, { additionalFields: 'error' })({ a: '1', b: 2 } as any);
// throws: "Object has no field 'b' and does not accept additional fields"

// a Validator => unknown props are validated (and can coerce) individually
vg.isObject({ a: isString }, { additionalFields: isNumber })({ a: '1', b: 5 } as any);
// => { a: '1', b: 5 }
```

`detectCircular`:
```ts
import { forwardRef } from 'valgen';

const circularCodec = vg.isObject(
  { id: isNumber, child: vg.optional(forwardRef(() => circularCodec)) },
  { detectCircular: true },
);
const child1: any = { id: 2 };
const child2: any = { id: 3 };
child2.child = child1;
child1.child = child2; // circular reference

circularCodec({ id: 1, child: child1 }); // resolves without a stack overflow
```

## isRecord

Validates a plain object as a "dictionary": every key must satisfy a key rule and every value must satisfy a value rule.

**Availability:** Factory only (`vg.isRecord(keyRule, valueRule, options?)`)

**Signature**
```ts
isRecord<TKeys extends string | number | symbol, TValues>(
  keyRule: Validator<TKeys>,
  valueRule: Validator<TValues>,
  options?: isRecord.Options,
): Validator<Record<TKeys, TValues>>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Propagated to `keyRule`/`valueRule` calls (via context), enabling their own coercion. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Throws `Value must be an object` for `null`, `undefined`, or non-object input.
- Every own key is run through `keyRule`; a failing key raises `<key> is not a valid key. <underlying message>`.
- Every value is run through `valueRule`, with its error `location` built as `<parent>.<key>`.
- With `coerce: true`, both keys and values may be coerced by their respective rules (e.g. `isString` stringifying non-string values).

**Example**
```ts
import { isAny, isString, vg } from 'valgen';

const validate = vg.isRecord(isString, isAny);
validate(null as any); // throws ValidationError: 'Value must be an object'

vg.isRecord(vg.matches(/^[a-z]+$/), isAny)({ UpperKey: 'a' });
// throws: 'UpperKey is not a valid key. Value must match requested format'

vg.isRecord(isString, isString)({ a: 1 as any, b: true as any }, { coerce: true });
// => { a: '1', b: 'true' }
```

## isString

Validates that the value is a `string`.

**Availability:** Pre-built (`import { isString } from 'valgen'`)

**Signature**
```ts
isString(options?: isString.Options): Validator<string, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Allows converting any non-`string`, non-nullish value into a `string`. |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Passes through any `string` unchanged (including `''`).
- With `coerce: true`: an object with a `toJSON` method is stringified via `toJSON()`; other objects are run through `JSON.stringify`; everything else (numbers, booleans, etc.) goes through `String()`.
- `null`, `undefined`, and (without coercion) any non-string throw `Value must be a string`.

**Example**
```ts
import { isString } from 'valgen';

isString('1'); // => '1'
isString(1); // throws ValidationError: 'Value must be a string'
isString(1, { coerce: true }); // => '1'
isString({ toJSON: () => 'test' }, { coerce: true }); // => 'test'
isString({ x: 1 }, { coerce: true }); // => '{"x":1}'
```

## isTuple

Validates that the value is an array of a fixed length, applying a distinct validator to each positional item.

**Availability:** Factory only (`vg.isTuple(items, options?)`)

**Signature**
```ts
isTuple<T1, I1>(items: [Validator<T1, I1>], options?: isTuple.Options): Validator<[T1], [I1]>
// ...overloads up to 6 explicitly-typed items, plus a rest-args form:
isTuple<T1, I1, T2, I2, T3, I3, T4, I4, T5, I5, T6, I6>(
  items: [Validator<T1,I1>, Validator<T2,I2>, Validator<T3,I3>, Validator<T4,I4>, Validator<T5,I5>, Validator<T6,I6>, ...Validator[]],
  options?: isTuple.Options,
): Validator<[T1, T2, T3, T4, T5, T6, ...any[]], [I1, I2, I3, I4, I5, I5, ...any[]]>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | Wraps a non-array, non-null input into a single-item array before validating (only useful when `items.length === 1`). |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Throws `Value must be a tuple` for `null`, `undefined`, or non-array (non-coercible) input.
- Throws `Value must be a tuple of length <N>` when the array's length doesn't exactly match `items.length` (too few *or* too many elements).
- Each element `i` is validated by `items[i]`; the item's error `label` becomes `<parent label or property or 'Value at '>[i]` (e.g. `Point[0]`, or `Value at [0]` when nothing else is set).
- With `coerce: true`, each item rule may also coerce its own value (e.g. turning `1` into `'1'`).

**Example**
```ts
import { isBoolean, isNumber, isString, vg } from 'valgen';

vg.isTuple([isBoolean])([true]); // => [true]
vg.isTuple([isString, isNumber])(['a']); // throws: 'Value must be a tuple of length 2'
vg.isTuple([isString, isNumber, isBoolean])([1, '2', 0], { coerce: true });
// => ['1', 2, false]
```

## isUndefined

Validates that the value is `undefined` - or, with `coerce: true`, forces the result to `undefined` regardless of the input.

**Availability:** Pre-built (`import { isUndefined } from 'valgen'`)

**Signature**
```ts
isUndefined(options?: isUndefined.Options): Validator<any, unknown>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `coerce` | `boolean` | `false` | When `true`, **always succeeds** and returns `undefined`, no matter what the input is - this means "force to undefined," not "convert undefined-like values." |
| `onFail` | `OnFailFunction` | `undefined` | Customizes/rewrites the failure message or issue. |

**Behavior**
- Without `coerce`, only an actual `undefined` input passes; anything else (including `null`, `0`, `''`, `NaN`) throws `Value must be undefined`.
- With `coerce: true`, the rule never fails - every input, including `null` or `5`, resolves to `undefined`.

**Example**
```ts
import { isUndefined } from 'valgen';

isUndefined(undefined); // => undefined
isUndefined(5); // throws ValidationError: 'Value must be undefined'
isUndefined(0, { coerce: true }); // => undefined
isUndefined(null, { coerce: true }); // => undefined
```
