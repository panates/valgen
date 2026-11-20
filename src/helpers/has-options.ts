/**
 * Checks whether an options object sets anything: an own property with a
 * defined value. `Context.extend` skips undefined values, so an options
 * object without one would produce a child context that changes nothing.
 */
export function hasOptions(options: object | undefined | null): boolean {
  if (!options) return false;
  for (const k in options) {
    if (
      Object.prototype.hasOwnProperty.call(options, k) &&
      (options as Record<string, unknown>)[k] !== undefined
    )
      return true;
  }
  return false;
}
