import { type Nullish, validator } from '../../core/index.js';

/**
 * Applies "String.replace" method
 * @validator stringReplace
 */
export function stringReplace(
  searchValue: string | RegExp,
  replaceValue: string,
);
export function stringReplace(
  searchValue: string | RegExp,
  replacer: (subsring: string, ...args: any[]) => string,
);
export function stringReplace(
  searchValue: {
    [Symbol.replace](string: string, replaceValue: string): string;
  },
  replaceValue: string,
);
export function stringReplace(
  searchValue: {
    [Symbol.replace](
      string: string,
      replacer: (substring: string, ...args: any[]) => string,
    ): string;
  },
  replacer: (substring: string, ...args: any[]) => string,
);
export function stringReplace(searchValue: any, replacer: any) {
  return validator<string>(
    stringReplace.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).replace(searchValue, replacer);
    },
  );
}

/**
 * Applies "String.split" method
 * @validator split
 */
export function stringSplit(separator: string | RegExp, limit?: number);
export function stringSplit(
  splitter: { [Symbol.split](string: string, limit?: number): string[] },
  limit?: number,
);
export function stringSplit(splitter: any, limit: any) {
  return validator<string[], string>(stringSplit.name, (input: unknown) => {
    if (input == null) return input;
    return String(input).split(splitter, limit);
  });
}

/**
 * Removes whitespace from both ends of a string
 * @validator trim
 */
export function trim() {
  return validator<string, string>(trim.name, (input: unknown) => {
    if (input == null) return input;
    return String(input).trim();
  });
}

// *************************************************************

/**
 * Removes whitespace from the end of a string
 * @validator trimEnd
 */
export function trimEnd() {
  return validator<string, string>(
    trimEnd.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).trimEnd();
    },
  );
}

// *************************************************************

/**
 * Removes whitespace from the beginning of a string
 * @validator trimStart
 */
export function trimStart() {
  return validator<string, string>(
    trimStart.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).trimStart();
    },
  );
}
