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

/**
 * The validation logic a {@link Validator} is built from - the function
 * passed to {@link validator}.
 *
 * @typeParam T - The output type on success.
 * @typeParam I - The accepted input type.
 * @typeParam R - The `Validator` this function is built into.
 * @param input - The value to validate.
 * @param context - The current {@link Context}: carries execution options
 *   (`coerce`, `label`, ...) and is used to report failures via `context.fail(...)`.
 * @param _this - The `Validator` this function was built into - pass it to
 *   `context.fail()` so a reported issue is attributed to the right rule.
 * @returns The validated (and possibly coerced) value. To reject the input,
 *   call `context.fail(_this, message, input)` instead of throwing directly.
 */
export type ValidateFunction<
  T,
  I = T,
  R extends Validator<T, I> = Validator<T, I>,
> = (input: I, context: Context, _this: R) => Nullish<T>;

/**
 * A callable validation rule, as produced by {@link validator}. Every rule in
 * this library - and any custom rule built with `validator()` - has this shape.
 *
 * @typeParam T - The validated output type.
 * @typeParam I - The accepted input type.
 * @typeParam O - The shape of the per-call options this validator accepts.
 *
 * @example
 * ```ts
 * import { isEmail } from 'valgen';
 *
 * isEmail('a@b.com'); // => 'a@b.com'
 * isEmail('invalid'); // throws ValidationError
 * isEmail.silent('invalid'); // => { errors: [...] }
 * ```
 */
export interface Validator<
  T = any,
  I = any,
  O extends ExecutionOptions = ExecutionOptions,
> {
  /**
   * Validates `input`, returning the (possibly coerced) value on success.
   *
   * @param input - The value to validate.
   * @param options - Per-call execution options (`coerce`, `label`, ...).
   * @param context - An existing {@link Context} to nest this call under
   *   another validator's run. When calling a validator *from inside another
   *   rule*, pass the shared context here (3rd argument) and `undefined` for
   *   `options`, so the wrapper can skip an unneeded `context.extend()`.
   * @returns The validated (and possibly coerced) value.
   * @throws {@link ValidationError} if validation fails at the root call
   *   (i.e. `context` was not passed in, meaning this is the outermost call).
   */
  (input: I, options?: O, context?: Context): T;

  /**
   * Like calling the validator directly, but never throws.
   *
   * @returns `{ value }` on success, or `{ errors }` (the recorded {@link ErrorIssue}s) on failure.
   */
  silent(
    input: I,
    options?: O,
    context?: Context,
  ): { value?: T; errors?: ErrorIssue[] };

  /** This rule's identifier (e.g. `"isEmail"`), used to attribute reported issues to it. */
  id: string;
  args?: Record<string, any>;
  [kValidatorFn]: ValidateFunction<T, I>;
}

let unnamedValidatorIndex = 0;

/**
 * Builds a {@link Validator} from a validation function.
 *
 * This is the single factory every rule in this library - and any custom
 * rule you write - is built with. See {@link ValidateFunction} for the shape
 * expected of `fn`.
 *
 * @param fn - The validation logic: receives `(input, context, self)` and
 *   should return the validated value, or call `context.fail(self, message, input)`
 *   to record a failure. The rule's id defaults to `fn.name`.
 * @param validatorOptions - Default options for this rule (e.g. `coerce`,
 *   `onFail`), applied to every call unless overridden per-call.
 * @returns A callable {@link Validator}.
 *
 * @example
 * ```ts
 * import { validator, type Context, type Nullish, type ValidationOptions } from 'valgen';
 *
 * function isEven(options?: isEven.Options) {
 *   return validator<number, unknown>(
 *     isEven.name,
 *     (input, context, self): Nullish<number> => {
 *       const n = Number(input);
 *       if (Number.isInteger(n) && n % 2 === 0) return n;
 *       context.fail(self, 'Value must be an even number', input);
 *     },
 *     options,
 *   );
 * }
 * namespace isEven {
 *   export interface Options extends ValidationOptions {}
 * }
 * ```
 */
export function validator<
  T,
  I = T,
  O extends ExecutionOptions = ExecutionOptions,
>(
  fn: ValidateFunction<T, I>,
  validatorOptions?: ValidationOptions,
): Validator<T, I, O>;
/**
 * Builds a {@link Validator} from a validation function, with an explicit id.
 *
 * @param id - The rule's identifier, used for `Validator.id` and (unless `fn`
 *   is itself named) as the built function's name.
 * @param fn - The validation logic - see the other overload for details.
 * @param validatorOptions - Default options for this rule.
 * @returns A callable {@link Validator}.
 */
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

/**
 * Checks whether `x` is a {@link Validator} built with {@link validator}.
 *
 * @param x - The value to check.
 * @returns `true` if `x` is a validator, narrowing its type accordingly.
 */
export function isValidator(x: any): x is Validator {
  return !!(typeof x === 'function' && x.id && x[kValidatorFn]);
}
