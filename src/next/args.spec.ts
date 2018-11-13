import Spy = jasmine.Spy;
import { callThru } from '../call-thru';
import { NextCall } from '../next-call';
import { nextArgs, nextThisAndArgs } from './args';

describe('Next args', () => {

  let calleeSpy: Spy;
  let defaultThis: any;

  beforeEach(() => {
    calleeSpy = jasmine.createSpy('callee').and.returnValue('result');
    // A trick to detect the default `this` argument, as Jasmine substitutes its own.
    jasmine.createSpy('test').and.callFake(function (this: any) { defaultThis = this; }).call(undefined);
  });

  describe('nextArgs', () => {
    it('calls the callee with the given arguments', () => {
      expect(nextArgs('a', 'b', 3)[NextCall.call](calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(defaultThis);
    });
    it('replaces arguments when chained', () => {
      expect(callThru(
          nextArgs('a', 'b', 3),
          calleeSpy,
      )()).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(defaultThis);
    });
  });
  describe('nextThisAndArgs', () => {

    let thisArg: any;

    beforeEach(() => {
      thisArg = { name: 'this' };
    });
    it('calls the callee with the given arguments', () => {
      expect(nextThisAndArgs(thisArg, 'a', 'b', 3)[NextCall.call](calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(thisArg);
    });
    it('replaces arguments when chained', () => {
      expect(callThru(
          nextThisAndArgs(thisArg, 'a', 'b', 3),
          calleeSpy,
      )()).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(thisArg);
    });
  });
});
