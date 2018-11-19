import Spy = jasmine.Spy;
import { callThru } from '../call-thru';
import { NextCall } from '../next-call';
import { nextArgs } from './args';

describe('nextArgs', () => {

  let calleeSpy: Spy;

  beforeEach(() => {
    calleeSpy = jasmine.createSpy('callee').and.returnValue('result');
  });

  it('calls the callee with the given arguments', () => {
    expect(nextArgs('a', 'b', 3)[NextCall.next](calleeSpy)).toBe('result');
    expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
  });
  it('replaces arguments when chained', () => {
    expect(callThru(
        nextArgs('a', 'b', 3),
        calleeSpy,
    )()).toBe('result');
    expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
  });
});
