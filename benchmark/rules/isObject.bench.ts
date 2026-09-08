import { isNumber, isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// isObject is highly configurable and its cost depends a lot on how it's
// used - a single "valid input" case would be misleading. Each case below
// isolates one structural dimension (schema width, an option that's on but
// unused, an option that's actually exercised, nesting) so the cost of
// turning a given feature on is visible on its own, not folded into a
// single average.

const flat = vg.isObject({ name: isString, age: isNumber });
const validFlat = { name: 'John', age: 30 };
const invalidFlat = { name: 'John', age: 'not-a-number' };

const wideSchema: Record<string, typeof isNumber> = {};
for (let i = 0; i < 50; i++) wideSchema[`field${i}`] = isNumber;
const wide = vg.isObject(wideSchema);
const validWide: Record<string, number> = {};
for (let i = 0; i < 50; i++) validWide[`field${i}`] = i;

// Same shape as `flat`, but with detectCircular turned on - the object
// itself is never actually circular, so this isolates the pure overhead of
// the feature (a Map allocation + 2 lookups) when it isn't needed.
const withDetectCircular = vg.isObject(
  { name: isString, age: isNumber },
  { detectCircular: true },
);

// Same shape as `flat`, but the input carries a field the schema doesn't
// know about, with additionalFields set to reject it - this is the only way
// to actually exercise that branch (the default schema+matching-input case
// never reaches it at all).
const withAdditionalFieldsError = vg.isObject(
  { name: isString, age: isNumber },
  { additionalFields: 'error' },
);
const objWithExtraField = { name: 'John', age: 30, extra: 'unexpected' };

const withCaseInSensitive = vg.isObject(
  { name: isString, age: isNumber },
  { caseInSensitive: true },
);

const addressSchema = { city: isString, zip: isString };
const nested = vg.isObject({
  name: isString,
  address: vg.isObject(addressSchema),
});
const validNested = { name: 'John', address: { city: 'NYC', zip: '10001' } };

export const cases: BenchCase[] = [
  {
    name: 'isObject - flat schema (2 fields) - valid (pass)',
    fn: () => {
      flat(validFlat);
    },
  },
  {
    name: 'isObject - flat schema (2 fields) - invalid (throws)',
    fn: () => {
      try {
        flat(invalidFlat);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isObject - flat schema (2 fields) - invalid (.silent())',
    fn: () => {
      flat.silent(invalidFlat);
    },
  },
  {
    name: 'isObject - wide schema (50 fields) - valid (pass)',
    fn: () => {
      wide(validWide);
    },
  },
  {
    name: 'isObject - detectCircular:true, non-circular - valid (pass)',
    fn: () => {
      withDetectCircular(validFlat);
    },
  },
  {
    name: 'isObject - additionalFields:"error", extra field present (throws)',
    fn: () => {
      try {
        withAdditionalFieldsError(objWithExtraField);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isObject - caseInSensitive:true - valid (pass)',
    fn: () => {
      withCaseInSensitive(validFlat);
    },
  },
  {
    name: 'isObject - nested isObject (1 level) - valid (pass)',
    fn: () => {
      nested(validNested);
    },
  },
];
