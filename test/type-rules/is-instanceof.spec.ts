import { expect } from 'expect';
import { isInstanceOf } from 'valgen';

describe('isInstanceOf', () => {
  class Class1 {}
  class Class2 {}

  it('should validate value is instance of given class', () => {
    const c1 = new Class1();
    expect(isInstanceOf(Class1, c1)).toStrictEqual(c1);
    expect(isInstanceOf(Class1, c1)).toBeInstanceOf(Class1);

    expect(() => isInstanceOf(Class1, undefined)).toThrow(
      'Value must be an instance of "Class1"',
    );
    expect(() => isInstanceOf(Class1, {})).toThrow(
      'Value must be an instance of "Class1"',
    );
    expect(() => isInstanceOf(Class1, null)).toThrow(
      'Value must be an instance of "Class1"',
    );
    expect(() => isInstanceOf(Class1, 5)).toThrow(
      'Value must be an instance of "Class1"',
    );
    expect(() => isInstanceOf(Class1, 'x')).toThrow(
      'Value must be an instance of "Class1"',
    );
  });

  it('should coerce plain object to given class', () => {
    expect(isInstanceOf(Class1, {}, { coerce: true })).toBeInstanceOf(Class1);
  });

  it('should not coerce the object if is not plain', () => {
    expect(() => isInstanceOf(Class1, new Class2(), { coerce: true })).toThrow(
      'Value must be an instance of "Class1"',
    );
  });
});
