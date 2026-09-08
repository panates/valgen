import { expect } from 'expect';
import {
  isNumber,
  kOptions,
  kValidatorFn,
  ValidationError,
  type ValidationOptions,
  validator,
} from 'valgen';

describe('validator', () => {
  it('should create new validator', () => {
    const options: ValidationOptions = { onFail: () => '' };
    const val = validator('validator1', () => 1, options);
    expect(val).toBeInstanceOf(Function);
    expect(val[kValidatorFn]).toBeInstanceOf(Function);
    expect(val.id).toStrictEqual('validator1');
    expect(val[kOptions]).toEqual(options);
  });

  it('should extract id from function name, if id not given', () => {
    const val = validator(() => {});
    expect(val).toBeInstanceOf(Function);
    expect(val[kValidatorFn]).toBeInstanceOf(Function);
    expect(val.id).toMatch(/^validator\d/);
  });

  it('should check arguments', () => {
    expect(() => validator(0 as any)).toThrow(
      'You must provide a rule function argument',
    );
  });

  it('should convert an unexpected exception thrown by the rule into a validation failure', () => {
    const val = validator('boom', () => {
      throw new Error('kaboom');
    });
    expect(() => val(1)).toThrow('kaboom');
    const r = val.silent(1);
    expect(r.errors?.[0].message).toStrictEqual('kaboom');
  });

  it('should let a ValidationError thrown by the rule propagate as-is', () => {
    const originalIssues = [{ rule: 'inner', message: 'inner failure' }];
    const val = validator('rethrow', () => {
      throw new ValidationError(originalIssues as any);
    });
    let caught: any;
    try {
      val(1);
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(ValidationError);
    expect(caught.issues).toStrictEqual(originalIssues);
  });

  it('should extend an explicitly-passed context with explicitly-passed options', () => {
    const inner = validator('inner', (input: unknown, context) => {
      if (!context.coerce) context.fail(inner, 'not coerced', input);
      return input;
    });
    const outer = validator('outer', (input: unknown, context) =>
      inner(input, { coerce: true }, context),
    );
    expect(outer('x')).toStrictEqual('x');
  });

  it('should .silent() return result object', () => {
    let r = isNumber.silent(1);
    expect(r).toStrictEqual({ value: 1 });
    r = isNumber.silent('x');
    expect(r).toStrictEqual({
      errors: [
        {
          rule: 'isNumber',
          value: 'x',
          message: 'Value must be a number',
        },
      ],
    });
  });
});
