/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { CallChain } from './call-chain';

/**
 * A key of a {@link NextCall} method responsible for calling the next pass in chain.
 */
export const NextCall__symbol = (/*#__PURE__*/ Symbol('next-call'));

/**
 * A call of the next pass in chain.
 *
 * This is basically a function with additional method, which is treated specially by call chaining functions.
 * When previous pass in chain returns a {@link NextCall} instance, it will be used to call the next pass in chain.
 * Otherwise the next pass will be called with value returned as its {@link CallChain.pass single argument}.
 *
 * A {@link NextCall} is a function returning itself. So it can be chained like any other pass.
 *
 * A {@link nextCall} function can be used to construct a next call.
 *
 * @typeParam TChain - A type of supported call chain.
 * @typeParam TNextArgs - A type of arguments tuple of the next pass.
 * @typeParam TNextArg - A type of single argument or arguments tuple of the next pass.
 * The same as `TNextArgs` by default.
 */
export interface NextCall<TChain extends CallChain, TNextArgs extends any[], TNextArg = TNextArgs> {

  readonly $?: TNextArg; // Silence the TypeScript compiler, as `NextArg` is never read.

  /**
   * Calls the given pass of the call chain.
   *
   * @param chain - Target call chain.
   * @param pass - A pass in call chain to call.
   */
  [NextCall__symbol](
      chain: TChain,
      pass: (this: void, ...args: TNextArgs) => void,
  ): void;

  /**
   * Returns itself.
   *
   * Makes this call a valid no-arg pass of a call chain.
   */
  (): this;

}

/**
 * Constructs a call of the next pass in chain.
 *
 * @typeParam TChain - A type of supported call chain.
 * @typeParam TNextArgs - A type of argument tuple of the next pass.
 * @typeParam TNextArg - A type of single argument or arguments tuple of the next pass.
 * The same as `TNextArgs` by default.
 * @param callNext - A next pass caller function.
 *
 * @returns Next pass call performed by the given function.
 */
export function nextCall<TChain extends CallChain, TNextArgs extends any[], TNextArg>(
    callNext: (
        this: void,
        chain: TChain,
        fn: (this: void, ...args: TNextArgs) => void,
    ) => void,
): NextCall<TChain, TNextArgs, TNextArg> {

  const result = (() => result) as NextCall<TChain, TNextArgs, TNextArg>;

  result[NextCall__symbol] = (chain, fn) => callNext(chain, fn);

  return result;
}

/**
 * Checks whether the `target` value is a {@link NextCall next call}.
 *
 * @typeParam TChain - A type of supported call chain.
 * @typeParam TNextArgs - A type of arguments tuple of the next pass.
 * @typeParam TNextArg - A type of single argument or arguments tuple of the next pass.
 * @param target - A value to check.
 *
 * @returns `true` if the `target` value is a function with {@link NextCall__symbol} property, or `false` otherwise.
 */
export function isNextCall<TChain extends CallChain, TNextArgs extends any[], TNextArg>(
    target: unknown,
): target is NextCall<TChain, TNextArgs, TNextArg> {
  return typeof target === 'function' && NextCall__symbol in target;
}
