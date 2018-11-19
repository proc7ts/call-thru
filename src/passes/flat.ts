import { nextCall, NextCall } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Flattened iterable outcome type.
       */
      flat(): Return extends Iterable<Iterable<infer Item>> ? Iterable<Item> : never;

    }
  }
}

/**
 * Constructs flattening call chain pass.
 *
 * The next pass is expected to return an iterable of iterables. This pass then converts it to plain iterable.
 */
export function passFlat<NextArgs extends any[], NextItem>():
    (...args: NextArgs) => NextCall<'flat', NextArgs, Iterable<Iterable<NextItem>>, Iterable<NextItem>, never[]> {
  return _passFlat;
}

function _passFlat<NextArgs extends any[], NextItem>(...args: NextArgs): NextCall<
    'flat',
    NextArgs,
    Iterable<Iterable<NextItem>>,
    Iterable<NextItem>,
    never[]> {
  return nextCall(
      callee => ({
        * [Symbol.iterator]() {
          for (const item of callee(...args)) {
            yield* item;
          }
        }
      }),
      () => [],
  );
}
