import { nextCall, NextCall } from '../next-call';

declare module '../call-outcome' {
  export namespace CallOutcome {
    export interface Map<Return> {

      /**
       * Async call outcome type. The outcome is a promise of the return type. Unless the return type is already a
       * promise.
       */
      async(): AsyncResult<Return>;

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
export type AsyncResult<T> = Promise<Promised<T>>;

/**
 * Constructs asynchronous call chain pass.
 *
 * The next pass in chain will be invoked asynchronously and its outcome will be resolved as promise.
 */
export function passAsync<NextArgs extends any[], NextReturn>():
    (this: void, ...args: NextArgs) => NextCall<'async', void, NextArgs, NextReturn, AsyncResult<NextReturn>> {
  return (...args: NextArgs) => nextCall(callee => new Promise<Promised<NextReturn>>(resolve => {
    resolve(callee.apply(null, args));
  }));
}
