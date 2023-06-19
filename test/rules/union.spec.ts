import { isNull, isNumber, union } from 'valgen';

describe("union", function () {

  it("should return one of valid values", function () {
    const c = union([isNull(), isNumber()]);
    expect(c(6)).toStrictEqual(6);
    expect(c(null)).toStrictEqual(null);
    expect(() => c('x' as any)).toThrow('didn\'t match any of required format');
  });

})


