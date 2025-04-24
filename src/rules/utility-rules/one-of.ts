import { type Context, type Validator, validator } from '../../core/index.js';

type DiscriminatorRecord = Record<string, Validator>;

/**
 *
 */
export function oneOf(rules: (Validator | [Validator, DiscriminatorRecord])[]) {
  const l = rules.length;
  return validator('union', (input: any, context: Context, _this): any => {
    let i: number;
    let c: Validator;
    let discriminator: DiscriminatorRecord | undefined;
    let v: any;
    let passed = false;
    // Mock fail method to prevent errors
    context.fail = () => (passed = false);
    for (i = 0; i < l; i++) {
      passed = true;
      if (Array.isArray(rules[i])) {
        c = rules[i][0];
        discriminator = rules[i][1];
        if (
          !(
            input &&
            typeof input === 'object' &&
            typeof discriminator === 'object'
          )
        ) {
          continue;
        }
        try {
          for (const k of Object.keys(discriminator)) {
            discriminator[k](input[k], context);
            if (!passed) break;
          }
          if (!passed) continue;
        } catch {
          continue;
        }
      } else c = rules[i] as Validator;
      if (passed)
        try {
          v = c(input, context);
          if (passed) break;
        } catch {
          //
        }
    }
    // Restore fail method
    delete (context as any).fail;
    if (passed) return v;
    context.fail(_this, `Value didn't match one of required rules`, input);
  });
}
