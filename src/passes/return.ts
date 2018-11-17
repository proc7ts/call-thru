import { nextCall, NextCall } from '../next-call';

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

/**
 * Returns a call that skips the next pass and returns the given value.
 *
 * Returning this from previous pass in chain prevent all subsequent functions in the same chain from being called.
 *
 * @param result A result to return.
 */
export function nextReturn<NextArgs extends any[], NextReturn, Out>(result: Out):
    NextCall<'return', NextArgs, NextReturn, Out> {
  return nextCall(() => result);
}
