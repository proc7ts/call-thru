/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from '../call-chain';
import { nextCall, NextCall } from '../next-call';

/**
 * Builds a next chained call that passes each provided element to the next pass.
 *
 * Note that default [[CallChain]] supported by [[callThru]] would return only the last element.
 *
 * @typeparam T  A type of element to pass down the chain.
 * @param elements  An iterable of elements to pass down the chain.
 *
 * @returns A multi-call of the next pass with each element.
 */
export function nextEach<T>(elements: Iterable<T>): NextCall<CallChain, [T], T> {
  return nextCall((chain, pass) => {
    for (const element of elements) {
      chain.pass(pass, element);
    }
  });
}