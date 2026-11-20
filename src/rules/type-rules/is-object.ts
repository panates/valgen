import { postValidation, preValidation } from '../../constants.js';
import {
  type Context,
  isValidator,
  kOptionalNested,
  kOptions,
  type Nullish,
  type Type,
  type ValidationOptions,
  type Validator as Validator_,
  validator,
} from '../../core/index.js';
import { hasOptions } from '../../helpers/has-options.js';

/**
 * Validates an object against a property `schema`, with support for nested
 * schemas, renaming/relabeling fields via `[Validator, PropertyOptions]`
 * tuples, controlling unknown properties via `additionalFields`,
 * case-insensitive key matching via `caseInSensitive`, and
 * circular-reference detection via `detectCircular`. Converts properties
 * according to schema rules if the `coerce` option is set to `true`.
 * @validator isObject
 * @typeParam T - The validated output object type.
 * @typeParam I - The accepted input type.
 * @param schema - Maps property keys to a `Validator` (or a
 *   `[Validator, PropertyOptions]` tuple to customize the error `label` or
 *   rename the output key via `as`); omit for a schema-less "is this an
 *   object" check.
 * @param options - Validation options.
 * @returns The validated object; when `ctor` is set, its prototype is
 *   `ctor.prototype` (so `instanceof ctor` is `true`). Properties whose
 *   validated value is `undefined` are omitted from the output.
 * @throws `Value must be an object` if the (possibly JSON-parsed) input is
 *   not a non-null object.
 * @throws `Object has no field '<key>' and does not accept additional
 *   fields` (or `<name> has no field...` when `name`/`ctor` is set) if
 *   `additionalFields: 'error'` and the input has an undeclared property.
 * @throws Whatever the failing property's own rule throws, located at that
 *   property's path (e.g. `address.country`).
 * @example
 * ```ts
 * import { isNumber, isString, vg } from 'valgen';
 *
 * class Person {
 *   declare name: string;
 *   declare age: number;
 * }
 * const personDef: vg.isObject.Schema = {
 *   name: [vg.required(isString), { label: 'Full Name', as: 'fullName' }],
 *   age: [vg.required(isNumber), { label: 'Age' }],
 * };
 * const validatePerson = vg.isObject(personDef, { ctor: Person });
 *
 * validatePerson({ name: 'John', age: '22' }, { coerce: true });
 * // => { fullName: 'John', age: 22 }  (instance of Person)
 * ```
 */
export function isObject<T extends object = object, I = object | string>(
  schema?: isObject.Schema,
  options?: isObject.Options<T>,
): isObject.Validator<T, I> {
  const ctor = options?.ctor;
  const ctorName = options?.name || ctor?.name;
  const additionalFields = options?.additionalFields ?? !schema;
  const additionalRule = isValidator(additionalFields)
    ? additionalFields
    : undefined;
  const caseInSensitive = !!options?.caseInSensitive;
  const detectCircular = !!options?.detectCircular;
  const properties = new Map<string, PropertyEntry>();
  schema = schema || {};
  const schemaKeys = Object.keys(schema);
  const schemaEntries: PropertyEntry[] = [];
  for (const k of schemaKeys) {
    const n = schema[k];
    const key = caseInSensitive ? k.toLowerCase() : k;
    let rule: Validator_;
    let propOptions: isObject.PropertyOptions | undefined;
    if (Array.isArray(n)) {
      if (!isValidator(n[0])) {
        throw new TypeError(
          `Invalid tuple definition in validation schema (${k})`,
        );
      }
      rule = n[0];
      propOptions = n[1];
    } else if (isValidator(n)) {
      rule = n;
    } else {
      throw new TypeError(`Invalid definition in validation schema (${k})`);
    }
    const entry: PropertyEntry = {
      inputKey: k,
      key,
      // Same as the former `{ as: k, ...propOptions }`, read with
      // `as || key`: an `as` given as undefined or '' falls back to the key.
      as: (propOptions && 'as' in propOptions ? propOptions.as : k) || key,
      label: propOptions?.label,
      rule,
      optionalNested: (rule as any)[kOptionalNested],
    };
    // Two schema keys can match the same key case-insensitively. As before,
    // the first one keeps its place and is read from the input, and the
    // last one's rule and options apply.
    const existing = properties.get(key);
    if (existing)
      Object.assign(existing, entry, { inputKey: existing.inputKey });
    else {
      properties.set(key, entry);
      schemaEntries.push(entry);
    }
  }

  const _rule = validator<T, object>(
    isObject.name,
    (
      input: any,
      context: Context & { circMap?: Map<object, object> },
      _this,
    ): Nullish<T> => {
      let output: any = input;
      if (ctor && ctor[preValidation]) {
        output = ctor[preValidation](output, context, _this);
      }

      const coerce = options?.coerce ?? context.coerce;
      if (typeof output === 'string' && coerce) output = JSON.parse(output);

      if (!(output && typeof output === 'object')) {
        context.fail(_this, `Value must be an object`, input);
        return;
      }

      const out: any = {};
      if (ctor) Object.setPrototypeOf(out, ctor.prototype);
      if (detectCircular) {
        context.circMap = context.circMap || new Map<object, object>();
        if (context.circMap.has(output)) {
          return context.circMap.get(output) as any;
        }
        context.circMap.set(output, out);
      }

      if (context.root == null) context.root = context.root || ctorName || '';
      const location = context.location || '';
      const locationPrefix = location ? location + '.' : '';
      const parentLabel = context.label;
      // With case-insensitive matching two input keys can map to the same
      // schema key, so the keys already handled have to be tracked; with
      // exact matching, own keys are unique and an own-property check is
      // enough to tell which schema keys the first pass already handled.
      const processed: Record<string, boolean> | undefined = caseInSensitive
        ? Object.create(null)
        : undefined;
      // Reused across every property instead of allocated per-property.
      // `scope`/`context` never change between properties, so they're set
      // once; `runProperty` reassigns `location`/`property`/`label` for
      // every property that runs a rule, so no field can leak from one
      // property into the next.
      const subCtx = context.extend();
      subCtx.scope = output;
      subCtx.context = ctorName;

      // Pass 1: the input's own keys, in input order.
      const ownKeys = Object.keys(output);
      let matched = 0;
      for (let i = 0; i < ownKeys.length; i++) {
        const inputKey = ownKeys[i];
        const key = caseInSensitive ? inputKey.toLowerCase() : inputKey;
        let v = output[inputKey];
        const entry = properties.get(key);
        if (entry || additionalRule) {
          if (processed) {
            if (processed[key]) continue;
            processed[key] = true;
          }
          if (entry) matched++;
          if (v === undefined && entry?.optionalNested) continue;
          v = runProperty(
            subCtx,
            locationPrefix,
            parentLabel,
            entry,
            additionalRule,
            key,
            v,
          );
        } else if (v !== undefined) {
          if (!additionalFields) continue;
          if (additionalFields === 'error') {
            context.fail(
              _this,
              `${ctorName || 'Object'} has no field '${inputKey}' and does not accept additional fields`,
              v,
            );
          }
        }
        if (v !== undefined) out[entry ? entry.as : key] = v;
      }

      // Pass 2: schema keys the input does not have as own keys. Their rule
      // still runs (required(), default values, ...), except for optional()
      // rules, which pass an undefined value through untouched. The value is
      // still read, so one coming from the prototype chain is validated.
      // Skipped when the first pass already met every schema key.
      for (
        let i = 0;
        matched < schemaEntries.length && i < schemaEntries.length;
        i++
      ) {
        const entry = schemaEntries[i];
        let v = output[entry.inputKey];
        if (v === undefined && entry.optionalNested) continue;
        if (processed) {
          if (processed[entry.key]) continue;
          processed[entry.key] = true;
        } else if (Object.prototype.hasOwnProperty.call(output, entry.inputKey))
          continue;
        v = runProperty(
          subCtx,
          locationPrefix,
          parentLabel,
          entry,
          undefined,
          entry.key,
          v,
        );
        if (v !== undefined) out[entry.as] = v;
      }

      if (ctor && ctor[postValidation]) {
        ctor[postValidation](out, context, _this);
        return out;
      }

      return out;
    },
    options,
  ) as unknown as isObject.Validator<T, I>;

  _rule.schema = schema;
  return _rule;
}

/**
 * Validates one property with its rule (or the `additionalFields` rule),
 * pointing the shared `subCtx` at that property first.
 */
function runProperty(
  subCtx: Context,
  locationPrefix: string,
  parentLabel: string | undefined,
  entry: PropertyEntry | undefined,
  additionalRule: Validator_ | undefined,
  key: string,
  v: any,
): any {
  const rule = entry ? entry.rule : additionalRule!;
  subCtx.location = locationPrefix + key;
  subCtx.property = key;
  // A property without its own label keeps the parent's label.
  subCtx.label = (entry && entry.label) || parentLabel;
  const nested = entry && entry.optionalNested;
  // optional() built without options only forwards a defined value to its
  // nested rule with the same context, so do that directly.
  if (nested && !hasOptions(rule[kOptions])) {
    return nested(v, undefined, subCtx);
  }
  return rule(v, undefined, subCtx);
}

interface PropertyEntry {
  /** The key as written in the schema. */
  inputKey: string;
  /** The key used for matching and in `location` (lower-cased when `caseInSensitive`). */
  key: string;
  /** The output key. */
  as: string;
  label?: string;
  rule: Validator_;
  /** Set when `rule` is an `optional()` rule: the rule it wraps. */
  optionalNested?: Validator_;
}

export namespace isObject {
  export interface Validator<
    T extends object = object,
    I = object,
  > extends Validator_<T, I> {
    schema: Schema;
  }

  export type PropertyOptions = { label?: string; as?: string };
  export type Schema = Record<
    string | number,
    Validator_ | [Validator_, PropertyOptions]
  >;

  export interface Options<T> extends ValidationOptions {
    /** Used as the error `context` label for this object (e.g. a class name). @defaultValue `ctor?.name` */
    name?: string;
    /** Sets the prototype of the output object to `ctor.prototype` (`instanceof ctor` becomes `true`); may also define static `[preValidation]`/`[postValidation]` hooks invoked before/after this rule's own logic. */
    ctor?: Type<T>;
    /** Controls properties not declared in `schema`: `true` passes them through unchanged, `false` silently drops them, a `Validator` applies that rule to each of them, and `'error'` throws when any are present. @defaultValue `true` if `schema` is omitted entirely; otherwise `false` */
    additionalFields?: boolean | Validator_ | 'error';
    /** Matches input property names to schema keys case-insensitively; on a case-insensitive duplicate (e.g. both `name` and `Name` present), only the first-encountered key is used. @defaultValue false */
    caseInSensitive?: boolean;
    /** Tracks input objects already being converted (per root validation call) and returns the same (in-progress) output object instead of recursing infinitely when a cycle is found. @defaultValue false */
    detectCircular?: boolean;
  }
}
