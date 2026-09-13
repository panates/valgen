import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is one of a fixed set of enumeration members.
 * `values` may be a single value, an array of allowed values, or a plain
 * object/TypeScript enum (its non-numeric-key values are used, so both
 * string enums and numeric enums with reverse mappings work correctly).
 * @validator isEnum
 * @param values - The allowed value(s): a single value, an array, or an
 *   object/enum whose values are used.
 * @param options - Validation options.
 * @returns The input value, unchanged (original casing is preserved even
 *   under `caseInSensitive`).
 * @throws `Value must be one of enumeration member` (suffixed
 *   ` (<enumName>)` when `enumName` is set) if the value doesn't match any
 *   allowed member, or is `null`/`undefined`.
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.isEnum(['a', 'b'])('a'); // => 'a'
 * vg.isEnum(['a', 'b'], { enumName: 'Suit' })('c');
 * // throws: 'Value must be one of enumeration member (Suit)'
 * vg.isEnum(['A', 'B'], { caseInSensitive: true })('a'); // => 'a'
 * ```
 */
export function isEnum<T1>(
  values: any,
  options?: isEnum.Options,
): Validator<T1, any> {
  const caseInSensitive = !!options?.caseInSensitive;
  const enumName = options?.enumName;
  // Prepare an object for fast lookup
  if (values && typeof values === 'object' && !Array.isArray(values)) {
    const keys = Object.keys(values).filter(k => !/^\d+$/.test(k));
    values = keys.reduce((a, k) => {
      if (values[k] != null) a.push(values[k]);
      return a;
    }, [] as any[]);
  }
  const valObj = (Array.isArray(values) ? values : [values]).reduce<any>(
    (a, v) => {
      if (typeof v === 'string' && caseInSensitive) a[v.toUpperCase()] = true;
      else a[v] = true;
      return a;
    },
    {},
  );

  return validator<any>(
    isEnum.name,
    (input: any, context: Context, _this) => {
      if (
        input != null &&
        valObj[
          typeof input === 'string' && caseInSensitive
            ? input.toUpperCase()
            : input
        ]
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be one of enumeration member${enumName ? ` (${enumName})` : ''}`,
        input,
        {
          enum: enumName,
        },
      );
    },
    options,
  );
}

export namespace isEnum {
  export interface Options extends ValidationOptions {
    /** Compares `string` values case-insensitively (matching is done on `.toUpperCase()`), but the original input casing is returned. @defaultValue false */
    caseInSensitive?: boolean;
    /** Included in the failure message as `... (enumName)` for clearer errors. */
    enumName?: string;
  }
}
