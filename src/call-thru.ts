import { NextCall, NextCall__symbol, NextCall_lastOutcome__symbol } from './next-call';
import { PassedThru } from './passed-thru';
import Out = NextCall.Outcome;

export type CallResult<NextArgs extends any[], NextResult> = NextResult | NextCall<any, NextArgs, NextResult, any, any>;

export type LastResult<R> = R | NextCall<any, any, any, any, R>;

export function callThru<P extends any[], R>(
    fn: (this: void, ...args: P) => LastResult<R>,
): (this: void, ...args: P) =>
    PassedThru.Value<R>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => LastResult<R2>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, R2>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => LastResult<R3>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, R3>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => LastResult<R4>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, R4>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => LastResult<R5>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, R5>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => LastResult<R6>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, R6>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => LastResult<R7>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, R7>>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => LastResult<R8>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, R8>>>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8 extends CallResult<P9, R9>,
    P9 extends any[], R9>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => LastResult<R9>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, Out<R8, R9>>>>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8 extends CallResult<P9, R9>,
    P9 extends any[], R9 extends CallResult<P10, R10>,
    P10 extends any[], R10>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => LastResult<R10>):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, Out<R8, Out<R9, R10>>>>>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8 extends CallResult<P9, R9>,
    P9 extends any[], R9 extends CallResult<P10, R10>,
    P10 extends any[], R10 extends CallResult<P11, R11>,
    P11 extends any[], R11>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => LastResult<R11>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, Out<R8, Out<R9,
            Out<R10, R11>>>>>>>>>>>;

export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8 extends CallResult<P9, R9>,
    P9 extends any[], R9 extends CallResult<P10, R10>,
    P10 extends any[], R10 extends CallResult<P11, R11>,
    P11 extends any[], R11 extends CallResult<P12, R12>,
    P12 extends any[], R12>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => R11,
    fn12: (this: void, ...args: P12) => LastResult<R12>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, Out<R8, Out<R9,
            Out<R10, Out<R11, R12>>>>>>>>>>>>;

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
export function callThru<
    P1 extends any[], R1 extends CallResult<P2, R2>,
    P2 extends any[], R2 extends CallResult<P3, R3>,
    P3 extends any[], R3 extends CallResult<P4, R4>,
    P4 extends any[], R4 extends CallResult<P5, R5>,
    P5 extends any[], R5 extends CallResult<P6, R6>,
    P6 extends any[], R6 extends CallResult<P7, R7>,
    P7 extends any[], R7 extends CallResult<P8, R8>,
    P8 extends any[], R8 extends CallResult<P9, R9>,
    P9 extends any[], R9 extends CallResult<P10, R10>,
    P10 extends any[], R10 extends CallResult<P11, R11>,
    P11 extends any[], R11 extends CallResult<P12, R12>,
    P12 extends any[], R12 extends CallResult<P13, R13>,
    P13 extends any[], R13>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P7) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => R11,
    fn12: (this: void, ...args: P12) => R12,
    fn13: (this: void, ...args: P13) => LastResult<R13>,
): (this: void, ...args: P1) =>
    PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4,
        Out<R5, Out<R6, Out<R7, Out<R8, Out<R9,
            Out<R10, Out<R11, Out<R12, R13>>>>>>>>>>>>>;

export function callThru<R>(...fns: ((...args: any[]) => any)[]): (...args: any[]) => R {

  function callNext(idx: number, prev: any): any {

    const len = fns.length;

    if (idx < len) {
      // There is a next pass in chain
      if (!NextCall.is(prev)) {
        return callNext(idx + 1, fns[idx].call(null, prev));
      }
      return prev[NextCall__symbol](function (this: any, ...args: any[]) {
        return callNext(idx + 1, fns[idx].apply(this, args));
      });
    }

    // Last in chain
    if (!NextCall.is(prev)) {
      return prev;
    }

    return prev[NextCall_lastOutcome__symbol]();
  }

  return function (this: any, ...args: any[]) {
    return PassedThru.get(callNext(1, fns[0].apply(this, args)));
  };
}
