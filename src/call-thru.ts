import { NextCall } from './next-call';
import Args = NextCall.Callee.Args;
import This = NextCall.Callee.This;
import Last = NextCall.LastOutcome;
import Out = NextCall.Outcome;

export function callThru<T extends void, P extends any[], R>(
    fn: (this: T, ...args: P) => R):
    (this: T, ...args: P) => Last<R>;

export function callThru<T extends void, P extends any[], R1, R2>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2):
    (this: T, ...args: P) => Out<R1, Last<R2>>;

export function callThru<T extends void, P extends any[], R1, R2, R3>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R3):
    (this: T, ...args: P) => Out<R1, Out<R2, Last<R3>>>;

export function callThru<T extends void, P extends any[], R1, R2, R3, R4>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R3,
    fn4: (this: This<R3>, ...args: Args<R3>) => R4):
    (this: T, ...args: P) => Out<R1, Out<R2, Out<R3, Last<R4>>>>;

/**
 * Constructs a function that calls chained functions with respect to `NextCall` returned from them.
 *
 * - When any function in chain returns a `NextCall`, this instance is used to perform the next function call.
 * - When any function in chain returns a plain value, this value is passed to the next function as the only argument.
 * - If the last function in chain returns a `NextCall`, this function's outcome is returned.
 *   This outcome is extracted by applying the next function call to the function returning a first argument
 *   passed to it.
 * - If the last function in chain returns a plain value, this value is returned.
 */
export function callThru<T extends void, P extends any[], R1, R2, R3, R4, R5>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R2,
    fn4: (this: This<R3>, ...args: Args<R3>) => R4,
    fn5: (this: This<R4>, ...args: Args<R4>) => R5):
    (this: T, ...args: P) => Out<R1, Out<R2, Out<R3, Out<R4, Last<R5>>>>>;

export function callThru<R>(...fns: ((...args: any[]) => any)[]): (...args: any[]) => R {

  function callNext(idx: number, prev: any) {
    if (idx >= fns.length) {
      return prev;
    }
    return NextCall.of(prev)[NextCall.call](fns[idx]);
  }

  return function (this: any, ...args: any[]) {

    const result = callNext(1, fns[0].apply(this, args));

    if (!NextCall.is(result)) {
      return result;
    }

    return result[NextCall.call]((arg: any) => arg);
  };
}
