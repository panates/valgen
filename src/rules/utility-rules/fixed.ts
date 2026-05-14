import { validator } from '../../core/index.js';

/**
 * Check if value is not nullish before calling nested rule
 * @validator required
 */
export function fixed<T, I>(value: T) {
  return validator<T, I>(fixed.name, (): T => {
    return value;
  });
}
