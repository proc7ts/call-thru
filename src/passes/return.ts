/**
 * @packageDocumentation
 * @module call-thru
 */
import { nextCall } from '../next-call';
import { NextSkip } from './skip';

/**
 * Constructs a next call that skips the rest of the chain and returns the given value as call chain result.
 *
 * Not every call chain returns a result. In that case a [[nextSkip]] is better choice.
 *
 * @param result  Call chain result.
 *
 * @returns Next call skipping the rest of the passes.
 */
export function nextReturn<Result>(result: Result): NextSkip<Result> {
  return nextCall(chain => chain.skip(result));
}
