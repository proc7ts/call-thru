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
export function callThru<TArgs1 extends any[], TReturn1>(
  pass1: (this: void, ...args1: TArgs1) => TReturn1,
): (this: void, ...args1: TArgs1) => Out<TReturn1>;

export function callThru<TArgs1 extends any[], TReturn1, TArgs2 extends Args<TReturn1>, TReturn2>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
): (this: void, ...args1: TArgs1) => Out<TReturn2, OrSkip<TReturn1>>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
): (this: void, ...args1: TArgs1) => Out<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn2>,
  TReturn4,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
): (
  this: void,
  ...args1: TArgs1
) => Out<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
): (
  this: void,
  ...args1: TArgs1
) => Out<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs5) => TReturn6,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn6,
  OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn7,
  OrSkip<
    TReturn6,
    OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn8,
  OrSkip<
    TReturn7,
    OrSkip<
      TReturn6,
      OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
    >
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
  TArgs9 extends Args<TReturn8>,
  TReturn9,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
  pass9: (this: void, ...args: TArgs9) => TReturn9,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn9,
  OrSkip<
    TReturn8,
    OrSkip<
      TReturn7,
      OrSkip<
        TReturn6,
        OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
      >
    >
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
  TArgs9 extends Args<TReturn8>,
  TReturn9,
  TArgs10 extends Args<TReturn9>,
  TReturn10,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
  pass9: (this: void, ...args: TArgs9) => TReturn9,
  pass10: (this: void, ...args: TArgs10) => TReturn10,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn10,
  OrSkip<
    TReturn9,
    OrSkip<
      TReturn8,
      OrSkip<
        TReturn7,
        OrSkip<
          TReturn6,
          OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
        >
      >
    >
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
  TArgs9 extends Args<TReturn8>,
  TReturn9,
  TArgs10 extends Args<TReturn9>,
  TReturn10,
  TArgs11 extends Args<TReturn10>,
  TReturn11,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
  pass9: (this: void, ...args: TArgs9) => TReturn9,
  pass10: (this: void, ...args: TArgs10) => TReturn10,
  pass11: (this: void, ...args: TArgs11) => TReturn11,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn11,
  OrSkip<
    TReturn10,
    OrSkip<
      TReturn9,
      OrSkip<
        TReturn8,
        OrSkip<
          TReturn7,
          OrSkip<
            TReturn6,
            OrSkip<TReturn5, OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>>
          >
        >
      >
    >
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
  TArgs9 extends Args<TReturn8>,
  TReturn9,
  TArgs10 extends Args<TReturn9>,
  TReturn10,
  TArgs11 extends Args<TReturn10>,
  TReturn11,
  TArgs12 extends Args<TReturn11>,
  TReturn12,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
  pass9: (this: void, ...args: TArgs9) => TReturn9,
  pass10: (this: void, ...args: TArgs10) => TReturn10,
  pass11: (this: void, ...args: TArgs11) => TReturn11,
  pass12: (this: void, ...args: TArgs12) => TReturn12,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn12,
  OrSkip<
    TReturn11,
    OrSkip<
      TReturn10,
      OrSkip<
        TReturn9,
        OrSkip<
          TReturn8,
          OrSkip<
            TReturn7,
            OrSkip<
              TReturn6,
              OrSkip<
                TReturn5,
                OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>
              >
            >
          >
        >
      >
    >
  >
>;

export function callThru<
  TArgs1 extends any[],
  TReturn1,
  TArgs2 extends Args<TReturn1>,
  TReturn2,
  TArgs3 extends Args<TReturn2>,
  TReturn3,
  TArgs4 extends Args<TReturn3>,
  TReturn4,
  TArgs5 extends Args<TReturn4>,
  TReturn5,
  TArgs6 extends Args<TReturn5>,
  TReturn6,
  TArgs7 extends Args<TReturn6>,
  TReturn7,
  TArgs8 extends Args<TReturn7>,
  TReturn8,
  TArgs9 extends Args<TReturn8>,
  TReturn9,
  TArgs10 extends Args<TReturn9>,
  TReturn10,
  TArgs11 extends Args<TReturn10>,
  TReturn11,
  TArgs12 extends Args<TReturn11>,
  TReturn12,
  TArgs13 extends Args<TReturn12>,
  TReturn13,
>(
  pass1: (this: void, ...args: TArgs1) => TReturn1,
  pass2: (this: void, ...args: TArgs2) => TReturn2,
  pass3: (this: void, ...args: TArgs3) => TReturn3,
  pass4: (this: void, ...args: TArgs4) => TReturn4,
  pass5: (this: void, ...args: TArgs5) => TReturn5,
  pass6: (this: void, ...args: TArgs6) => TReturn6,
  pass7: (this: void, ...args: TArgs7) => TReturn7,
  pass8: (this: void, ...args: TArgs8) => TReturn8,
  pass9: (this: void, ...args: TArgs9) => TReturn9,
  pass10: (this: void, ...args: TArgs10) => TReturn10,
  pass11: (this: void, ...args: TArgs11) => TReturn11,
  pass12: (this: void, ...args: TArgs12) => TReturn12,
  pass13: (this: void, ...args: TArgs13) => TReturn13,
): (
  this: void,
  ...args1: TArgs1
) => Out<
  TReturn13,
  OrSkip<
    TReturn12,
    OrSkip<
      TReturn11,
      OrSkip<
        TReturn10,
        OrSkip<
          TReturn9,
          OrSkip<
            TReturn8,
            OrSkip<
              TReturn7,
              OrSkip<
                TReturn6,
                OrSkip<
                  TReturn5,
                  OrSkip<TReturn4, OrSkip<TReturn3, OrSkip<TReturn2, OrSkip<TReturn1>>>>
                >
              >
            >
          >
        >
      >
    >
  >
>;

export function callThru(
  ...passes: ((...args: unknown[]) => any)[]
): (...args: unknown[]) => unknown {
  return (...args): unknown => {
    let result: unknown;
    const chain = (index: number): CallChain => {
      const lastPass = index >= passes.length;

      ++index;

      const pass = index < passes.length ? passes[index] : callThru$noop;
      const handleResult = (callResult: unknown, arg: unknown): void => {
        if (isNextCall(callResult)) {
          callResult[NextCall__symbol](chain(index), pass);
        } else if (lastPass) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          result = arg;
        } else {
          chain(index).pass(pass, callResult);
        }
      };

      return {
        call<TArgs extends any[]>(fn: (...args: TArgs) => any, args: TArgs): void {
          handleResult(fn(...args), args);
        },
        pass<TArg>(fn: (arg: TArg) => any, arg: TArg): void {
          handleResult(fn(arg), arg);
        },
        skip(r?: unknown): void {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          result = r;
        },
      };
    };

    chain(0).call(passes[0], args);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}

/**
 * @internal
 */
function callThru$noop(..._args: unknown[]): void {
  /* noop */
}
