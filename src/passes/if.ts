import { nextCall, NextCall } from '../next-call';
import { nextSkip } from './skip';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Conditional outcome type. Either the same as return one or `undefined`.
       */
      if(): Return | undefined;

    }
  }
}

export interface NextIf<NextArgs extends any[], NextReturn>
    extends NextCall<'if', NextArgs, NextReturn, NextReturn | undefined> {

  (): NextIf<NextArgs, NextReturn>;

  [NextCall.next](callee: (this: void, ...args: NextArgs) => NextReturn): NextReturn | undefined;

}

/**
 * Constructs conditional call chain pass.
 *
 * If the given `test` function fails the rest of the passes in chain would be skipped and the final call chain outcome
 * will be `undefined`. Otherwise the next pass in chain will be called with the same arguments.
 *
 * @param test A test function accepting this pass arguments and returning `true` to go on or `false` to abort.
 */
export function passIf<NextArgs extends any[], NextReturn>(
    test: (this: void, ...args: NextArgs) => boolean):
    (this: void, ...args: NextArgs) => NextIf<NextArgs, NextReturn> {
  return (...args) => test.apply(null, args) ? nextCall(callee => callee.apply(null, args)) : nextSkip();
}
