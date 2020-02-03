/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from '../call-chain';
import { noop } from '../misc';
import { nextCall, NextCall } from '../next-call';

export type NextSkip<Result = undefined> = NextCall<CallChain, any, never, Result>;

/**
 * Constructs a next call that skips the rest of the chain.
 *
 * This has the same effect as `nextReturn(undefined)`.
 */
export const nextSkip: NextSkip = nextCall(noop);
