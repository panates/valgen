import { expect } from 'expect';
import {
  forwardRef,
  isNumber,
  isString,
  postValidation,
  preValidation,
  vg,
} from 'valgen';

class Address {
  city?: string;
  declare country: string;
}

class Person {
  declare name: string;
  declare age: number;
  declare address?: Address;
}

const addressDef: vg.isObject.Schema = {
  city: [vg.optional(isString), { label: 'City' }],
  country: [vg.required(isString), { label: 'Country' }],
};
const personDef: vg.isObject.Schema = {
  name: [vg.required(isString), { label: 'Full Name', as: 'fullName' }],
  age: [vg.required(isNumber), { label: 'Age' }],
  address: vg.optional(vg.isObject(addressDef, { ctor: Address })),
};
const personValidate = vg.isObject(personDef, { ctor: Person });

describe('isObject', () => {
  it('should validate value is an object', () => {
    const objValidate = vg.isObject({ a: isString });
    expect(objValidate({ a: '1' })).toStrictEqual({ a: '1' });
    expect(() => objValidate(null as any)).toThrow('Value must be an object');
    expect(() => objValidate(undefined as any)).toThrow(
      'Value must be an object',
    );
    expect(() => objValidate(NaN as any)).toThrow('Value must be an object');
  });

  it('should parse json if coerce=true', () => {
    expect(
      personValidate('{"name": "John", "age": "22"}', { coerce: true }),
    ).toEqual({ fullName: 'John', age: 22 });
  });

  it('should coerce properties', () => {
    expect(
      personValidate({ name: 'John', age: '22' }, { coerce: true }),
    ).toEqual({ fullName: 'John', age: 22 });
  });

  it('should set prototype', () => {
    const x = personValidate(
      { name: 'John', age: '22', address: { country: 'Italy' } },
      { coerce: true },
    );
    expect(x).toBeInstanceOf(Person);
    expect(x.address).toBeInstanceOf(Address);
  });

  it('should check required properties', () => {
    expect(() => personValidate({ age: 22 })).toThrow('Value required');
    expect(personValidate.silent({ age: 22 })).toMatchObject({
      errors: [
        {
          context: 'Person',
          rule: 'required',
          property: 'name',
          location: 'name',
          value: undefined,
        },
      ],
    });
    expect(() =>
      personValidate({ name: 'John', address: { city: 'New York' } }),
    ).toThrow('Value required');
    expect(
      personValidate.silent({ name: 'John', address: { city: 'New York' } }),
    ).toMatchObject({
      errors: [
        {
          rule: 'required',
          context: 'Address',
          label: 'Country',
          property: 'country',
          location: 'address.country',
          message: 'Value required',
          value: undefined,
        },
        {
          rule: 'required',
          context: 'Person',
          label: 'Age',
          property: 'age',
          location: 'age',
          message: 'Value required',
          value: undefined,
        },
      ],
    });
  });

  it('should detect circular dependencies', () => {
    const circularCodec = vg.isObject(
      {
        id: isNumber,
        child: vg.optional(forwardRef(() => circularCodec)),
      },
      { detectCircular: true },
    );
    const child1: any = { id: 2 };
    const child2: any = { id: 3 };
    child2.child = child1;
    child1.child = child2;

    const obj = {
      id: 1,
      child: child1,
    };
    expect(circularCodec(obj)).toEqual(obj);
  });

  it('should call [preValidation] function', () => {
    Person[preValidation] = function (input) {
      return { ...input, age: input.age + 1 };
    };
    expect(personValidate({ name: 'julia', age: 18 })).toEqual({
      fullName: 'julia',
      age: 19,
    });
    Person[preValidation] = undefined;
  });

  it('should call [postValidation] function', () => {
    Person[postValidation] = function (input: Person) {
      input.age = input.age + 2;
    };
    expect(personValidate({ name: 'julia', age: 18 })).toEqual({
      fullName: 'julia',
      age: 20,
    });
    Person[postValidation] = undefined;
  });

  it('should throw for an invalid schema entry in tuple form', () => {
    expect(() => vg.isObject({ a: [123, {}] as any })).toThrow(
      'Invalid tuple definition in validation schema (a)',
    );
  });

  it('should throw for an invalid schema entry in plain form', () => {
    expect(() => vg.isObject({ a: 123 as any })).toThrow(
      'Invalid definition in validation schema (a)',
    );
  });

  it('should match property names case-insensitively when caseInSensitive is true', () => {
    const codec = vg.isObject({ Name: isString }, { caseInSensitive: true });
    expect(codec({ name: 'John' } as any)).toStrictEqual({ Name: 'John' });
    expect(codec({ NAME: 'John' } as any)).toStrictEqual({ Name: 'John' });
  });

  it('should only process the first match for a case-insensitive duplicate key', () => {
    const codec = vg.isObject({ name: isString }, { caseInSensitive: true });
    expect(codec({ name: 'a', Name: 'b' } as any)).toStrictEqual({
      name: 'a',
    });
  });

  it('should silently drop additional fields by default', () => {
    const codec = vg.isObject({ a: isString });
    expect(codec({ a: '1', b: 5 } as any)).toStrictEqual({ a: '1' });
  });

  it('should apply a validator to additional fields when additionalFields is a validator', () => {
    const codec = vg.isObject({ a: isString }, { additionalFields: isNumber });
    expect(codec({ a: '1', b: 5 } as any)).toStrictEqual({ a: '1', b: 5 });
    expect(() => codec({ a: '1', b: 'x' } as any)).toThrow(
      'Value must be a number',
    );
  });

  it('should reject additional fields when additionalFields is "error"', () => {
    const objValidate = vg.isObject(
      { a: isString },
      { additionalFields: 'error' },
    );
    expect(objValidate({ a: '1' })).toStrictEqual({ a: '1' });
    expect(() => objValidate({ a: '1', b: 2 } as any)).toThrow(
      "has no field 'b' and does not accept additional fields",
    );
  });
});
