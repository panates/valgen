import validatorJS, {
  type UUIDVersion as _UUIDVersion,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid UUID, optionally restricted to a
 * specific version, by delegating to `validatorJS.isUUID(input, version)`.
 * Without a version, any UUID version passes; with a version, only a UUID of
 * that version passes.
 *
 * @param version - The UUID version to restrict to (e.g. `1`-`8`, `'nil'`,
 *   `'max'`, `'loose'`, `'all'`); omit to accept any version.
 * @param options - Validation options.
 * @returns The validated UUID string, unchanged.
 * @throws `Value must be a valid UUID` (or `Value must be a valid UUID v<version>`
 *   when `version` is given) when the input isn't a matching UUID.
 *
 * @example
 * ```ts
 * import { isUUID, isUUID4, vg } from 'valgen';
 *
 * const uuidV4 = '01e0fee8-60d5-42a5-997c-b55a4f3e973f';
 * isUUID(uuidV4); // => uuidV4 (any version accepted)
 * isUUID4(uuidV4); // => uuidV4
 *
 * const isUUIDv1 = vg.isUUID(1);
 * isUUIDv1(uuidV4); // throws ValidationError: "Value must be a valid UUID v1"
 * ```
 * @validator isUUID
 */
export function isUUID(version?: isUUID.UUIDVersion, options?: isUUID.Options) {
  return validator<string, string>(
    isUUID.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isUUID(input, version)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid UUID${version ? ' v' + version : ''}`,
        input,
      );
    },
    options,
  );
}

export namespace isUUID {
  export type UUIDVersion = _UUIDVersion;
  export interface Options extends ValidationOptions {}
}
