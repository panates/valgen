import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Coerces given value to "UUID" format or returns undefined if nullish
 * @validator uuid
 */
export function matches(format: string | RegExp, options?: matches.Options) {
  const regExp = format instanceof RegExp ? format : new RegExp(format);
  const formatName = options?.formatName;
  return validator<string, string>(
    'matches',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (input == null) return;
      if (typeof input === 'string' && regExp.test(input)) return input;
      context.fail(
        _this,
        `Value must match ${formatName || 'requested'} format`,
        input,
        {
          format,
          formatName,
        },
      );
    },
    options,
  );
}

export namespace matches {
  export interface Options extends ValidationOptions {
    formatName?: string;
  }
}
