/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * Provides arguments for the next call chain pass.
 *
 * @typeparam NextArgs  A type of arguments tuple for the next pass.
 * @param args  Arguments for the next pass.
 *
 * @return A call of the next pass with the given arguments.
 */
export function nextArgs<NextArgs extends any[]>(
    ...args: NextArgs
): NextCall<CallChain, NextArgs, NextArgs> {
  return nextCall((chain, fn) => chain.call(fn, args));
}
