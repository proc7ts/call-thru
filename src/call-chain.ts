/**
 * @packageDocumentation
 * @module call-thru
 */
import { NextCall } from './next-call';
import { NextSkip } from './passes';

/**
 * A call chain.
 *
 * This is passed to [[NextCall]] to perform the call.
 */
export interface CallChain {

  /**
   * Calls a pass in this chain with the given arguments.
   *
   * When this is called for the last pass, the final result would be `args`.
   *
   * @typeparam Args  Pass arguments tuple type.
   * @typeparam Return Pass return type.
   * @param pass  A pass to call.
   * @param args  An array of arguments for the call.
   */
  call<Args extends any[], Return>(
      pass: (this: void, ...args: Args) => Return,
      args: Args,
  ): void;

  /**
   * Call a pass in this chain with the given argument.
   *
   * When this is called for the last pass, the final result would be `arg`.
   *
   * @typeparam Args  Pass argument type.
   * @typeparam Return Pass return type.
   * @param pass  A pass to call.
   * @param arg  Single argument for the call.
   */
  pass<Arg, Return>(
      pass: (this: void, arg: Arg) => Return,
      arg: Arg,
  ): void;

}

export namespace CallChain {

  export type Args<Return> = Return extends NextSkip<any>
      ? never
      : (Return extends (NextCall<any, any, infer A, any>)
          ? A
          : [Return]);

  export type CanSkip<Return, Or = never> =
      (Return extends NextSkip<infer R> ? R : never) | Or;

  export type Out<Return, Or = never> =
      (Return extends NextCall<any, any, any, infer A> ? A : Return) | Or;

}
