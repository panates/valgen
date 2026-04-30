import type { Type } from 'ts-gems';
import {
  Context,
  type ExecutionOptions,
  type Validator,
} from './core/index.js';
import * as vg from './rules/index.js';

export * from './constants.js';
export * from './core/index.js';
const isInstanceOfCache = new WeakMap<Type, Validator>();

const isAlpha = vg.isAlpha();
const isAlphanumeric = vg.isAlphanumeric();
const isAny = vg.isAny();
const isArray = vg.isArray();
const isAscii = vg.isAscii();
const isBase64 = vg.isBase64();
const isBigint = vg.isBigint();
const isBoolean = vg.isBoolean();
const isBtcAddress = vg.isBtcAddress();
const isCreditCard = vg.isCreditCard();
const isDate = vg.isDate();
const isDateString = vg.isDateString();
const isDecimal = vg.isDecimal();
const isDefined = vg.isDefined();
const isEAN = vg.isEAN();
const isEmail = vg.isEmail();
const isEmpty = vg.isEmpty();
const isETHAddress = vg.isETHAddress();
const isFQDN = vg.isFQDN();
const isHex = vg.isHex();
const isHexColor = vg.isHexColor();
const isIBAN = vg.isIBAN();
const isInteger = vg.isInteger();
const isInstanceOf = <T extends object>(
  clazz: Type<T>,
  input: any,
  options?: vg.isInstanceOf.Options,
) => {
  let fn = isInstanceOfCache.get(clazz);
  if (!fn) {
    fn = vg.isInstanceOf(clazz);
    isInstanceOfCache.set(clazz, fn);
  }
  return fn(input, options);
};
const isIP = vg.isIP();
const isIPRange = vg.isIPRange();
const isISSN = vg.isISSN();
const isJWT = vg.isJWT();
const isLowercase = vg.isLowercase();
const isMACAddress = vg.isMACAddress();
const isMobilePhone = vg.isMobilePhone();
const isNotEmpty = vg.isNotEmpty();
const isNotNull = vg.isNotNull();
const isNotNullish = vg.isNotNullish();
const isNull = vg.isNull();
const isNullish = vg.isNullish();
const isNumber = vg.isNumber();
const isObject = vg.isObject();
const isObjectId = vg.isObjectId();
const isPort = vg.isPort();
const isString = vg.isString();
const isSWIFT = vg.isSWIFT();
const isTime = vg.isTime();
const isUndefined = vg.isUndefined();
const isUppercase = vg.isUppercase();
const isURL = vg.isURL();
const isUUID = vg.isUUID();
const isUUID1 = vg.isUUID(1);
const isUUID2 = vg.isUUID(2);
const isUUID3 = vg.isUUID(3);
const isUUID4 = vg.isUUID(4);
const isUUID5 = vg.isUUID(5);
const isUUID6 = vg.isUUID(6);
const isUUID7 = vg.isUUID(7);
const isUUID8 = vg.isUUID(8);

const toArray = vg.isArray(isAny, { coerce: true });
const toBigint = vg.isBigint({ coerce: true });
const toBoolean = vg.isBoolean({ coerce: true });
const toDate = vg.isDate({ coerce: true });
const toDateStringValidators = new Map();
const toDateString = (
  input: Date | string | number,
  options?: ExecutionOptions & { trim?: vg.isDateString.Precision },
  ctx?: Context,
) => {
  const precisionMax = options?.trim ?? 'ms';
  let validator = toDateStringValidators.get(precisionMax);
  if (!validator) {
    validator = vg.isDateString({
      coerce: true,
      precisionMax,
      trim: true,
    });
    toDateStringValidators.set(precisionMax, validator);
  }
  return validator(input, options, ctx);
};
const toInteger = vg.isInteger({ coerce: true });
const toNumber = vg.isNumber({ coerce: true });
const toString = vg.isString({ coerce: true });
const toTime = vg.isTime({ coerce: true });
export {
  isAlpha,
  isAlphanumeric,
  isAny,
  isArray,
  isAscii,
  isBase64,
  isBigint,
  isBoolean,
  isBtcAddress,
  isCreditCard,
  isDate,
  isDateString,
  isDecimal,
  isDefined,
  isEAN,
  isEmail,
  isEmpty,
  isETHAddress,
  isFQDN,
  isHex,
  isHexColor,
  isIBAN,
  isInstanceOf,
  isInteger,
  isIP,
  isIPRange,
  isISSN,
  isJWT,
  isLowercase,
  isMACAddress,
  isMobilePhone,
  isNotEmpty,
  isNotNull,
  isNotNullish,
  isNull,
  isNullish,
  isNumber,
  isObject,
  isObjectId,
  isPort,
  isString,
  isSWIFT,
  isTime,
  isUndefined,
  isUppercase,
  isURL,
  isUUID,
  isUUID1,
  isUUID2,
  isUUID3,
  isUUID4,
  isUUID5,
  isUUID6,
  isUUID7,
  isUUID8,
  toArray,
  toBigint,
  toBoolean,
  toDate,
  toDateString,
  toInteger,
  toNumber,
  toString,
  toTime,
  vg,
};
