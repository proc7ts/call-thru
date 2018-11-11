import { Args } from './args';
import Spy = jasmine.Spy;

describe('Args', () => {

  let defaultThis: any;

  beforeEach(() => {
    // A trick to detect the default `this` argument, as Jasmine substitutes its own.
    jasmine.createSpy('test').and.callFake(function (this: any) { defaultThis = this; }).call(undefined);
  });

  describe('is', () => {
    it('detects empty arguments', () => {
      expect(Args.is(Args.of())).toBe(true);
    });
    it('detects arguments', () => {
      expect(Args.is(Args.of(1, 'foo', []))).toBe(true);
    });
    it('rejects arbitrary tuples', () => {
      expect(Args.is([1, 'foo', []])).toBe(false);
    });
    it('rejects arbitrary values', () => {
      expect(Args.is(1)).toBe(false);
    });
  });
  describe('invoke', () => {

    let thisArg: any;
    let spy: Spy;

    beforeEach(() => {
       thisArg = { name: 'this' };
       spy = jasmine.createSpy('fn').and.returnValue('result');
    });
    it('calls function with arbitrary argument', () => {
      expect(Args.invoke(spy, 'some')).toBe('result');
      expect(spy).toHaveBeenCalledWith('some');
      expect(spy.calls.first().object).toBe(defaultThis);
    });
    it('calls a function with arguments', () => {
      expect(Args.invoke(spy, Args.of('first', 'second')));
      expect(spy).toHaveBeenCalledWith('first', 'second');
      expect(spy.calls.first().object).toBe(defaultThis);
    });
    it('calls a function with this argument', () => {
      expect(Args.invoke(spy, Args.of('first', 'second').withThis(thisArg)));
      expect(spy).toHaveBeenCalledWith('first', 'second');
      expect(spy.calls.first().object).toBe(thisArg);
    });
  });
});
