import { nextCall, NextCall } from '../next-call';

/**
 * Constructs arguments to the next function call.
 *
 * The `this` argument of constructed function is void.
 *
 * @param args Next function call arguments.
 *
 * @return A next function call with the given arguments.
 */
export function nextArgs<NextArgs extends any[], NextReturn, Out>(...args: NextArgs):
    NextCall<'default', void, NextArgs, NextReturn, Out> {
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
export function nextThisAndArgs<This, Arguments extends any[], NextReturn>(
    thisArg: This,
    ...args: Arguments):
    NextCall<'default', This, Arguments, NextReturn> {
  return nextCall(callee => callee.apply(thisArg, args));
}
