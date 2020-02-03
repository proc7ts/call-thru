/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * A special [[NextCall]] indicating the rest of the steps are skipped.
 *
 * @typeparam Result  Call chain result type.
 */
export type NextSkip<Result = undefined> = NextCall<CallChain, any, never, Result>;

/**
 * Builds a next call that skips the rest of the chain.
 *
 * This has the same effect as {@link nextReturn `nextReturn(undefined)`}.
 */
export const nextSkip: NextSkip = (/*#__PURE__*/ nextCall(chain => chain.skip()));
