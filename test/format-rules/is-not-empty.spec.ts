import { isNotEmpty } from 'valgen';

describe('isNotEmpty', () => {
  it('should validate value is an empty string', () => {
    expect(isNotEmpty('abc')).toStrictEqual('abc');
    expect(() => isNotEmpty('')).toThrow('Value must not be empty');
  });

  it('should validate value is an empty number', () => {
    expect(isNotEmpty(123)).toStrictEqual(123);
  });

  it('should validate value is an empty boolean', () => {
    expect(isNotEmpty(true)).toStrictEqual(true);
    expect(isNotEmpty(false)).toStrictEqual(false);
  });

  it('should validate value is an empty array', () => {
    expect(isNotEmpty([0])).toStrictEqual([0]);
    expect(() => isNotEmpty([])).toThrow('Array must not be empty');
  });

  it('should validate value is an empty array', () => {
    expect(() => isNotEmpty(new ArrayBuffer(1))).not.toThrow();
    expect(() => isNotEmpty(new ArrayBuffer(0))).toThrow(
      'ArrayBuffer must not be empty',
    );
  });

  it('should validate value is an empty Object', () => {
    expect(isNotEmpty({ a: 1 })).toStrictEqual({ a: 1 });
    expect(() => isNotEmpty({})).toThrow('Object must not be empty');
  });

  it('should validate value is an empty Set', () => {
    expect(isNotEmpty(new Set([0]))).toBeInstanceOf(Set);
    expect(() => isNotEmpty(new Set())).toThrow('Set must not be empty');
  });

  it('should validate value is an empty Map', () => {
    expect(isNotEmpty(new Map([['a', 0]]))).toBeInstanceOf(Map);
    expect(() => isNotEmpty(new Map())).toThrow('Map must not be empty');
  });

  it('should validate value is an empty Buffer', () => {
    expect(() => isNotEmpty(Buffer.from([0, 1]))).not.toThrow();
    expect(() => isNotEmpty(Buffer.from([]))).toThrow(
      'Buffer must not be empty',
    );
  });

  it('should validate value is an Date', () => {
    expect(() => isNotEmpty(new Date())).not.toThrow();
  });

  it('should throw if unknown type passed', () => {
    expect(() => isNotEmpty(NaN as any)).toThrow('Value must not be NaN');
  });
});
