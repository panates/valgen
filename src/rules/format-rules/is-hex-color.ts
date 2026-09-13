import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid hexadecimal color (e.g. `#fff`,
 * `#ffffff`). Delegates to `validatorJS.isHexColor(input)`.
 * @validator isHexColor
 * @param options - Validation options.
 * @returns The validated hex color string, unchanged.
 * @throws `Value must be a valid Hex Color` when the input is not a string,
 *   or is not a valid hex color.
 * @example
 * ```ts
 * import { isHexColor } from 'valgen';
 *
 * isHexColor('#fff'); // => '#fff'
 * isHexColor('notacolor'); // throws ValidationError: "Value must be a valid Hex Color"
 * ```
 */
export function isHexColor(options?: isHexColor.Options) {
  return validator<string, string>(
    isHexColor.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isHexColor(input)) {
        return input;
      }
      context.fail(_this, `Value must be a valid Hex Color`, input);
    },
    options,
  );
}

export namespace isHexColor {
  export interface Options extends ValidationOptions {}
}
