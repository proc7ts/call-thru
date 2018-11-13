import { nextCall, NextCall } from '../next-call';

/**
 * Constructs a pass that extracts arguments as tuple and passes this tuple to the next function in chain.
 *
 * When used as a last function in chain the outcome of the function chain will be the last arguments tuple.
 */
export function passTuple<NextArgs extends any[]>():
    (this: void, ...args: NextArgs) => NextCall<'default', void, [NextArgs], any> {
  return (...args: NextArgs) => nextCall(callee => {
    return callee(args);
  });
}
