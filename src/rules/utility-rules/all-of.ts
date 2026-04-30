import type {
  Context,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

/**
 * Test given value against to all codecs and returns original input
 * @validator allOf
 */
export function allOf<T = any>(
  rules: Validator[],
  options?: allOf.Options,
): Validator<T> {
  return validator('allOf', (input: any, context: Context): any => {
    let i: number;
    let c: Validator;
    const l = rules.length;
    for (i = 0; i < l; i++) {
      c = rules[i];
      c(input, context || options);
    }
    return input;
  });
}

export namespace allOf {
  export interface Options extends ValidationOptions {}
}
