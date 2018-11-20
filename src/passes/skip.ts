import { noop } from '../misc';
import { nextCall, NextCall } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Skipped call outcome type. Always `undefined`.
       */
      skip(): undefined;

    }
  }
}

const SKIP: NextCall<'skip', any[], any, undefined> = nextCall(noop);

/**
 * Constructs a next call that skips the rest of the chain.
 *
 * This has the same effect as `nextReturn(undefined)`.
 */
export function nextSkip<NextArgs extends any[], NextReturn>():
    NextCall<'skip', NextArgs, NextReturn, undefined> {
  return SKIP as NextCall<'skip', NextArgs, NextReturn, undefined>;
}
