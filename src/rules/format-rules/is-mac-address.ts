import { Nullish } from 'ts-gems';
import * as validatorJS from 'validator';
import { Context, ValidationOptions, validator } from '../../core/index.js';

export interface IsMACAddressOptions extends ValidationOptions {
  /**
   * If set to `true`, the validator will allow MAC addresses without the colons.
   * Also, it allows the use of hyphens or spaces.
   *
   * e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.
   *
   * @default false
   */
  noSeparators?: boolean;

  /**
   * Setting `eui` allows for validation against EUI-48 or EUI-64 instead of both.
   */
  eui?: '48' | '64';
}

/**
 * Validates if value is an MACAddress
 * @validator isMACAddress
 */
export function isMACAddress(options?: IsMACAddressOptions) {
  const opts: validatorJS.IsMACAddressOptions = {
    // eslint-disable-next-line camelcase
    no_separators: options?.noSeparators,
    eui: options?.eui,
  };
  return validator<string, string>(
    'isMACAddress',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isMACAddress(input, opts)
      ) {
        return input;
      }
      context.fail(_this, `{{label}} is not a valid MAC address`, input);
    },
    options,
  );
}
