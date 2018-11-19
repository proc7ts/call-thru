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
 * `items` will be returned as outcome if returned from the last pass.
 *
 * @param items An iterable of items to invoke the passes for.
 */
export function nextEach<NextItem, NextReturn>(items: Iterable<NextItem>):
    NextCall<'each', [NextItem], NextReturn, Iterable<NextReturn>, Iterable<NextItem>> {
  return nextCall(
      callee => ({
        * [Symbol.iterator]() {
          for (const item of items) {
            yield callee(item);
          }
        }
      }),
      () => items);
}
