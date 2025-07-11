import * as vg from './rules/index.js';

export * from './constants.js';
export * from './core/index.js';
export type { IsObject } from './rules/type-rules/is-object.js';

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

const toArray = vg.isArray(isAny, { coerce: true });
const toBigint = vg.isBigint({ coerce: true });
const toBoolean = vg.isBoolean({ coerce: true });
const toDate = vg.isDate({ coerce: true });
const toDateString = vg.isDateString({ coerce: true });
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
