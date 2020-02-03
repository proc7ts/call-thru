/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from './call-chain';

/**
 * A key of a [[NextCall]] method responsible for calling the next pass in chain.
 */
export const NextCall__symbol = (/*#__PURE__*/ Symbol('next-call'));

/**
 * A call of the next pass in chain.
 *
 * This is basically a function with additional method, which is treated specially by call chaining functions.
 * When previous pass in chain returns a [[NextCall]] instance, it will be used to call the next pass in chain.
 * Otherwise the next pass will be called with value returned as its {@link CallChain.pass single argument}.
 *
 * A [[NextCall]] is a function returning itself. So it can be chained like any other pass.
 *
 * A [[nextCall]] function can be used to construct a next call.
 *
 * @typeparam Chain  A type of supported call chain.
 * @typeparam NextArgs  A type of arguments tuple of the next pass.
 * @typeparam NextArg  A type of single argument or arguments tuple of the next pass. The same as `NextArgs` by default.
 */
export interface NextCall<Chain extends CallChain, NextArgs extends any[], NextArg = NextArgs> {

  readonly $?: NextArg;

  /**
   * Calls the given pass of the call chain.
   *
   * @param chain  Target call chain.
   * @param pass  A pass in call chain to call.
   */
  [NextCall__symbol](
      chain: Chain,
      pass: (this: void, ...args: NextArgs) => void,
  ): void;

  /**
   * Returns itself to use it as a pass of a call chain.
   */
  (): this; // eslint-disable-line @typescript-eslint/prefer-function-type

}

/**
 * Constructs a call of the next pass in chain.
 *
 * @typeparam Chain  A type of supported call chain.
 * @typeparam NextArgs  A type of argument tuple of the next pass.
 * @typeparam NextArg  A type of single argument or arguments tuple of the next pass. The same as `NextArgs` by default.
 * @param callNext  A next pass caller function.
 *
 * @returns Next pass call performed by the given function.
 */
export function nextCall<Chain extends CallChain, NextArgs extends any[], NextArg>(
    callNext: (
        this: void,
        chain: Chain,
        fn: (this: void, ...args: NextArgs) => void,
    ) => void,
): NextCall<Chain, NextArgs, NextArg> {

  const result = (() => result) as NextCall<Chain, NextArgs, NextArg>;

  result[NextCall__symbol] = (chain, fn) => callNext(chain, fn);

  return result;
}

/**
 * Checks whether the `target` value is a {@link NextCall next call}.
 *
 * @typeparam Chain  A type of supported call chain.
 * @typeparam NextArgs  A type of arguments tuple of the next pass.
 * @typeparam NextArg  A type of single argument or arguments tuple of the next pass.
 * @param target  A value to check.
 *
 * @returns `true` if the `target` value is a function with [[NextCall__symbol]] property, or `false` otherwise.
 */
export function isNextCall<Chain extends CallChain, NextArgs extends any[], NextArg>(
    target: any,
): target is NextCall<Chain, NextArgs, NextArg> {
  return typeof target === 'function' && NextCall__symbol in target;
}
