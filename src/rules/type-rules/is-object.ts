import type { RequiredSome } from 'ts-gems';
import { postValidation, preValidation } from '../../constants.js';
import {
  type Context,
  isValidator,
  type Nullish,
  type Type,
  type ValidationOptions,
  type Validator as Validator_,
  validator,
} from '../../core/index.js';

/**
 * Validates the object according to schema
 * Converts properties according to schema rules if the coerce option is set to 'true'.
 * @validator isObject
 */
export function isObject<T extends object = object, I = object | string>(
  schema?: isObject.Schema,
  options?: isObject.Options<T>,
): isObject.Validator<T, I> {
  const ctor = options?.ctor;
  const ctorName = options?.name || ctor?.name;
  const additionalFields = options?.additionalFields ?? !schema;
  const caseInSensitive = !!options?.caseInSensitive;
  const detectCircular = !!options?.detectCircular;
  const propertyRules: Record<any, Validator_> = {};
  const propertyOptions: Record<
    any,
    RequiredSome<isObject.PropertyOptions, 'as'>
  > = {};
  schema = schema || {};
  const schemaKeys = Object.keys(schema);
  for (const k of schemaKeys) {
    const n = schema[k];
    const key = caseInSensitive ? k.toLowerCase() : k;
    if (Array.isArray(n)) {
      if (!isValidator(n[0])) {
        throw new TypeError(
          `Invalid tuple definition in validation schema (${k})`,
        );
      }
      propertyRules[key] = n[0];
      propertyOptions[key] = { as: k, ...n[1] };
    } else if (isValidator(n)) {
      propertyRules[key] = n;
      propertyOptions[key] = { as: k };
    } else {
      throw new TypeError(`Invalid definition in validation schema (${k})`);
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

      const keys = Array.from(new Set([...Object.keys(output), ...schemaKeys]));
      const l = keys.length;
      let i: number;
      let inputKey: string;
      let schemaKey: string;
      let v: any;
      let _propRule: Validator_ | undefined;

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
      const processedSchemaKeys: Record<string, boolean> = {};
      // Reused across every property instead of allocated per-property.
      // `scope`/`context` never change between properties, so they're set
      // once; `location`/`property` are reassigned every iteration, and
      // `label` is reassigned-or-deleted every iteration (see below) so no
      // field can leak from a previous property into the next one.
      const subCtx = context.extend();
      subCtx.scope = output;
      subCtx.context = ctorName;
      // Iterate object keys and perform rules
      for (i = 0; i < l; i++) {
        inputKey = keys[i];
        schemaKey = caseInSensitive ? inputKey.toLowerCase() : inputKey;
        v = output[inputKey];

        _propRule =
          propertyRules[schemaKey] ||
          (isValidator(additionalFields) ? additionalFields : undefined);
        if (_propRule) {
          if (processedSchemaKeys[schemaKey]) continue;
          processedSchemaKeys[schemaKey] = true;
          subCtx.location = location + (location ? '.' : '') + schemaKey;
          subCtx.property = schemaKey;
          const propLabel = propertyOptions[schemaKey]?.label;
          // Assign (not just skip) when there's no per-property label, so a
          // label left over from a previous property can't leak in - but
          // `delete` rather than `= undefined`, so the lookup still falls
          // through to an inherited label from the parent context, exactly
          // like the original per-iteration `context.extend()` did.
          if (propLabel) subCtx.label = propLabel;
          else delete subCtx.label;
          v = _propRule(v, undefined, subCtx);
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

        if (v !== undefined) {
          out[propertyOptions[schemaKey]?.as || schemaKey] = v;
        }
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
    name?: string;
    ctor?: Type<T>;
    additionalFields?: boolean | Validator_ | 'error';
    caseInSensitive?: boolean;
    detectCircular?: boolean;
  }
}
