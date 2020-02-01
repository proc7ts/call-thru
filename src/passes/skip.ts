/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from '../call-chain';
import { noop } from '../misc';
import { nextCall, NextCall } from '../next-call';

/**
 * Constructs a next call that skips the rest of the chain.
 *
 * This has the same effect as `nextReturn(undefined)`.
 */
export const nextSkip: NextCall<CallChain, any, [undefined], undefined> = nextCall(noop);
