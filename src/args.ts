import { Caller } from './caller';

/**
 * Arguments to function call.
 *
 * This is `Caller` implementation that passes its arguments to the callee.
 *
 * An `Args.of()` and `Args.withThis()` functions can be used to construct `Args` instance.
 *
 * @param <This> A type of `this` argument passed to the function.
 * @param <Args> A type of arguments tuple.
 */
export type Args<This, Arguments extends any[], Return> = Caller<This, Arguments, Return>;

export namespace Args {

  /**
   * Constructs a function call arguments.
   *
   * The `this` argument of constructed function is void.
   *
   * @param args Call arguments.
   *
   * @return A new function call arguments instance.
   */
  export function of<Arguments extends any[], Ret>(...args: Arguments): Args<void, Arguments, Ret> {
    return Caller.by(callee => callee(...args));
  }

  /**
   * Constructs a function call arguments with the given `this` argument.
   *
   * @param thisArg `this` argument value.
   * @param args Call arguments.
   *
   * @return A new function call arguments instance.
   */
  export function withThis<This, Arguments extends any[], Ret>(thisArg: This, ...args: Arguments):
      Args<This, Arguments, Ret> {
    return Caller.by(callee => callee.apply(thisArg, args));
  }

}
