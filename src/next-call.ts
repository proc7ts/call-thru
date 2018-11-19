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
 * @param <Out> A type of the next function call outcome.
 * @param <Last> A type of the outcome of the next call returned from the last pass in chain.
 */
export interface NextCall<
    OutKind extends CallOutcome.Kind,
    NextArgs extends any[],
    NextReturn,
    Out = NextReturn,
    Last = CallOutcome.OfKind<OutKind, NextArgs[0], Out>> {

  /**
   * Returns itself to add it to functions chain.
   */
  (): NextCall<OutKind, NextArgs, NextReturn, Out, Last>;

  /**
   * Calls the next function in chain.
   *
   * This is invoked only when there _is_ a next function. When next call is returned by the last pass a
   * `[NextCall.last]()` is invoked instead.
   *
   * @param callee A function to call.
   *
   * @returns A call outcome.
   */
  [NextCall.next](callee: (this: void, ...args: NextArgs) => NextReturn): Out;

  /**
   * Builds an outcome of the last pass in chain.
   *
   * This is invoked for the last pass in chain only. If there is a next pass a `[NextCall.next]()` is invoked instead.
   */
  [NextCall.last](): Last;

}

export namespace NextCall {

  /**
   * Any call of the next function.
   */
  export type Any = NextCall<any, any, any, any, any>;

  export namespace Callee {

    /**
     * Arguments tuple type of a callee. Either extracted from `NextCall`, or consisting of single argument of type `V`.
     */
    export type Args<V> = V extends NextCall<any, infer NextArgs, any, any, any> ? NextArgs : [V];

    /**
     * A return type of a callee. Either extracted from `NextCall`, or `V` itself.
     */
    export type Return<V> = V extends NextCall<any, any, infer NextReturn, any, any> ? NextReturn : V;

  }

  /**
   * A type of next call outcome. Either extracted from `NextCall`, or `Return`.
   */
  export type Outcome<V, Return> = V extends NextCall<infer OutKind, any, any, infer Out, any>
      ? CallOutcome.OfKind<OutKind, Return, Out>
      : Return;

  /**
   * A type of last call outcome. Either extracted from the last call, or the value itself.
   */
  export type LastOutcome<V> = V extends NextCall<any, any, any, any, infer Last> ? Last : V;

  /**
   * A key of a `NextCall` method responsible for calling the next function in chain.
   */
  export const next = Symbol('call-next');

  /**
   * A key of a `NextCall` method responsible for returning the outcome of the las pass in chain.
   */
  export const last = Symbol('last-outcome');

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
    return typeof target === 'function' && next in target;
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
  export function of<V, Out>(value: V): NextCall<'default', [V], Out, Out, Out>;

  export function of<V, Out, Last>(value: V): NextCall<any, Callee.Args<V>, Callee.Return<V>, Out, Last> {
    if (is(value)) {
      return value;
    }
    return nextCall(function (this: void, callee) {
      return callee.call(null, value);
    });
  }

}

const firstArg: (...args: any[]) => any = (arg: any) => arg;

/**
 * Constructs a call to the next function.
 *
 * @param callNext A next function caller function.
 * @param lastOutcome A function building an outcome of the last pass in chain.
 *
 * @returns A next function call performed by the given `callNext` function.
 */
export function nextCall<OutKind extends CallOutcome.Kind, NextArgs extends any[], NextReturn, Out, Last>(
    callNext: (this: void, callee: (this: void, ...args: NextArgs) => NextReturn) => Out,
    lastOutcome: (this: void) => Last):
    NextCall<OutKind, NextArgs, NextReturn, Out, Last>;

/**
 * Constructs a call to the next function with default last pass outcome implementation.
 *
 * The last pass outcome is detected by passing to `callNext` a function that just returns its first argument.
 *
 * @param callNext A next function caller function.
 *
 * @returns A next function call performed by the given `callNext` function.
 */
export function nextCall<OutKind extends CallOutcome.Kind, NextArgs extends any[], NextReturn, Out>(
    callNext: (this: void, callee: (this: void, ...args: NextArgs) => NextReturn) => Out):
    NextCall<OutKind, NextArgs, NextReturn, Out>;

export function nextCall<OutKind extends CallOutcome.Kind, NextArgs extends any[], NextReturn, Out, Last>(
    callNext: (this: void, callee: (this: void, ...args: NextArgs) => NextReturn) => Out,
    lastOutcome: (this: void) => Last = () => callNext(firstArg) as any):
    NextCall<OutKind, NextArgs, NextReturn, Out, Last> {

  const result = (() => result) as NextCall<OutKind, NextArgs, NextReturn, Out, Last>;

  result[NextCall.next] = callee => callNext(callee);
  result[NextCall.last] = lastOutcome;

  return result;
}
