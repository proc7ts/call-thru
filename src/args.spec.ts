import { Args } from './args';
import Spy = jasmine.Spy;

describe('Args', () => {

  let calleeSpy: Spy;
  let defaultThis: any;

  beforeEach(() => {
    calleeSpy = jasmine.createSpy('callee').and.returnValue('result');
    // A trick to detect the default `this` argument, as Jasmine substitutes its own.
    jasmine.createSpy('test').and.callFake(function (this: any) { defaultThis = this; }).call(undefined);
  });

  describe('of', () => {
    it('calls the callee with the given arguments', () => {
      expect(Args.of('a', 'b', 3)(calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(defaultThis);
    });
  });
  describe('withThis', () => {

    let thisArg: any;

    beforeEach(() => {
      thisArg = { name: 'this' };
    });
    it('calls the callee with the given arguments', () => {
      expect(Args.withThis(thisArg, 'a', 'b', 3)(calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('a', 'b', 3);
      expect(calleeSpy.calls.first().object).toBe(thisArg);
    });
  });
});
