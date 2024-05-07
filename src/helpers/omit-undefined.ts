export function omitUndefined<T>(obj: T, recursive?: boolean): T {
  if (!(obj && typeof obj === 'object')) return obj;
  for (const k of Object.keys(obj)) {
    if (obj[k] === undefined) delete obj[k];
    else if (recursive && typeof obj[k] === 'object') omitUndefined(obj[k]);
  }
  return obj;
}
