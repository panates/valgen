import {
  type Context,
  type Nullish,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 *
 */
export function union<T, I>(codecs: Validator<T, I>[]) {
  const l = codecs.length;
  return validator<T, I>(
    'union',
    (input: I, context: Context, _this): Nullish<T> => {
      let i: number;
      let c: Validator;
      let v: any;
      let passed = false;
      // Mock fail method to prevent errors
      context.fail = () => (passed = false);
      for (i = 0; i < l; i++) {
        c = codecs[i];
        try {
          passed = true;
          v = c(input, context);
          if (passed) break;
        } catch {
          //
        }
      }
      // Restore fail method
      delete (context as any).fail;
      if (passed) return v;
      context.fail(_this, `Value didn't match any on union rules`, input);
    },
  );
}
