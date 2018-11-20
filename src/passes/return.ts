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
 * Constructs a next call that skips the rest of the chain and returns the given value.
 *
 * @param result A result to return.
 */
export function nextReturn<NextArgs extends any[], NextReturn, Out>(result: Out):
    NextCall<'return', NextArgs, NextReturn, Out> {
  return nextCall(() => result);
}
