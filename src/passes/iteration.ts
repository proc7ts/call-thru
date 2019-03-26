import { NextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from '../next-call';
import { PassedThru } from '../passed-thru';

export function *forEachItem<NextItem, NextReturn>(
    items: Iterable<NextItem>,
    callee: (this: void, ...args: NextCall.Callee.Args<NextItem>) => NextReturn) {
  for (const item of items) {
    yield* PassedThru.items(
        NextCall.is(item)
            ? item[NextCall__symbol](callee)
            : (callee as (arg: NextItem) => NextReturn)(item));
  }
}

export function *lastItems<NextItem>(items: Iterable<NextItem>) {
  for (const item of items) {
    yield* PassedThru.items(
        NextCall.is(item)
            ? item[NextCall_lastOutcome__symbol]()
            : item);
  }
}

export function *flatItems<I>(items: Iterable<unknown>, depth: number): IterableIterator<any> {
  if (!depth) {
    yield *items;
    return;
  }
  for (const item of items) {
    if (isIterable(item)) {
      yield *flatItems(item, depth - 1);
    } else {
      yield item;
    }
  }
}

function isIterable<I>(value: any): value is Iterable<I> {

  const type = typeof value;

  return (type === 'object' || type === 'function') && Symbol.iterator in value;
}
