import { nextCall, NextCall } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Iterable outcome type.
       */
      each(): Iterable<Return>;

    }
  }
}

/**
 * Creates an next call that invokes subsequent passes for each item in the given iterable.
 *
 * If `items` are `NextCall` implementations, then the next pass will be processed by them.
 *
 * When returned from the last pass, the chain outcome will be an iterable of the last pass outcomes of the `items`.
 * Or an iterable of `items` if they are not implementing `NextCall`.
 *
 * @param items An iterable of items to invoke the passes for.
 */
export function nextEach<NextItem, NextReturn>(items: Iterable<NextItem>):
    NextCall<
        'each',
        NextCall.Callee.Args<NextItem>,
        NextReturn,
        Iterable<NextReturn>,
        Iterable<NextCall.LastOutcome<NextItem>>> {
  return nextCall(
      callee => ({
        * [Symbol.iterator]() {
          for (const item of items) {
            if (NextCall.is(item)) {
              yield item[NextCall.next](callee);
            } else {
              const c = callee as (arg: NextItem) => NextReturn;
              yield c(item);
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
      }));
}
