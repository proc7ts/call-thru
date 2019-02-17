import { callThru } from '../call-thru';
import { nextCallKey } from '../next-call';
import { nextArgs } from './args';
import Mock = jest.Mock;

describe('nextArgs', () => {

  let calleeSpy: Mock<string>;

  beforeEach(() => {
    calleeSpy = jest.fn(() => 'result');
  });

  it('calls the callee with the given arguments', () => {
    expect(nextArgs('a', 'b', 3)[nextCallKey](calleeSpy)).toBe('result');
    expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
  });
  it('replaces arguments when chained', () => {
    expect(callThru(
        nextArgs('a', 'b', 3),
        calleeSpy,
    )()).toBe('result');
    expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
  });
  it('returns arguments when last', () => {
    expect(callThru(nextArgs('a', true, 9))()).toEqual(['a', true, 9]);
  });
  it('returns arguments when returned by last pass', () => {
    expect(callThru((a: string) => nextArgs(a, true, 9))('a')).toEqual(['a', true, 9]);
  });
});
