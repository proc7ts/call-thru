import { nextCall, NextCall } from '../next-call';

/**
 * Constructs arguments to the next function call.
 *
 * @param args Next function call arguments.
 *
 * @return A next function call with the given arguments.
 */
export function nextArgs<NextArgs extends any[], NextReturn>(...args: NextArgs):
    NextCall<'default', NextArgs, NextReturn, NextReturn, NextArgs> {
  return nextCall(callee => callee.apply(null, args), () => args);
}
