import { lastOutcomeKey, NextCall, nextCallKey } from './next-call';
import { PassedThru } from './passed-thru';
import Args = NextCall.Callee.Args;
import Last = NextCall.LastOutcome;
import Out = NextCall.Outcome;

export function callThru<P1 extends any[], R>(
    fn: (this: void, ...args: P1) => R):
    (this: void, ...args: P1) => PassedThru.Value<Last<R>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Last<R2>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Last<R3>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Last<R4>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Last<R5>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Last<R6>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Last<R7>>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Last<R8>>>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8,
    P9 extends Args<R8>, R9>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Out<R8, Last<R9>>>>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8,
    P9 extends Args<R8>, R9,
    P10 extends Args<R9>, R10>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Out<R8, Out<R9, Last<R10>>>>>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8,
    P9 extends Args<R8>, R9,
    P10 extends Args<R9>, R10,
    P11 extends Args<R10>, R11>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => R11):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Out<R8, Out<R9, Out<R10,
            Last<R11>>>>>>>>>>>>;

export function callThru<
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8,
    P9 extends Args<R8>, R9,
    P10 extends Args<R9>, R10,
    P11 extends Args<R10>, R11,
    P12 extends Args<R11>, R12>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => R11,
    fn12: (this: void, ...args: P12) => R12):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Out<R8, Out<R9, Out<R10,
            Out<R11, Last<R12>>>>>>>>>>>>>;

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
    P1 extends any[], R1,
    P2 extends Args<R1>, R2,
    P3 extends Args<R2>, R3,
    P4 extends Args<R3>, R4,
    P5 extends Args<R4>, R5,
    P6 extends Args<R5>, R6,
    P7 extends Args<R6>, R7,
    P8 extends Args<R7>, R8,
    P9 extends Args<R8>, R9,
    P10 extends Args<R9>, R10,
    P11 extends Args<R10>, R11,
    P12 extends Args<R11>, R12,
    P13 extends Args<R12>, R13>(
    fn1: (this: void, ...args: P1) => R1,
    fn2: (this: void, ...args: P2) => R2,
    fn3: (this: void, ...args: P3) => R3,
    fn4: (this: void, ...args: P4) => R4,
    fn5: (this: void, ...args: P5) => R5,
    fn6: (this: void, ...args: P6) => R6,
    fn7: (this: void, ...args: P7) => R7,
    fn8: (this: void, ...args: P8) => R8,
    fn9: (this: void, ...args: P9) => R9,
    fn10: (this: void, ...args: P10) => R10,
    fn11: (this: void, ...args: P11) => R11,
    fn12: (this: void, ...args: P12) => R12,
    fn13: (this: void, ...args: P13) => R13):
    (this: void, ...args: P1) => PassedThru.Value<Out<R1, Out<R2, Out<R3, Out<R4, Out<R5,
        Out<R6, Out<R7, Out<R8, Out<R9, Out<R10,
            Out<R11, Out<R12, Last<R13>>>>>>>>>>>>>>;

export function callThru<R>(...fns: ((...args: any[]) => any)[]): (...args: any[]) => R {

  function callNext(idx: number, prev: any): any {

    const len = fns.length;

    if (idx < len) {
      // There is a next pass in chain
      if (!NextCall.is(prev)) {
        return callNext(idx + 1, fns[idx].call(null, prev));
      }
      return prev[nextCallKey](function (this: any, ...args: any[]) {
        return callNext(idx + 1, fns[idx].apply(this, args));
      });
    }

    // Last in chain
    if (!NextCall.is(prev)) {
      return prev;
    }

    return prev[lastOutcomeKey]();
  }

  return function (this: any, ...args: any[]) {
    return PassedThru.get(callNext(1, fns[0].apply(this, args)));
  };
}
