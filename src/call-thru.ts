import { NextCall } from './next-call';
import Args = NextCall.Callee.Args;
import Last = NextCall.LastOutcome;
import Out = NextCall.Outcome;

export function callThru<P extends any[], R>(
    fn: (this: void, ...args: P) => R):
    (this: void, ...args: P) => Last<R>;

export function callThru<P extends any[], R1, R2>(
    fn1: (this: void, ...args: P) => R1,
    fn2: (this: void, ...args: Args<R1>) => R2):
    (this: void, ...args: P) => Out<R1, Last<R2>>;

export function callThru<P extends any[], R1, R2, R3>(
    fn1: (this: void, ...args: P) => R1,
    fn2: (this: void, ...args: Args<R1>) => R2,
    fn3: (this: void, ...args: Args<R2>) => R3):
    (this: void, ...args: P) => Out<R1, Out<R2, Last<R3>>>;

export function callThru<P extends any[], R1, R2, R3, R4>(
    fn1: (this: void, ...args: P) => R1,
    fn2: (this: void, ...args: Args<R1>) => R2,
    fn3: (this: void, ...args: Args<R2>) => R3,
    fn4: (this: void, ...args: Args<R3>) => R4):
    (this: void, ...args: P) => Out<R1, Out<R2, Out<R3, Last<R4>>>>;

/**
 * Constructs a function that invokes the chained passes.
 *
 * Each pass is function accepts argument(s) passed from the previous one.
 *
 * The value returned from the pass is treated the following way:
 *
 * - When a `NextCall` is returned, this instance is used to perform the next function call.
 * - When plain value returned, this value is passed to the next function as the only argument.
 * - When a `NextCall` is returned by the last pass, it is used to construct the outcome.
 * - When a plain value is returned by the last pass, it is used as outcome.
 *
 * A `NextCall` instance returned the pass is responsible for next function call and may modify the call outcome.
 */
export function callThru<P extends any[], R1, R2, R3, R4, R5>(
    fn1: (this: void, ...args: P) => R1,
    fn2: (this: void, ...args: Args<R1>) => R2,
    fn3: (this: void, ...args: Args<R2>) => R2,
    fn4: (this: void, ...args: Args<R3>) => R4,
    fn5: (this: void, ...args: Args<R4>) => R5):
    (this: void, ...args: P) => Out<R1, Out<R2, Out<R3, Out<R4, Last<R5>>>>>;

export function callThru<R>(...fns: ((...args: any[]) => any)[]): (...args: any[]) => R {

  function callNext(idx: number, prev: any): any {

    const len = fns.length;

    if (idx < len) {
      // There is a next pass in chain
      if (!NextCall.is(prev)) {
        return callNext(idx + 1, fns[idx].call(null, prev));
      }
      return prev[NextCall.next](function (this: any, ...args: any[]) {
        return callNext(idx + 1, fns[idx].apply(this, args));
      });
    }

    // Last in chain
    if (!NextCall.is(prev)) {
      return prev;
    }

    return prev[NextCall.last]();
  }

  return function (this: any, ...args: any[]) {
    return callNext(1, fns[0].apply(this, args));
  };
}
