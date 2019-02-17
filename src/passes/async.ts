import { lastOutcomeKey, NextCall, nextCall, nextCallKey } from '../next-call';
import { PassedThru } from '../passed-thru';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return, Out> {

      /**
       * Async call outcome type. The outcome is a promise of the return type. Unless the return type is already a
       * promise.
       */
      async(): AsyncResult<PassedThru.Value<Return>>;

    }
  }
}

/**
 * Promised value is a value the given Promise type resolves to.
 */
export type Promised<T> = T extends Promise<infer V> ? V : T;

/**
 * Asynchronous result is either a promise of the given type, or the type itself if is a promise.
 */
export type AsyncResult<T> = Promise<PassedThru.Value<Promised<T>>>;

export interface NextAsync<NextArgs extends any[], NextReturn>
    extends NextCall<'async', NextArgs, NextReturn, AsyncResult<NextReturn>, Promise<void>> {

  (): NextAsync<NextArgs, NextReturn>;

  [nextCallKey](callee: (this: void, ...args: NextArgs) => NextReturn): AsyncResult<NextReturn>;

  [lastOutcomeKey](): Promise<void>;

}

/**
 * Constructs asynchronous call chain pass.
 *
 * The next pass in chain will be invoked asynchronously and its outcome will be resolved as promise.
 */
export function passAsync<NextArgs extends any[], NextReturn>():
    (this: void, ...args: NextArgs) => NextAsync<NextArgs, NextReturn> {
  return _passAsync;
}

const resolved = Promise.resolve();

function resolvePromise(): Promise<void> {
  return resolved;
}

function _passAsync<NextArgs extends any[], NextReturn>(...args: NextArgs): NextAsync<NextArgs, NextReturn> {
  return nextCall(
      callee => new Promise<Promised<NextReturn>>((resolve: any) => resolve(callee.apply(undefined, args)))
          .then(PassedThru.get),
      resolvePromise);
}
