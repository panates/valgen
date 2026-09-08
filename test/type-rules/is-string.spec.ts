import { expect } from 'expect';
import { isString, vg } from 'valgen';

/*
 *
 */
describe('isString', () => {
  it('should validate value is a string', () => {
    expect(isString('1')).toStrictEqual('1');
    expect(isString('')).toStrictEqual('');
    expect(() => isString(undefined)).toThrow('Value must be a string');
    expect(() => isString(null)).toThrow('Value must be a string');
    expect(() => isString(1)).toThrow('Value must be a string');
    expect(() => isString(true)).toThrow('Value must be a string');
    expect(() => isString(NaN)).toThrow('Value must be a string');
  });

  it('should coerce to string', () => {
    expect(isString(1, { coerce: true })).toStrictEqual('1');
    expect(isString(0, { coerce: true })).toStrictEqual('0');
    expect(isString('1', { coerce: true })).toStrictEqual('1');
    expect(isString('0', { coerce: true })).toStrictEqual('0');
    expect(isString({ toJSON: () => 'test' }, { coerce: true })).toStrictEqual(
      'test',
    );
    expect(isString({ x: 1 }, { coerce: true })).toStrictEqual('{"x":1}');
  });
});

/*
 *
 */
describe('stringReplace', () => {
  it('should process String.replace', () => {
    expect(vg.stringReplace(/-/g, '_')('a-b')).toStrictEqual('a_b');
    expect(vg.stringReplace('-', '_')('a-b')).toStrictEqual('a_b');
  });

  it('should pass through null/undefined unchanged', () => {
    expect(vg.stringReplace('-', '_')(null as any)).toStrictEqual(null);
    expect(vg.stringReplace('-', '_')(undefined as any)).toStrictEqual(
      undefined,
    );
  });
});

/*
 *
 */
describe('trim', () => {
  it('should trim string value', () => {
    expect(vg.trim()(' a ')).toStrictEqual('a');
    expect(vg.trim()(' a')).toStrictEqual('a');
    expect(vg.trim()('a ')).toStrictEqual('a');
  });

  it('should pass through null/undefined unchanged', () => {
    expect(vg.trim()(null as any)).toStrictEqual(null);
    expect(vg.trim()(undefined as any)).toStrictEqual(undefined);
  });
});

/*
 *
 */
describe('trimStart', () => {
  it('should trim string value', () => {
    expect(vg.trimStart()(' a ')).toStrictEqual('a ');
    expect(vg.trimStart()(' a')).toStrictEqual('a');
  });

  it('should pass through null/undefined unchanged', () => {
    expect(vg.trimStart()(null as any)).toStrictEqual(null);
    expect(vg.trimStart()(undefined as any)).toStrictEqual(undefined);
  });
});

/*
 *
 */
describe('trimEnd', () => {
  it('should trim string value', () => {
    expect(vg.trimEnd()(' a ')).toStrictEqual(' a');
    expect(vg.trimEnd()('a ')).toStrictEqual('a');
  });

  it('should pass through null/undefined unchanged', () => {
    expect(vg.trimEnd()(null as any)).toStrictEqual(null);
    expect(vg.trimEnd()(undefined as any)).toStrictEqual(undefined);
  });
});

/*
 *
 */
describe('stringSplit', () => {
  it('should process String.split', () => {
    expect(vg.stringSplit(',')('a,b')).toStrictEqual(['a', 'b']);
  });

  it('should pass through null/undefined unchanged', () => {
    expect(vg.stringSplit(',')(null as any)).toStrictEqual(null);
    expect(vg.stringSplit(',')(undefined as any)).toStrictEqual(undefined);
  });
});
