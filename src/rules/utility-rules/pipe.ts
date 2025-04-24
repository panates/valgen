import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

export interface PipeOptions extends ValidationOptions {
  returnIndex?: number;
}

/**
 *
 * @validator pipe
 */
export function pipe<T>(
  rules: Validator[],
  options?: PipeOptions,
): Validator<T> {
  const l = rules.length;
  const returnIndex = options?.returnIndex;
  return validator<T, any>(
    'pipe',
    (input: unknown, context: Context): Nullish<T> => {
      let i: number;
      let c: Validator;
      let v = input;
      let returnValue: any = input;
      const oldErrors = context.errors.length;
      for (i = 0; i < l; i++) {
        c = rules[i];
        v = c(v, context);
        if (returnIndex == null || i <= returnIndex) returnValue = v;
        if (context.errors.length > oldErrors) return;
      }
      return returnValue as T;
    },
    options,
  );
}
