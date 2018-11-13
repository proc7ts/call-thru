import { NextCall } from './next-call';
import Args = NextCall.Callee.Args;
import This = NextCall.Callee.This;
import Out = NextCall.Outcome;
import Last = NextCall.LastOutcome;

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
    return NextCall.of(prev)(fns[idx]);
  }

  return function (this: any, ...args: any[]) {

    const result = callNext(1, fns[0].apply(this, args));

    if (!NextCall.is(result)) {
      return result;
    }

    return result((arg: any) => arg);
  };
}
