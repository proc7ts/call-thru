import { lastOutcomeKey, NextCall, nextCall, nextCallKey } from '../next-call';
import { PassedThru } from '../passed-thru';
import { NextFlat } from './flat';
import { flatItems, forEachItem, lastItems } from './iteration';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Iterable outcome type.
       */
      flatEach(): NextFlatEach.Flattened<Return>;

    }
  }
}

export interface NextFlatEach<NextItem, NextReturn> extends NextCall<
    'flatEach',
    NextCall.Callee.Args<NextItem>,
    NextReturn,
    NextFlatEach.Flattened<NextReturn>,
    Iterable<PassedThru.Item<NextCall.LastOutcome<NextItem>>>> {

  (): NextFlatEach<NextItem, NextReturn>;

  [nextCallKey](
      callee: (this: void, ...args: NextCall.Callee.Args<NextItem>) => NextReturn):
      NextFlatEach.Flattened<NextReturn>;

  [lastOutcomeKey](): Iterable<PassedThru.Item<NextCall.LastOutcome<NextItem>>>;

}

export namespace NextFlatEach {

  export type Flattened<T> = Iterable<NextFlat.Item<PassedThru.Item<NextCall.Callee.Return<T>>>>;

}

/**
 * Creates an next call that invokes subsequent passes for each item in the given iterable and flattens the result.
 *
 * The next pass is expected to return an iterable for each of the `items`.
 *
 * If `items` are `NextCall` implementations, then the next pass will be processed by them.
 *
 * This is an equivalent of `passFlat()` followed by a pass returning `nextEach()`.
 *
 * When returned from the last pass, the chain outcome will be an iterable of the last pass outcomes of the `items`.
 * Or an iterable of `items` if they are not implementing `NextCall`.
 *
 * @param items An iterable of items to invoke the passes for.
 */
export function nextFlatEach<NextItem, NextReturn>(items: Iterable<NextItem>): NextFlatEach<NextItem, NextReturn> {
  return nextCall(
      callee => ({
        [Symbol.iterator]() {
          return flatItems(forEachItem(items, callee), 2);
        }
      }),
      () => ({
        [Symbol.iterator]() {
          return lastItems(items);
        }
      }),
  );
}
