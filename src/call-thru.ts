import { Caller } from './caller';

import Args = Caller.Callee.Args;
import Out = Caller.Outcome;
import This = Caller.Callee.This;

export function callThru<T extends void, P extends any[], R>(
    fn: (this: T, ...args: P) => R):
    (this: T, ...args: P) => R;

export function callThru<T extends void, P extends any[], R1, R2>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2):
    (this: T, ...args: P) => Out<R1, R2>;

export function callThru<T extends void, P extends any[], R1, R2, R3>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R3):
    (this: T, ...args: P) => Out<R1, Out<R2, R3>>;

export function callThru<T extends void, P extends any[], R1, R2, R3, R4>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R3,
    fn4: (this: This<R3>, ...args: Args<R3>) => R4):
    (this: T, ...args: P) => Out<R1, Out<R2, Out<R3, R4>>>;

export function callThru<T extends void, P extends any[], R1, R2, R3, R4, R5>(
    fn1: (this: T, ...args: P) => R1,
    fn2: (this: This<R1>, ...args: Args<R1>) => R2,
    fn3: (this: This<R2>, ...args: Args<R2>) => R2,
    fn4: (this: This<R3>, ...args: Args<R3>) => R4,
    fn5: (this: This<R4>, ...args: Args<R4>) => R5):
    (this: T, ...args: P) => Out<R1, Out<R2, Out<R3, Out<R4, R5>>>>;

export function callThru<R>(...fns: ((...args: any[]) => any)[]): (...args: any[]) => R {
  function call(idx: number, prev: any) {
    if (idx >= fns.length) {
      return prev;
    }
    return Caller.of(prev)(fns[idx]);
  }
  return function (this: any, ...args: any[]) {
    return call(1, fns[0].apply(this, args));
  };
}
