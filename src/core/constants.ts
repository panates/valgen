/**
 * Symbol key used to store a {@link Validator}'s underlying
 * {@link ValidateFunction} on itself. Exported only because it appears in
 * `Validator`'s type signature; not intended for direct use.
 * @internal
 */
export const kValidatorFn = Symbol.for('kValidatorFn');

/**
 * Symbol key used to store a {@link Validator}'s construction-time
 * {@link ValidationOptions} on itself. Not intended for direct use.
 * @internal
 */
export const kOptions = Symbol.for('kOptions');
