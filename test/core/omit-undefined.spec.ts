import { expect } from 'expect';
import { omitUndefined } from '../../src/helpers/omit-undefined.js';

describe('omitUndefined', () => {
  it('should remove keys whose value is undefined', () => {
    const obj = { a: 1, b: undefined, c: 0, d: '', e: false };
    expect(omitUndefined(obj)).toStrictEqual({ a: 1, c: 0, d: '', e: false });
  });

  it('should return non-object input unchanged', () => {
    expect(omitUndefined(null as any)).toStrictEqual(null);
    expect(omitUndefined(undefined as any)).toStrictEqual(undefined);
    expect(omitUndefined(5 as any)).toStrictEqual(5);
    expect(omitUndefined('x' as any)).toStrictEqual('x');
  });

  it('should not descend into nested objects by default', () => {
    const obj = { a: { b: undefined, c: 1 } };
    expect(omitUndefined(obj)).toStrictEqual({ a: { b: undefined, c: 1 } });
  });

  it('should remove nested undefined keys when recursive is true', () => {
    const obj = { a: { b: undefined, c: 1 }, d: undefined };
    expect(omitUndefined(obj, true)).toStrictEqual({ a: { c: 1 } });
  });
});
