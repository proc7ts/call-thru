import { Args } from './args';

export function callThru<T extends void, P extends any[], R>(
    fn: (this: T, ...args: P) => R): (this: T, ...args: P) => R;
export function callThru<T extends void, P extends any[], P2, R>(
    fn1: (this: T, ...args: P) => P2,
    fn2: (this: Args.This<P2>, ...args: Args.Tuple<P2>) => R): (this: T, ...args: P) => R;
export function callThru<T extends void, P extends any[], P2, P3, R>(
    fn1: (this: T, ...args: P) => P2,
    fn2: (this: Args.This<P2>, ...args: Args.Tuple<P2>) => P3,
    fn3: (this: Args.This<P3>, ...args: Args.Tuple<P3>) => R): (...args: P) => R;
export function callThru<T extends void, P extends any[], P2, P3, P4, R>(
    fn1: (this: T, ...args: P) => P2,
    fn2: (this: Args.This<P2>, ...args: Args.Tuple<P2>) => P3,
    fn3: (this: Args.This<P3>, ...args: Args.Tuple<P3>) => P4,
    fn4: (this: Args.This<P4>, ...args: Args.Tuple<P4>) => R): (...args: P) => R;
export function callThru<T extends void, P extends any[], P2, P3, P4, P5, R>(
    fn1: (this: T, ...args: P) => P2,
    fn2: (this: Args.This<P2>, ...args: Args.Tuple<P2>) => P3,
    fn3: (this: Args.This<P3>, ...args: Args.Tuple<P3>) => P3,
    fn4: (this: Args.This<P4>, ...args: Args.Tuple<P4>) => P5,
    fn5: (this: Args.This<P5>, ...args: Args.Tuple<P5>) => R): (...args: P) => R;

export function callThru<R>(this: any, ...fns: ((...args: any[]) => any)[]): (this: any, ...args: any[]) => R {
  return function (this: any, ...args: any[]) {

    let prev: any = fns[0].apply(this, args);

    for (let i = 1; i < fns.length; ++i) {
      prev = Args.invoke(fns[i], prev);
    }

    return prev;
  };
}
