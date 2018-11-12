import { Args } from './args';
import { callThru } from './call-thru';
import Spy = jasmine.Spy;

describe('callThru', () => {

  let defaultThis: any;
  let thisArg: { name: string };

  beforeEach(() => {
    // A trick to detect the default `this` argument, as Jasmine substitutes its own.
    jasmine.createSpy('test').and.callFake(function (this: any) { defaultThis = this; }).call(undefined);
    thisArg = { name: 'this' };
  });

  it('calls a single function', () => {

    const fn: Spy & ((arg1: string, arg2: string) => string) = jasmine.createSpy('fn').and.returnValue('result');

    expect(callThru(fn)('arg1', 'arg2')).toBe('result');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn.calls.first().object).toBe(defaultThis);
  });
  it('chains functions', () => {

    const fn1: Spy & ((arg1: string, arg2: string) => string) = jasmine.createSpy('fn').and.returnValue('arg3');
    const fn2: Spy & ((arg1: string) => string) = jasmine.createSpy('fn').and.returnValue('result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn1.calls.first().object).toBe(defaultThis);
    expect(fn2).toHaveBeenCalledWith('arg3');
    expect(fn2.calls.first().object).toBe(defaultThis);
  });
  it('chains functions with more than one argument', () => {

    const fn1: Spy & ((arg1: string, arg2: string) => Args<typeof thisArg, [string, string], string>) =
        jasmine.createSpy('fn').and.returnValue(Args.withThis(thisArg, 'arg3', 'arg4'));
    const fn2: Spy & ((arg1: string, arg2: string) => string) = jasmine.createSpy('fn').and.returnValue('result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn1.calls.first().object).toBe(defaultThis);
    expect(fn2).toHaveBeenCalledWith('arg3', 'arg4');
    expect(fn2.calls.first().object).toBe(thisArg);
  });
});
