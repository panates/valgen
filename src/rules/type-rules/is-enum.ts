import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Validates if given value is one of enum values.
 * @validator isEnum
 */
export function isEnum<T1>(
  values: any,
  options?: ValidationOptions & {
    caseInSensitive?: boolean;
    enumName?: string;
  },
): Validator<T1, any> {
  const caseInSensitive = !!options?.caseInSensitive;
  const enumName = options?.enumName;
  // Prepare an object for fast lookup
  if (values && typeof values === 'object' && !Array.isArray(values)) {
    const keys = Object.keys(values).filter(k => !/^\d+$/.test(k));
    values = keys.reduce((a, k) => {
      if (values[k] != null) a.push(values[k]);
      return a;
      // v => !(typeof v === 'number' && !keys.includes(String(v))),
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
    'isEnum',
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
