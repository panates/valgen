import { expect } from 'expect';
import { vg } from 'valgen';

describe('isHash', () => {
  it('should validate value is a md5 hash', () => {
    const fn = vg.isHash('md5');
    expect(fn('5d41402abc4b2a76b9719d911017c592')).toStrictEqual(
      '5d41402abc4b2a76b9719d911017c592',
    );
    expect(() => fn('too-short')).toThrow('Value must be a valid md5 hash');
  });

  it('should validate value is a sha1 hash', () => {
    const fn = vg.isHash('sha1');
    expect(fn('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')).toStrictEqual(
      'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
    );
    expect(() => fn('5d41402abc4b2a76b9719d911017c592')).toThrow(
      'Value must be a valid sha1 hash',
    );
  });

  it('should validate value is a sha256 hash', () => {
    const fn = vg.isHash('sha256');
    expect(
      fn('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'),
    ).toStrictEqual(
      '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    );
    expect(() => fn('5d41402abc4b2a76b9719d911017c592')).toThrow(
      'Value must be a valid sha256 hash',
    );
  });

  it('should reject a value with the wrong length for the given algorithm', () => {
    const fn = vg.isHash('md5');
    expect(() => fn('5d41402abc4b2a76b9719d911017c59')).toThrow(
      'Value must be a valid md5 hash',
    );
  });

  it('should reject non-string and empty values', () => {
    const fn = vg.isHash('md5');
    expect(() => fn(undefined as any)).toThrow(
      'Value must be a valid md5 hash',
    );
    expect(() => fn(null as any)).toThrow('Value must be a valid md5 hash');
    expect(() => fn(12345 as any)).toThrow('Value must be a valid md5 hash');
  });
});
