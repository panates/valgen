import { isBigint } from 'valgen';

describe("isBigint", function () {

  it("should validate value is an integer", function () {
    expect(isBigint()(1n)).toStrictEqual(1n);
    expect(isBigint()(-1n)).toStrictEqual(-1n);
    expect(isBigint()(0n)).toStrictEqual(0n);
    expect(() => isBigint()(undefined)).toThrow('Value is not a valid BigInt');
    expect(() => isBigint()(null)).toThrow('Value is not a valid BigInt');
    expect(() => isBigint()('1')).toThrow('Value is not a valid BigInt');
    expect(() => isBigint()('1.3')).toThrow('Value is not a valid BigInt');
    expect(() => isBigint()('x5')).toThrow('Value is not a valid BigInt');
    expect(() => isBigint()(NaN)).toThrow('Value is not a valid BigInt');
  });

  it("should coerce to BigInt", function () {
    expect(isBigint()('4', {coerce: true})).toStrictEqual(4n);
    expect(isBigint()('-3', {coerce: true})).toStrictEqual(-3n);
    expect(isBigint()(5, {coerce: true})).toStrictEqual(5n);
  });

});