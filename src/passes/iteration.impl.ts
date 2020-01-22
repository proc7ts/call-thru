/**
 * @packageDocumentation
 * @module call-thru
 */
import { NextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from '../next-call';
import { PassedThru } from '../passed-thru';

/**
 * @internal
 */
export function *forEachItem<NextItem, NextReturn>(
    items: Iterable<NextItem>,
    callee: (this: void, ...args: NextCall.Callee.Args<NextItem>) => NextReturn,
): IterableIterator<any> {
  for (const item of items) {
    yield* PassedThru.items(
        NextCall.is(item)
            ? item[NextCall__symbol](callee)
            : (callee as (arg: NextItem) => NextReturn)(item),
    );
  }
}

/**
 * @internal
 */
export function *lastItems<NextItem>(
    items: Iterable<NextItem>,
): IterableIterator<any> {
  for (const item of items) {
    yield* PassedThru.items(
        NextCall.is(item)
            ? item[NextCall_lastOutcome__symbol]()
            : item,
    );
  }
}

/**
 * @internal
 */
export function *flatItems<I>(items: Iterable<unknown>, depth: number): IterableIterator<any> {
  if (!depth) {
    yield* items as Iterable<I>;
    return;
  }
  for (const item of items) {
    if (isIterable(item)) {
      yield* flatItems(item, depth - 1);
    } else {
      yield item;
    }
  }
}

/**
 * @internal
 */
function isIterable<I>(value: any): value is Iterable<I> {

  const type = typeof value;

  return (type === 'object' || type === 'function') && Symbol.iterator in value;
}
