/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * Provides a single argument for the next call chain pass.
 *
 * The returned {@link NextCall} implementation does the same as if the `arg` returned from the call chain pass.
 *
 * @typeParam TNextArg  A type of argument for the next pass.
 * @param arg  Argument for the next pass.
 *
 * @return A call of the next pass with the given argument.
 */
export function nextArg<TNextArg>(arg: TNextArg): NextCall<CallChain, [TNextArg], TNextArg> {
  return nextCall((chain, pass) => chain.pass(pass, arg));
}
