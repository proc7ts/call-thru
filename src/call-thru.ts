/**
 * @packageDocumentation
 * @module call-thru
 */
import { CallChain } from './call-chain';
import { noop } from './misc';
import { isNextCall, NextCall__symbol } from './next-call';
import Args = CallChain.Args;
import Out = CallChain.Out;
import CanSkip = CallChain.CanSkip;

/**
 * Constructs a function that invokes a call chain.
 *
 * Each pass in this chain is a function accepting argument(s) passed from the previous one.
 *
 * The value returned from the pass is treated the following way:
 *
 * - When a [[NextCall]] is returned, this instance is used to perform the class of the next pass.
 * - When plain value returned, this value is passed to the next function as the only argument.
 * - When a [[NextCall]] returned by the last pass, it is used to construct the outcome.
 * - When a plain value returned by the last pass, it is used as outcome.
 * - When the last pass in chain is never called an `undefined` (when [[nextSkip]] applied), or predefined value
 *   (when [[nextReturn]] applied) is returned.
 *
 * A [[NextCall]] instance returned the pass is responsible for next function call and may modify the call outcome.
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
    pass1: (this: void, ...args1: Args1) => Return1,
    pass2: (this: void, ...args2: Args2) => Return2,
): (this: void, ...args1: Args1) => Out<Return2, CanSkip<Return1>>;

export function callThru<
    Args1 extends any[], Return1,
    Args2 extends Args<Return1>, Return2,
    Args3 extends Args<Return2>, Return3,
    >(
    pass1: (this: void, ...args1: Args1) => Return1,
    pass2: (this: void, ...args2: Args2) => Return2,
    pass3: (this: void, ...args3: Args3) => Return3,
): (this: void, ...args1: Args1) => Out<Return3, CanSkip<Return2, CanSkip<Return1>>>;

export function callThru(
    ...passes: ((...args: any[]) => any)[]
): (...args: any[]) => any {
  return (...args) => {

    let result: any;
    const chain = (index: number): CallChain => {

      const lastPass = index >= passes.length;

      ++index;

      const pass = index < passes.length ? passes[index] : noop;
      const handleResult = (callResult: any, arg: any): void => {
        if (isNextCall(callResult)) {
          callResult[NextCall__symbol](chain(index), pass);
        } else if (lastPass) {
          result = arg;
        } else {
          chain(index).pass(pass, callResult);
        }
      };

      return ({
        call<A extends any[]>(fn: (...args: A) => void, args: A): void {
          handleResult(fn(...args), args);
        },
        pass<A>(fn: (arg: A) => void, arg: A): void {
          handleResult(fn(arg), arg);
        },
        skip(r?: any): void {
          result = r;
        },
      });
    };

    chain(0).call(passes[0], args);

    return result;
  };
}
