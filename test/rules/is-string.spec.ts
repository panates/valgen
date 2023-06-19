import { isString, stringReplace, stringSplit, trim, trimEnd, trimStart } from 'valgen';

/*
 *
 */
describe("isString", function () {
  it("should validate value is a string", function () {
    expect(isString()('1')).toStrictEqual('1');
    expect(isString()('')).toStrictEqual('');
    expect(() => isString()(undefined)).toThrow('Value is not a string');
    expect(() => isString()(null)).toThrow('Value is not a string');
    expect(() => isString()(1)).toThrow('Value is not a string');
    expect(() => isString()(true)).toThrow('Value is not a string');
    expect(() => isString()(NaN)).toThrow('Value is not a string');
  });

  it("should coerce to string", function () {
    expect(isString()(1, {coerce: true})).toStrictEqual('1');
    expect(isString()(0, {coerce: true})).toStrictEqual('0');
    expect(isString()('1', {coerce: true})).toStrictEqual('1');
    expect(isString()('0', {coerce: true})).toStrictEqual('0');
    expect(isString()({toJSON: () => 'test'}, {coerce: true})).toStrictEqual('test');
    expect(isString()({x: 1}, {coerce: true})).toStrictEqual('{"x":1}');
  });

});

/*
 *
 */
describe("stringReplace", function () {
  it("should process String.replace", function () {
    expect(stringReplace(/-/g, '_')('a-b')).toStrictEqual('a_b');
    expect(stringReplace('-', '_')('a-b')).toStrictEqual('a_b');
  });
});


/*
 *
 */
describe("stringTrim", function () {
  it("should trim string value", function () {
    expect(trim()(' a ')).toStrictEqual('a');
    expect(trim()(' a')).toStrictEqual('a');
    expect(trim()('a ')).toStrictEqual('a');
  });
});

/*
 *
 */
describe("stringTrim", function () {
  it("should trim string value", function () {
    expect(trimStart()(' a ')).toStrictEqual('a ');
    expect(trimStart()(' a')).toStrictEqual('a');
  });
});

/*
 *
 */
describe("stringTrim", function () {
  it("should trim string value", function () {
    expect(trimEnd()(' a ')).toStrictEqual(' a');
    expect(trimEnd()('a ')).toStrictEqual('a');
  });
});

/*
 *
 */
describe("stringSplit", function () {
  it("should process String.replace", function () {
    expect(stringSplit(',')('a,b')).toStrictEqual(['a', 'b']);
  });
});