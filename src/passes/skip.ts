import { noop } from '../misc';
import { nextCall, NextCall } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return> {

      /**
       * Skipped call outcome type. Always `undefined`.
       */
      skip(): undefined;

    }
  }
}

const SKIP: NextCall<'skip', any[], any, undefined> = nextCall(noop);

/**
 * Returns a skipped call to the next function in chain.
 *
 * Returning this from previous function in chain prevent all subsequent functions in the same chain from being called.
 */
export function nextSkip<NextArgs extends any[], NextReturn>():
    NextCall<'skip', NextArgs, NextReturn, undefined> {
  return SKIP as NextCall<'skip', NextArgs, NextReturn, undefined>;
}
