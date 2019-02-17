import { nextCall, NextCall, nextCallKey } from '../next-call';
import { nextSkip, SkippedThru } from './skip';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Conditional outcome type. Either the same as return one or `undefined`.
       */
      if(): Return | SkippedThru;

    }
  }
}

export interface NextIf<NextArgs extends any[], NextReturn>
    extends NextCall<'if', NextArgs, NextReturn, NextReturn | SkippedThru> {

  (): NextIf<NextArgs, NextReturn>;

  [nextCallKey](callee: (this: void, ...args: NextArgs) => NextReturn): NextReturn | SkippedThru;

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
  return (...args) => test.apply(undefined, args) ? nextCall(callee => callee.apply(undefined, args)) : nextSkip();
}
