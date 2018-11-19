import { nextCall, NextCall } from '../next-call';

/**
 * Constructs arguments for the next function call.
 *
 * When returned from the lass pass, the outcome will contain a tuple containing `args`.
 *
 * @param args Next function call arguments.
 *
 * @return A next function call with the given arguments.
 */
export function nextArgs<NextArgs extends any[], NextReturn>(...args: NextArgs):
    NextCall<'default', NextArgs, NextReturn, NextReturn, NextArgs> {
  return nextCall(callee => callee.apply(null, args), () => args);
}
