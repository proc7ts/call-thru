/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { nextCall } from '../next-call';
import { NextSkip } from './skip';

/**
 * Builds a next call that skips the rest of the chain and returns the given value as call chain result.
 *
 * Not every call chain returns a result. In that case the {@link nextSkip} is a better choice.
 *
 * @typeParam TResult  Call chain result type.
 * @param result  Call chain result.
 *
 * @returns Next call skipping the rest of the passes.
 */
export function nextReturn<TResult>(result: TResult): NextSkip<TResult> {
  return nextCall(chain => chain.skip(result));
}
