import { NextCall } from './next-call';
import { NextSkip } from './passes';

/**
 * A call chain.
 *
 * This is passed to {@link NextCall} to perform the call.
 */
export interface CallChain {

  /**
   * Calls a pass in this chain with the given arguments.
   *
   * When this is called for the last pass, the final result would be an `args` tuple.
   *
   * @typeParam TArgs - Pass arguments tuple type.
   * @param pass - A pass to call.
   * @param args - An array of arguments for the call.
   */
  call<TArgs extends any[]>(
      pass: (this: void, ...args: TArgs) => any,
      args: TArgs,
  ): void;

  /**
   * Calls a pass in this chain with the given argument.
   *
   * When this is called for the last pass, the final result would be `arg`.
   *
   * @typeParam TArgs - Pass argument type.
   * @param pass - A pass to call.
   * @param arg - Single argument for the call.
   */
  pass<TArg>(
      pass: (this: void, arg: TArg) => any,
      arg: TArg,
  ): void;

  /**
   * Skips the rest of the passes.
   *
   * @param result - Call chain result.
   */
  skip(result?: unknown): void;

}

export namespace CallChain {

  export type Args<TReturn> = TReturn extends NextSkip<any>
      ? never
      : (TReturn extends (NextCall<any, infer TNextArgs, any>)
          ? TNextArgs
          : [TReturn]);

  export type OrSkip<TReturn, TOr = never> =
      | (TReturn extends NextSkip<infer TResult> ? TResult : never)
      | TOr;

  export type Out<TReturn, TOr = never> =
      | (TReturn extends NextCall<any, any, infer TNextArg> ? TNextArg : TReturn)
      | TOr;

}
