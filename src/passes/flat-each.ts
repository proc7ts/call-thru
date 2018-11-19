import { nextCall, NextCall } from '../next-call';

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
export function nextFlatEach<NextItem, NextReturn>(items: Iterable<NextItem>):
    NextCall<
        'default',
        NextCall.Callee.Args<NextItem>,
        Iterable<NextReturn>,
        Iterable<NextReturn>,
        Iterable<NextCall.LastOutcome<NextItem>>> {
  return nextCall(
      callee => ({
        * [Symbol.iterator]() {
          for (const item of items) {
            if (NextCall.is(item)) {
              yield *item[NextCall.next](callee);
            } else {

              const c = callee as (arg: NextItem) => Iterable<NextReturn>;

              yield *c(item);
            }
          }
        }
      }),
      () => ({
        * [Symbol.iterator]() {
          for (const item of items) {
            if (NextCall.is(item)) {
              yield item[NextCall.last]();
            } else {
              yield item;
            }
          }
        }
      }),
  );
}
