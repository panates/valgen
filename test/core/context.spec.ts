import { expect } from 'expect';
import { isBigint, isBoolean, isNumber, isString, validator, vg } from 'valgen';

describe('Context message templates', () => {
  it('should suppress the error when onFail returns a falsy value', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'boom', input);
    });
    const r = val.silent('x', { onFail: () => null as any });
    expect(r).toStrictEqual({ value: undefined });
  });

  it('should merge an object returned from onFail into the issue', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'boom', input);
    });
    const r = val.silent('x', {
      onFail: () => ({ message: 'custom', code: 42 }) as any,
    });
    expect(r.errors?.[0]).toMatchObject({ message: 'custom', code: 42 });
  });

  it('should leave an empty {{}} placeholder untouched', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'Value {{}} is bad', input);
    });
    const r = val.silent('x');
    expect(r.errors?.[0].message).toStrictEqual('Value {{}} is bad');
  });

  it('should resolve a placeholder to a matching issue field', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'Rule {{rule}} failed', input);
    });
    const r = val.silent('x');
    expect(r.errors?.[0].message).toStrictEqual('Rule t failed');
  });

  it('should use the fallback text when the key is not found', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'Value {{missingKey|N/A}} is bad', input);
    });
    const r = val.silent('x');
    expect(r.errors?.[0].message).toStrictEqual('Value N/A is bad');
  });

  it('should fall back to location for {{label}} when no explicit label is set', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, '{{label}} is bad', input);
    });
    const r = val.silent('x', { location: 'field1' });
    expect(r.errors?.[0].message).toStrictEqual('`field1` is bad');
  });

  it('should fall back to property for {{label}} when there is no location', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, '{{label}} is bad', input);
    });
    const r = val.silent('x', { property: 'field2' });
    expect(r.errors?.[0].message).toStrictEqual('`field2` is bad');
  });

  it('should use the literal "Value" fallback for {{label}} with no location or property', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, '{{label}} is bad', input);
    });
    const r = val.silent('x');
    expect(r.errors?.[0].message).toStrictEqual('Value is bad');
  });

  it('should leave an unresolvable, non-label placeholder unchanged', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'Value {{someUnknownKey}} is bad', input);
    });
    const r = val.silent('x');
    expect(r.errors?.[0].message).toStrictEqual(
      'Value {{someUnknownKey}} is bad',
    );
  });

  it('should truncate a long {{value}} placeholder', () => {
    const val = validator('t', (input: unknown, context) => {
      context.fail(val, 'Value {{value}} is bad', input);
    });
    const longValue = 'x'.repeat(40);
    const r = val.silent(longValue);
    expect(r.errors?.[0].message).toStrictEqual(
      `Value ${'x'.repeat(30)}.. is bad`,
    );
  });
});

describe('Context maxErrors', () => {
  it('should collect all errors by default', () => {
    const codec = vg.isObject({ a: isString, b: isNumber });
    try {
      codec({ a: 1, b: 'x' } as any);
      throw new Error('should have thrown');
    } catch (e: any) {
      expect(e.issues.length).toStrictEqual(2);
    }
  });

  it('should stop as soon as maxErrors is reached', () => {
    const codec = vg.isObject({ a: isString, b: isNumber }, { maxErrors: 1 });
    try {
      codec({ a: 1, b: 'x' } as any);
      throw new Error('should have thrown');
    } catch (e: any) {
      expect(e.issues.length).toStrictEqual(1);
    }
  });
});

describe('Context coerce inheritance', () => {
  it('should let a coerce:true set on a parent context reach nested field validators', () => {
    const codec = vg.isObject(
      {
        n: isNumber,
        s: isString,
        b: isBoolean,
        big: isBigint,
      },
      { coerce: true },
    );
    expect(codec({ n: '5', s: 1, b: 1, big: 5 } as any)).toStrictEqual({
      n: 5,
      s: '1',
      b: true,
      big: BigInt(5),
    });
  });
});
