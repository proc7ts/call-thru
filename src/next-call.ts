import { CallOutcome } from './call-outcome';

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
 * @param <OutKind> A kind of the call outcome.
 * @param <NextThis> A type of `this` context object reference of the next function.
 * @param <NextArgs> A type of argument tuple of the next function.
 * @param <NextReturn> A return type of the next function.
 * @param <Out> A next function call outcome.
 */
export interface NextCall<
    OutKind extends CallOutcome.Kind,
    NextArgs extends any[],
    NextReturn,
    Out = NextReturn> {

  /**
   * Returns itself to add it to functions chain.
   */
  (): NextCall<OutKind, NextArgs, NextReturn, Out>;

  /**
   * Calls the `callee` function.
   *
   * @param callee A function to call.
   */
  [NextCall.call](
      this: void,
      callee: (this: void, ...args: NextArgs) => NextReturn): Out;

}

export namespace NextCall {

  /**
   * Any call of the next function.
   */
  export type Any = NextCall<any, any, any, any>;

  export namespace Callee {

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
   * A type of next call outcome. Either extracted from `NextCall`, or `Return`.
   */
  export type Outcome<V, Return> = V extends NextCall<infer OutKind, any[], any, infer Out>
      ? CallOutcome.OfKind<OutKind, Return, Out>
      : Return;

  /**
   * A type of last call outcome. Either extracted from the last call, or the value itself.
   *
   * It is expected the the last call accepts a callee with single argument. This callee returns its argument as is.
   */
  export type LastOutcome<V> =
      V extends NextCall<infer OutKind, any[], any, infer Out>
          ? CallOutcome.OfKind<OutKind, Callee.Args<V>[0], Out>
          : V;

  /**
   * A symbol of a `NextCall` method responsible for calling the next function in chain.
   *
   * A function should contain a property with this key to be considered a next function call.
   */
  export const call = Symbol('call-next');

  /**
   * Checks whether the `target` value is a next function call.
   *
   * @param target A value to check.
   *
   * @returns `true`.
   */
  export function is<V extends Any>(target: V): target is V;

  /**
   * Detects whether the `target` value is a next function call.
   *
   * @param target A value to check.
   *
   * @returns `true` if the `target` value is a function with a `[NextCall.mark]` property, or `false` otherwise.
   */
  export function is(target: any): target is Any;

  export function is(target: any): target is Any {
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
  export function of<V, Out>(value: V): NextCall<'default', [V], Out, Out>;

  export function of<V, Out>(value: V): NextCall<any, Callee.Args<V>, Callee.Return<V>, any> {
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
export function nextCall<OutKind extends CallOutcome.Kind, NextArgs extends any[], NextReturn, Out>(
    callNext: (
        this: void,
        callee: (this: void, ...args: NextArgs) => NextReturn) => Out):
    NextCall<OutKind, NextArgs, NextReturn, Out> {

  const result = (() => result) as NextCall<OutKind, NextArgs, NextReturn, Out>;

  result[NextCall.call] = callee => callNext(callee);

  return result;
}
