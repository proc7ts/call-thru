/**
 * @module call-thru
 */
import { NextCall, nextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from '../next-call';
import { PassedThru } from '../passed-thru';
import { flatItems } from './iteration';

declare module '../call-outcome' {
  export namespace CallOutcome {

    export interface Map<Return, Out> {

      /**
       * Flattened iterable outcome type.
       */
      flat(): NextFlat.Flattened<Return>;

    }
  }
}

export interface NextFlat<NextArgs extends any[], NextReturn>
    extends NextCall<'flat', NextArgs, NextReturn, NextFlat.Flattened<NextReturn>, never[]> {

  (): NextFlat<NextArgs, NextReturn>;

  [NextCall__symbol](callee: (this: void, ...args: NextArgs) => NextReturn): NextFlat.Flattened<NextReturn>;

  [NextCall_lastOutcome__symbol](): never[];

}

export namespace NextFlat {

  export type Flattened<T> = Iterable<Item<Item<PassedThru.Item<NextCall.Callee.Return<T>>>>>;

  export type Item<T> = T extends Iterable<infer I> ? I : T;

}

/**
 * Constructs flattening call chain pass.
 *
 * The next pass is expected to return an iterable of iterables. This pass then converts it to plain iterable.
 */
export function passFlat<NextArgs extends any[], NextItem>(): (...args: NextArgs) => NextFlat<NextArgs, NextItem> {
  return _passFlat;
}

function _passFlat<NextArgs extends any[], NextReturn>(...args: NextArgs): NextFlat<NextArgs, NextReturn> {
  return nextCall(
      callee => ({
        [Symbol.iterator]() {
          return flatItems(PassedThru.items(callee(...args)), 2);
        },
      }),
      () => [],
  );
}
