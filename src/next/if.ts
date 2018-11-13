import { nextCall, NextCall } from '../next-call';
import { nextSkip } from './skip';

export function nextIf<NextArgs extends any[], NextReturn, Out = NextReturn>(
    test: (...args: NextArgs) => boolean):
    (this: void, ...args: NextArgs) => NextCall<void, NextArgs, NextReturn, NextReturn | undefined> {
  return (...args: NextArgs) => {
    return test.apply(null, args) ? nextCall(callee => callee(...args)) : nextSkip();
  };
}
