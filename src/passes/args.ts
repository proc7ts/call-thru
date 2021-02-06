import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * Provides arguments for the next call chain pass.
 *
 * @typeParam TNextArgs - A type of arguments tuple for the next pass.
 * @param args - Arguments for the next pass.
 *
 * @return A call of the next pass with the given arguments.
 */
export function nextArgs<TNextArgs extends any[]>(
    ...args: TNextArgs
): NextCall<CallChain, TNextArgs, TNextArgs> {
  return nextCall((chain, fn) => chain.call(fn, args));
}
