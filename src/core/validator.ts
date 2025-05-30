import type { Nullish } from 'ts-gems';
import { camelCase } from '../helpers/string.utils.js';
import { kOptions, kValidatorFn } from './constants.js';
import { Context } from './context.js';
import type {
  ErrorIssue,
  ExecutionOptions,
  ValidationOptions,
} from './types.js';
import { ValidationError } from './validation-error.js';

export type ValidateFunction<
  T,
  I = T,
  R extends Validator<T, I> = Validator<T, I>,
> = (input: I, context: Context, _this: R) => Nullish<T>;

export interface Validator<
  T = any,
  I = any,
  O extends ExecutionOptions = ExecutionOptions,
> {
  (input: I, options?: O, context?: Context): T;

  silent(
    input: I,
    options?: O,
    context?: Context,
  ): { value?: T; errors?: ErrorIssue[] };

  id: string;
  args?: Record<string, any>;
  [kValidatorFn]: ValidateFunction<T, I>;
}

let unnamedValidatorIndex = 0;

export function validator<
  T,
  I = T,
  O extends ExecutionOptions = ExecutionOptions,
>(
  fn: ValidateFunction<T, I>,
  validatorOptions?: ValidationOptions,
): Validator<T, I, O>;
export function validator<
  T,
  I = T,
  O extends ExecutionOptions = ExecutionOptions,
>(
  id: string,
  fn: ValidateFunction<T, I>,
  validatorOptions?: ValidationOptions,
): Validator<T, I, O>;
export function validator(arg0: any, arg1?: any, arg2?: any) {
  let id = '';
  let fn: ValidateFunction<any>;
  let validatorOptions: ValidationOptions | undefined;
  if (typeof arg0 === 'string') {
    id = arg0;
    fn = arg1;
    validatorOptions = arg2;
  } else {
    fn = arg0;
    validatorOptions = arg1;
  }
  if (typeof fn !== 'function') {
    throw new TypeError('You must provide a rule function argument');
  }
  id = id || fn.name || 'validator' + ++unnamedValidatorIndex;
  const name = fn.name || camelCase(id);

  const _rule = {
    [name](
      input: unknown,
      options?: ExecutionOptions | Context,
      context?: Context,
    ): any {
      if (context) {
        if (options || validatorOptions)
          context = context.extend({ ...validatorOptions, ...options });
      } else {
        context =
          options instanceof Context
            ? options.extend({ ...validatorOptions })
            : new Context({ ...validatorOptions, ...options });
      }

      let value: any;
      try {
        value = fn(input, context, _rule as any);
      } catch (e: any) {
        if (e instanceof ValidationError) throw e;
        context.fail(_rule, e, input);
      }
      if (context.isRoot && context.errors.length) {
        throw new ValidationError(context.errors);
      }
      return value;
    },
  }[name] as Validator;

  _rule.id = id;
  _rule[kValidatorFn] = fn;
  _rule[kOptions] = validatorOptions || {};

  _rule.silent = (
    input: any,
    options?: ExecutionOptions,
    context?: Context,
  ) => {
    try {
      const value = _rule(input, options, context);
      return { value };
    } catch (e) {
      return { errors: (e as ValidationError).issues };
    }
  };

  return _rule;
}

export function isValidator(x: any): x is Validator {
  return !!(typeof x === 'function' && x.id && x[kValidatorFn]);
}
