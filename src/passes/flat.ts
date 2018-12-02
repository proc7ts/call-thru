import { nextCall, NextCall } from '../next-call';
import { PassedThru } from '../passed-thru';

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

  [NextCall.next](callee: (this: void, ...args: NextArgs) => NextReturn): NextFlat.Flattened<NextReturn>;

  [NextCall.last](): never[];

}

export namespace NextFlat {

  export type Flattened<T> = Iterable<Item<Item<PassedThru.Item<T>>>>;

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
          return flat(PassedThru.items(callee(...args)), 2);
        }
      }),
      () => [],
  );
}

function isIterable<I>(value: any): value is Iterable<I> {

  const type = typeof value;

  return (type === 'object' || type === 'function') && Symbol.iterator in value;
}

function *flat<I>(items: Iterable<unknown>, depth: number): IterableIterator<any> {
  if (!depth) {
    yield *items;
    return;
  }
  for (const item of items) {
    if (isIterable(item)) {
      yield *flat(item, depth - 1);
    } else {
      yield item;
    }
  }
}
