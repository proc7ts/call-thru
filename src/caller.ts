/**
 * A caller function type responsible for calling other functions.
 *
 * This is basically a function with a marker property, which is treated specially by call chaining functions.
 * When previous function in chain returns a `Caller` instance, the next one will be called by the returned caller.
 * Otherwise the next function will be called with single argument containing a value returned.
 *
 * A `Caller.by()` can be used to construct a caller function.
 *
 * @param <This> A type of `this` context object reference of the called function.
 * @param <Args> A type of argument tuple of the called function.
 * @param <Return> A return type of the called function.
 * @param <Out> A type of outcome.
 */
export interface Caller<This, Args extends any[], Return, Out = Return> {

  /**
   * Calls the `callee` function.
   *
   * @param callee A function to call.
   *
   * @returns A call result.
   */
  (this: void, callee: (this: This, ...args: Args) => Return): Out;

  /**
   * A marker property to distinguish callers from plain functions.
   *
   * It is required to present, but its value is ignored.
   */
  [Caller.mark]: void;

}

export namespace Caller {

  export namespace Callee {

    /**
     * A `this` argument type of a callee. Either extracted from `Caller`, or `void`.
     */
    export type This<V> = V extends Caller<infer CalleeThis, any[], any, any> ? CalleeThis : void;

    /**
     * Arguments tuple type of a callee. Either extracted from `Caller`, or consisting of single argument of type `V`.
     */
    export type Args<V> = V extends Caller<any, infer CalleeArgs, any, any> ? CalleeArgs : [V];

    /**
     * A return type of a callee. Either extracted from `Caller`, or `V` itself.
     */
    export type Return<V> = V extends Caller<any, any[], infer CalleeRet, any> ? CalleeRet : V;

  }

  /**
   * A type of final call result. Either extracted from `Caller`, or `V` itself.
   */
  export type Outcome<V, Out> = V extends Caller<any, any[], any, infer CallerOut> ? CallerOut : Out;

  /**
   * A marker symbol to distinguish callers from plain functions.
   *
   * A function should contain a property with this key to be considered a caller.
   */
  export const mark = Symbol('caller');

  /**
   * Checks whether the given function is a caller.
   *
   * @param target A function to check.
   *
   * @return `true` if the `target` function has a `[Caller.mark]` property, or `false` otherwise.
   */
  export function is<This, Args extends any[], Ret, Out = Ret>(
      target: (this: void, callee: (this: This, ...args: Args) => Ret) => Out):
      target is Caller<This, Args, Ret, Out>;

  /**
   * Detects whether the given value is a caller.
   *
   * @param target A value to check.
   *
   * @return `true` if the `target` value is a function with a `[Caller.mark]` property, or `false` otherwise.
   */
  export function is(target: any): target is Caller<any, any, any, any>;

  export function is(target: any): target is Caller<any, any, any, any> {
    return typeof target === 'function' && mark in target;
  }

  /**
   * Converts the given function into a caller.
   *
   * @param caller A caller function to convert to caller.
   *
   * @returns A caller that performs the call using provided `caller` function.
   */
  export function by<This, Args extends any[], Ret, Out = Ret>(
      caller: (this: void, callee: (this: This, ...args: Args) => Ret) => Out): Caller<This, Args, Ret, Out> {

    const result = (callee => caller(callee)) as Caller<This, Args, Ret, Out>;

    result[mark] = undefined;

    return result;
  }

  /**
   * Converts a value returned from previous chained function call to a caller for the next function in chain.
   *
   * @param caller A caller to return.
   *
   * @returns A `caller` itself.
   */
  export function of<V extends Caller<any, any[], any, any>>(caller: V): V;

  /**
   * Converts a value returned from previous chained function call to a caller for the next function in chain.
   *
   * @param value A value to convert.
   *
   * @returns Either a `value` itself if it is a caller, or a new caller, that passes a `value` as the only argument
   * to the callee.
   */
  export function of<V, Out>(value: V): Caller<void, [V], Out>;

  export function of<V, Out>(value: V): Caller<Callee.This<V>, Callee.Args<V>, Callee.Return<V>, Outcome<V, Out>> {
    if (is(value)) {
      return value;
    }
    return by(function (this: void, callee) {
      return callee.call(null, value);
    });
  }

}
