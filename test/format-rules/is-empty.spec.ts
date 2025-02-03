import { isEmpty } from 'valgen';

describe('isEmpty', () => {
  it('should validate value is an empty string', () => {
    expect(isEmpty('')).toStrictEqual('');
    expect(() => isEmpty('dd')).toThrow('Value must be an empty string');
  });

  it('should validate value is an empty array', () => {
    expect(isEmpty([])).toStrictEqual([]);
    expect(() => isEmpty([0])).toThrow('Value must be an empty array');
  });

  it('should validate value is an empty Object', () => {
    expect(isEmpty({})).toStrictEqual({});
    expect(() => isEmpty({ a: 1 })).toThrow('Value must be an empty Object');
  });

  it('should validate value is an empty Set', () => {
    expect(isEmpty(new Set())).toBeInstanceOf(Set);
    expect(() => isEmpty(new Set([0]))).toThrow('Value must be an empty Set');
  });

  it('should validate value is an empty Map', () => {
    expect(isEmpty(new Map())).toBeInstanceOf(Map);
    expect(() => isEmpty(new Map([['a', 0]]))).toThrow(
      'Value must be an empty Map',
    );
  });

  it('should throw if unknown type passed', () => {
    expect(() => isEmpty(NaN as any)).toThrow('Value must be empty');
  });
});
