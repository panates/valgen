import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is "integer".
 * Converts input value to integer number if coerce option is set to 'true'.
 * @validator isInteger
 */
export function isInteger(options?: ValidationOptions) {
  return validator<number, unknown>(
    'isInteger',
    (input: unknown, context: Context, _this): Nullish<number> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'number' && coerce) {
        if (typeof input === 'string') output = parseFloat(input);
        else if (typeof input === 'bigint') {
          output = Number(input);
          if (input === BigInt(output)) input = output;
        }
      }
      if (
        typeof output === 'number' &&
        !isNaN(output) &&
        Number.isInteger(output)
      ) {
        return output;
      }
      context.fail(_this, `Value must be a valid integer value`, input);
    },
    options,
  );
}
