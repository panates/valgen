import { validator } from '../../core/index.js';

/**
 * Does nothing, just returns the original input value.
 * @validator isAny
 */
export const isAny = () =>
  validator<any, any>('is-any', (input: unknown): any => input);
