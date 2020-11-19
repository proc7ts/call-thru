/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
import { noop } from '@proc7ts/primitives';
import { CallChain } from './call-chain';
import { isNextCall, NextCall__symbol } from './next-call';
/** @hidden */
import Args = CallChain.Args;
/** @hidden */
import OrSkip = CallChain.OrSkip;
/** @hidden */
import Out = CallChain.Out;

/**
 * Constructs a function that invokes a call chain.
 *
 * Each pass in this chain is a function accepting argument(s) passed from the previous one.
 *
 * The value returned from the pass is treated the following way:
 *
 * - When a {@link NextCall} is returned, this instance is used to perform the class of the next pass.
 * - When plain value returned, this value is passed to the next function as the only argument.
 * - When a {@link NextCall} returned by the last pass, it is used to construct the outcome.
 * - When a plain value returned by the last pass, it is used as outcome.
 * - When the last pass in chain is never called an `undefined` (when {@link nextSkip} applied), or predefined value
 *   (when {@link nextReturn} applied) is returned.
 *
 * A {@link NextCall} instance returned the pass is responsible for next function call and may modify the call outcome.
 */
export function callThru<
    Args1 extends any[], Return1
    >(
    pass1: (this: void, ...args1: Args1) => Return1,
): (this: void, ...args1: Args1) => Out<Return1>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
): (this: void, ...args1: Args1) => Out<Return2, OrSkip<Return1>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
): (this: void, ...args1: Args1) => Out<Return3, OrSkip<Return2, OrSkip<Return1>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return2>, Return4,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
): (this: void, ...args1: Args1) => Out<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
): (this: void, ...args1: Args1) => Out<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args5) => Return6,
): (this: void, ...args1: Args1) => Out<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
): (this: void, ...args1: Args1) => Out<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
): (this: void, ...args1: Args1) => Out<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    Args9 extends Args<Return8>, Return9,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
    pass9: (this: void, ...args: Args9) => Return9,
): (this: void, ...args1: Args1) => Out<Return9, OrSkip<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    Args9 extends Args<Return8>, Return9,
    Args10 extends Args<Return9>, Return10,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
    pass9: (this: void, ...args: Args9) => Return9,
    pass10: (this: void, ...args: Args10) => Return10,
): (this: void, ...args1: Args1) => Out<Return10,
    OrSkip<Return9, OrSkip<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    Args9 extends Args<Return8>, Return9,
    Args10 extends Args<Return9>, Return10,
    Args11 extends Args<Return10>, Return11,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
    pass9: (this: void, ...args: Args9) => Return9,
    pass10: (this: void, ...args: Args10) => Return10,
    pass11: (this: void, ...args: Args11) => Return11,
): (this: void, ...args1: Args1) => Out<Return11, OrSkip<Return10,
    OrSkip<Return9, OrSkip<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    Args9 extends Args<Return8>, Return9,
    Args10 extends Args<Return9>, Return10,
    Args11 extends Args<Return10>, Return11,
    Args12 extends Args<Return11>, Return12,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
    pass9: (this: void, ...args: Args9) => Return9,
    pass10: (this: void, ...args: Args10) => Return10,
    pass11: (this: void, ...args: Args11) => Return11,
    pass12: (this: void, ...args: Args12) => Return12,
): (this: void, ...args1: Args1) => Out<Return12, OrSkip<Return11, OrSkip<Return10,
    OrSkip<Return9, OrSkip<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>>>>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    Args4 extends Args<Return3>, Return4,
    Args5 extends Args<Return4>, Return5,
    Args6 extends Args<Return5>, Return6,
    Args7 extends Args<Return6>, Return7,
    Args8 extends Args<Return7>, Return8,
    Args9 extends Args<Return8>, Return9,
    Args10 extends Args<Return9>, Return10,
    Args11 extends Args<Return10>, Return11,
    Args12 extends Args<Return11>, Return12,
    Args13 extends Args<Return12>, Return13,
    >(
    pass1: (this: void, ...args: Args1) => Return1,
    pass2: (this: void, ...args: Args2) => Return2,
    pass3: (this: void, ...args: Args3) => Return3,
    pass4: (this: void, ...args: Args4) => Return4,
    pass5: (this: void, ...args: Args5) => Return5,
    pass6: (this: void, ...args: Args6) => Return6,
    pass7: (this: void, ...args: Args7) => Return7,
    pass8: (this: void, ...args: Args8) => Return8,
    pass9: (this: void, ...args: Args9) => Return9,
    pass10: (this: void, ...args: Args10) => Return10,
    pass11: (this: void, ...args: Args11) => Return11,
    pass12: (this: void, ...args: Args12) => Return12,
    pass13: (this: void, ...args: Args13) => Return13,
): (this: void, ...args1: Args1) => Out<Return13, OrSkip<Return12, OrSkip<Return11, OrSkip<Return10,
    OrSkip<Return9, OrSkip<Return8, OrSkip<Return7, OrSkip<Return6, OrSkip<Return5,
    OrSkip<Return4, OrSkip<Return3, OrSkip<Return2, OrSkip<Return1>>>>>>>>>>>>>;

export function callThru(
    ...passes: ((...args: any[]) => any)[]
): (...args: any[]) => any {
  return (...args): any => {

    let result: any;
    const chain = (index: number): CallChain => {

      const lastPass = index >= passes.length;

      ++index;

      const pass = index < passes.length ? passes[index] : noop;
      const handleResult = (callResult: any, arg: any): void => {
        if (isNextCall(callResult)) {
          callResult[NextCall__symbol](chain(index), pass);
        } else if (lastPass) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          result = arg;
        } else {
          chain(index).pass(pass, callResult);
        }
      };

      return ({
        call<A extends any[]>(fn: (...args: A) => any, args: A): void {
          handleResult(fn(...args), args);
        },
        pass<A>(fn: (arg: A) => any, arg: A): void {
          handleResult(fn(arg), arg);
        },
        skip(r?: any): void {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          result = r;
        },
      });
    };

    chain(0).call(passes[0], args);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}
