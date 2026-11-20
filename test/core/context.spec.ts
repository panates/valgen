import { expect } from 'expect';
import {
  Context,
  isBigint,
  isBoolean,
  isNumber,
  isString,
  validator,
  vg,
} from 'valgen';

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

describe('Context.extend', () => {
  // Reads a custom option from the context it runs in.
  const readsTenant = validator('readsTenant', (input: any, context) => {
    return `${input}@${context.tenant}`;
  });

  it('should copy the parent fields and share the errors array', () => {
    const parent = new Context({ coerce: true, label: 'L', maxErrors: 3 });
    parent.location = 'a.b';
    const child = parent.extend();
    expect(child.isRoot).toStrictEqual(false);
    expect(child.errors).toBe(parent.errors);
    expect(child.coerce).toStrictEqual(true);
    expect(child.label).toStrictEqual('L');
    expect(child.maxErrors).toStrictEqual(3);
    expect(child.location).toStrictEqual('a.b');
  });

  it('should apply options on top and skip undefined ones', () => {
    const parent = new Context({ coerce: true, label: 'L' });
    const child = parent.extend({ coerce: false, label: undefined });
    expect(child.coerce).toStrictEqual(false);
    expect(child.label).toStrictEqual('L');
    expect(parent.coerce).toStrictEqual(true);
  });

  it('should not let a child change its parent', () => {
    const parent = new Context();
    const child = parent.extend({ location: 'x' });
    child.label = 'changed';
    expect(parent.location).toBeUndefined();
    expect(parent.label).toBeUndefined();
  });

  it('should carry custom options from the root call to nested rules', () => {
    const v = vg.isObject({
      items: vg.isArray(vg.isObject({ user: readsTenant })),
    });
    expect(
      v(
        { items: [{ user: 'a' }, { user: 'b' }] } as any,
        {
          tenant: 't1',
        } as any,
      ),
    ).toStrictEqual({ items: [{ user: 'a@t1' }, { user: 'b@t1' }] });
  });

  it('should carry custom options given to extend() without changing the parent', () => {
    const parent = new Context({ tenant: 't1' } as any);
    const child = parent.extend({ region: 'eu' } as any);
    const grandChild = child.extend();
    expect(grandChild.tenant).toStrictEqual('t1');
    expect(grandChild.region).toStrictEqual('eu');
    expect(parent.region).toBeUndefined();
    expect(parent.customKeys).toStrictEqual(['tenant']);
  });

  it('should pass only context fields from the options a rule is built with', () => {
    let seen: Context | undefined;
    const spy = validator('spy', (input: any, context) => {
      seen = context;
      return input;
    });
    const v = vg.isObject({ inner: vg.isObject({ n: isNumber, s: spy }) }, {
      coerce: true,
      label: 'Outer',
      name: 'Thing',
      additionalFields: 'error',
      tenant: 't2',
    } as any);
    expect(v({ inner: { n: '5', s: 'x' } } as any)).toStrictEqual({
      inner: { n: 5, s: 'x' },
    });
    expect(seen?.coerce).toStrictEqual(true);
    expect(seen?.label).toStrictEqual('Outer');
    expect(seen?.tenant).toBeUndefined();
    expect(seen?.additionalFields).toBeUndefined();
    expect(seen?.name).toBeUndefined();
  });

  it('should keep the subclass of a subclassed context', () => {
    class MyContext extends Context {
      hello() {
        return 'hi';
      }
    }
    const parent = new MyContext({ coerce: true });
    const child = parent.extend({ label: 'x' }) as MyContext;
    expect(child).toBeInstanceOf(MyContext);
    expect(child.hello()).toStrictEqual('hi');
    expect(child.coerce).toStrictEqual(true);
    expect(child.isRoot).toStrictEqual(false);
    expect(child.errors).toBe(parent.errors);
  });

  it('should pass a replaced fail method to contexts made from it', () => {
    const parent = new Context();
    const calls: string[] = [];
    parent.fail = (_rule, message) => {
      calls.push(String(message));
    };
    const child = parent.extend({ label: 'x' });
    child.fail(isString, 'boom', 1);
    expect(calls).toStrictEqual(['boom']);
    expect(parent.errors).toStrictEqual([]);
  });

  it('should keep failures inside nested oneOf rules out of the result', () => {
    const v = vg.oneOf([
      vg.isObject({ a: vg.oneOf([isNumber, vg.isObject({ x: isNumber })]) }),
      vg.isObject({ b: isString }),
    ]);
    expect(v({ a: { x: 1 } } as any)).toStrictEqual({ a: { x: 1 } });
    expect(v({ b: 'ok' } as any)).toStrictEqual({ b: 'ok' });
    expect(() => v({ a: 'nope' } as any)).toThrow();
  });

  it('should stop at maxErrors across nested contexts', () => {
    const v = vg.isObject({
      a: vg.isObject({ x: isNumber, y: isNumber }),
      b: isNumber,
    });
    const r = v.silent({ a: { x: 's', y: 's' }, b: 's' } as any, {
      maxErrors: 2,
    });
    expect(r.errors?.length).toStrictEqual(2);
  });
});
