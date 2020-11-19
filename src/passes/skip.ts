/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * A special {@link NextCall} indicating the rest of the steps are skipped.
 *
 * @typeParam TResult  Call chain result type.
 */
export type NextSkip<TResult = undefined> = NextCall<CallChain, never, TResult>;

/**
 * Builds a next call that skips the rest of the chain.
 *
 * This has the same effect as {@link nextReturn `nextReturn(undefined)`}.
 */
export const nextSkip: NextSkip = (/*#__PURE__*/ nextCall(chain => chain.skip()));
