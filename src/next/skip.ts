import { nextCall, NextCall } from '../next-call';

const SKIP: NextCall<any, any[], any, undefined> = nextCall(() => undefined);

/**
 * Returns a skipped call to the next function in chain.
 *
 * Returning this from previous function in chain prevent all subsequent functions in the same chain from being called.
 */
export function nextSkip<NextThis, NextArgs extends any[], NextReturn>():
    NextCall<NextThis, NextArgs, NextReturn, undefined> {
  return SKIP as NextCall<NextThis, NextArgs, NextReturn, undefined>;
}
