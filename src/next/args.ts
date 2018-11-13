import { nextCall, NextCall } from '../next-call';

/**
 * Constructs arguments to the next function call.
 *
 * The `this` argument of constructed function is void.
 *
 * @param args Call arguments.
 *
 * @return A next function call with the given arguments.
 */
export function nextArgs<Arguments extends any[], Ret, Out>(...args: Arguments): NextCall<void, Arguments, Ret, Out> {
  return nextCall(callee => callee.apply(undefined, args));
}

/**
 * Constructs arguments to the next function call, including `this` argument.
 *
 * @param thisArg `this` argument value.
 * @param args Call arguments.
 *
 * @return A next function call with the given arguments, including `this` one.
 */
export function nextThisAndArgs<This, Arguments extends any[], Return, Out>(thisArg: This, ...args: Arguments):
    NextCall<This, Arguments, Return, Out> {
  return nextCall(callee => callee.apply(thisArg, args));
}
