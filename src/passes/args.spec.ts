import { callThru } from '../call-thru';
import { NextCall__symbol } from '../next-call';
import { nextArgs } from './args';
import Mock = jest.Mock;

describe('nextArgs', () => {

  let mockCallee: Mock<string, [string, string, number]>;

  beforeEach(() => {
    mockCallee = jest.fn((_arg0, _arg1, _arg2) => 'result');
  });

  it('calls the callee with the given arguments', () => {
    expect(nextArgs('a', 'b', 3)[NextCall__symbol](mockCallee)).toBe('result');
    expect(mockCallee).toHaveBeenCalledWith('a', 'b', 3);
  });
  it('replaces arguments when chained', () => {
    expect(callThru(
        nextArgs('a', 'b', 3),
        mockCallee,
    )()).toBe('result');
    expect(mockCallee).toHaveBeenCalledWith('a', 'b', 3);
  });
  it('returns arguments when last', () => {
    expect(callThru(nextArgs('a', true, 9))()).toEqual(['a', true, 9]);
  });
  it('returns arguments when returned by last pass', () => {
    expect(callThru((a: string) => nextArgs(a, true, 9))('a')).toEqual(['a', true, 9]);
  });
});
