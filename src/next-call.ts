/**
 * A call of the next function in chain.
 *
 * This is basically a function with additional method, which is treated specially by call chaining functions.
 * When previous function in chain returns a `NextCall` instance, it will be used to call the next function in chain.
 * Otherwise the next function will be called with single argument containing a value returned.
 *
 * A `NextCall` is a function returning itself. So it can be chained like any other function.
 *
 * A `nextCall()` function can be used to construct a next call.
 *
 * @param <NextThis> A type of `this` context object reference of the next function.
 * @param <NextArgs> A type of argument tuple of the next function.
 * @param <NextReturn> A return type of the next function.
 * @param <Out> A type of the call outcome.
 */
export interface NextCall<NextThis, NextArgs extends any[], NextReturn, Out = NextReturn> {

  /**
   * Returns itself to add it to functions chain.
   */
  (): NextCall<NextThis, NextArgs, NextReturn, Out>;

  /**
   * Calls the `callee` function.
   *
   * @param callee A function to call.
   */
  [NextCall.call](this: void, callee: (this: NextThis, ...args: NextArgs) => NextReturn): Out;

}

export namespace NextCall {

  /**
   * Any call of the next function.
   */
  export type Any = NextCall<any, any[], any, any>;

  export namespace Callee {

    /**
     * A `this` argument type of a callee. Either extracted from `NextCall`, or `void`.
     */
    export type This<V> = V extends NextCall<infer NextThis, any[], any, any> ? NextThis : void;

    /**
     * Arguments tuple type of a callee. Either extracted from `NextCall`, or consisting of single argument of type `V`.
     */
    export type Args<V> = V extends NextCall<any, infer NextArgs, any, any> ? NextArgs : [V];

    /**
     * A return type of a callee. Either extracted from `NextCall`, or `V` itself.
     */
    export type Return<V> = V extends NextCall<any, any[], infer NextReturn, any> ? NextReturn : V;

  }

  /**
   * A type of next call outcome. Either extracted from `NextCall`, or `Else`.
   */
  export type Outcome<V, Else> = V extends NextCall<any, any[], any, infer Out> ? Out : Else;

  /**
   * A type of last call outcome. Either extracted from `NextCall`, or the value itself.
   *
   * A next call instance returned from the last function in chain is expected to accept a callee with single parameter.
   */
  export type LastOutcome<V> =
      V extends Any
          ? (V extends NextCall<any, [infer FirstArg], any, any> ? FirstArg : never)
          : V;

  /**
   * A symbol of a `NextCall` method responsible for calling the next function in chain.
   *
   * A function should contain a property with this key to be considered a next function call.
   */
  export const call = Symbol('call-next');

  /**
   * Checks whether the given function is a next function call.
   *
   * @param target A function to check.
   *
   * @return `true` if the `target` function has a `[NextCall.mark]` property, or `false` otherwise.
   */
  export function is<NextThis, NextArgs extends any[], NextReturn, Out = NextReturn>(
      target: NextCall<NextThis, NextArgs, NextReturn, Out>):
      target is NextCall<NextThis, NextArgs, NextReturn, Out>;

  /**
   * Detects whether the given value is a next function call.
   *
   * @param target A value to check.
   *
   * @return `true` if the `target` value is a function with a `[NextCall.mark]` property, or `false` otherwise.
   */
  export function is(target: any): target is NextCall<any, any, any, any>;

  export function is(target: any): target is NextCall<any, any, any, any> {
    return typeof target === 'function' && call in target;
  }

  /**
   * Converts a value returned from previous chained function call to the call of the next function in chain.
   *
   * @param nextCall A next function call to return.
   *
   * @returns A `nextCall` itself.
   */
  export function of<V extends Any>(nextCall: V): V;

  /**
   * Converts a value returned from previous chained function call to the call of the next function in chain.
   *
   * @param value A value to convert.
   *
   * @returns Either a `value` itself if it is a next function call, or a new next function call instance that passes
   * a `value` as the only argument to the callee.
   */
  export function of<V, Out>(value: V): NextCall<void, [V], Out, Out>;

  export function of<V, Out>(value: V): NextCall<Callee.This<V>, Callee.Args<V>, Callee.Return<V>, Outcome<V, Out>> {
    if (is(value)) {
      return value;
    }
    return nextCall(function (this: void, callee) {
      return callee.call(null, value);
    });
  }

}

/**
 * Constructs a call to the next function.
 *
 * @param callNext A next function caller function to convert to next call.
 *
 * @returns A next function call performed by the given `callNext` function.
 */
export function nextCall<NextThis, NextArgs extends any[], NextReturn, Out = NextReturn>(
    callNext: (this: void, callee: (this: NextThis, ...args: NextArgs) => NextReturn) => Out):
    NextCall<NextThis, NextArgs, NextReturn, Out> {

  const result = (() => result) as NextCall<NextThis, NextArgs, NextReturn, Out>;

  result[NextCall.call] = callee => callNext(callee);

  return result;
}
