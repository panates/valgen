import { validator } from '../../core/index.js';

/**
 * Ignores the input and always returns the given constant value.
 * @validator fixed
 */
export function fixed<T, I>(value: T) {
  return validator<T, I>(fixed.name, (): T => {
    return value;
  });
}
