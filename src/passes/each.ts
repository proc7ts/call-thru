/**
 * @module call-thru
 */
import { NextCall, nextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from '../next-call';
import { PassedThru } from '../passed-thru';
import { forEachItem, lastItems } from './iteration.impl';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Iterable outcome type.
       */
      each(): Iterable<PassedThru.Item<NextCall.Callee.Return<Return>>>;

    }
  }
}

export interface NextEach<NextItem, NextReturn> extends NextCall<
    'each',
    NextCall.Callee.Args<NextItem>,
    NextReturn,
    Iterable<PassedThru.Item<NextCall.Callee.Return<NextReturn>>>,
    Iterable<PassedThru.Item<NextCall.LastOutcome<NextItem>>>> {

  (): NextEach<NextItem, NextReturn>;

  [NextCall__symbol](callee: (this: void, ...args: NextCall.Callee.Args<NextItem>) => NextReturn):
      Iterable<PassedThru.Item<NextCall.Callee.Return<NextReturn>>>;

  [NextCall_lastOutcome__symbol](): Iterable<PassedThru.Item<NextCall.LastOutcome<NextItem>>>;

}

/**
 * Creates an next call that invokes subsequent passes for each item in the given iterable.
 *
 * If `items` are [[NextCall]] implementations, then the next pass will be processed by them.
 *
 * When returned from the last pass, the chain outcome will be an iterable of the last pass outcomes of the `items`.
 * Or an iterable of `items` if they are not implementing [[NextCall]].
 *
 * @param items  An iterable of items to invoke the passes for.
 */
export function nextEach<NextItem, NextReturn>(items: Iterable<NextItem>): NextEach<NextItem, NextReturn> {
  return nextCall(
      callee => ({
        [Symbol.iterator]() {
          return forEachItem(items, callee);
        },
      }),
      () => ({
        [Symbol.iterator]() {
          return lastItems(items);
        },
      }),
  );
}
