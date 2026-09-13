import { validator } from '../../core/index.js';

/**
 * Does nothing and always succeeds, returning the original input value
 * unchanged - useful as a permissive item/value rule inside `isArray`,
 * `isRecord`, `isTuple`, etc.
 * @validator isAny
 * @returns The input value, unmodified.
 * @example
 * ```ts
 * import { isAny, vg } from 'valgen';
 *
 * isAny('anything'); // => 'anything'
 * isAny(null); // => null
 * vg.isRecord(vg.isString, isAny)({ a: 1, b: 'x' }); // => { a: 1, b: 'x' }
 * ```
 */
export const isAny = () =>
  validator<any, any>(isAny.name, (input: unknown): any => input);
