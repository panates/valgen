import { isArray, isBoolean, isInteger, isString } from 'valgen';

describe("isArray", function () {

  it("should validate value is an array", function () {
    expect(isArray()([true])).toStrictEqual([true]);
    expect(isArray()([1])).toStrictEqual([1]);
    expect(() => isArray()(undefined)).toThrow('is not an array');
    expect(() => isArray()(null)).toThrow('is not an array');
    expect(() => isArray()(5 as any)).toThrow('is not an array');
    expect(() => isArray()(NaN as any)).toThrow('is not an array');
  });

  it("should validate items according to item rule", function () {
    expect(isArray(isInteger())([1, 2])).toStrictEqual([1, 2]);
    expect(() => isArray(isInteger())(['1', '2'])).toThrow('`Item[0]` is not a valid integer number');
  })

  it("should coerce value to array", function () {
    expect(isArray()('x', {coerce: true})).toStrictEqual(['x']);
    expect(isArray(isBoolean())([1], {coerce: true})).toStrictEqual([true]);
    expect(isArray(isString())([false, '1'], {coerce: true})).toStrictEqual(['false', '1']);
  });

});
