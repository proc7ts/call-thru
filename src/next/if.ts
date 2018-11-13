import { nextCall, NextCall } from '../next-call';
import { nextSkip } from './skip';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return> {

      /**
       * Conditional outcome type. Either the same as return one or `undefined`.
       */
      if(): Return | undefined;

    }
  }
}

export function nextIf<NextArgs extends any[], NextReturn, Out>(
    test: (...args: NextArgs) => boolean):
    (this: void, ...args: NextArgs) => NextCall<'if', void, NextArgs, NextReturn, NextReturn | undefined> {
  return (...args: NextArgs) => {
    return test.apply(null, args) ? nextCall(callee => callee(...args)) : nextSkip();
  };
}
