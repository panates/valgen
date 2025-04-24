import { type Context, type Validator, validator } from '../../core/index.js';

/**
 * Test given value against to all codecs and returns original input
 * @validator allOf
 */
export function allOf<T = any>(rules: Validator[]): Validator<T> {
  return validator('allOf', (input: any, context: Context): any => {
    let i: number;
    let c: Validator;
    const l = rules.length;
    for (i = 0; i < l; i++) {
      c = rules[i];
      c(input, context);
    }
    return input;
  });
}
