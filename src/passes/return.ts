/**
 * @packageDocumentation
 * @module call-thru
 */
import { valueProvider } from '../misc';
import { NextCall, nextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Value return pass outcome type.
       */
      return(): Out;

    }
  }
}

export interface NextReturn<NextArgs extends any[], Return, Out>
    extends NextCall<'return', NextArgs, Return, Out, Out> {

  (): NextReturn<NextArgs, Return, Out>;

  [NextCall__symbol](callee: (this: void, ...args: NextArgs) => Return): Out;

  [NextCall_lastOutcome__symbol](): Out;

}

/**
 * Constructs a next call that skips the rest of the chain and returns the given value.
 *
 * @param result  A result to return.
 */
export function nextReturn<NextArgs extends any[], Return, Out>(result: Out): NextReturn<NextArgs, Return, Out> {

  const returnResult = valueProvider(result);

  return nextCall(returnResult, returnResult);
}
