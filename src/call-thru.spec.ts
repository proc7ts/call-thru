import { callThru } from './call-thru';
import { nextArgs } from './passes';
import Spy = jasmine.Spy;

describe('callThru', () => {

  it('calls a single function', () => {

    const fn: Spy & ((arg1: string, arg2: string) => string) = jasmine.createSpy('fn').and.returnValue('result');

    expect(callThru(fn)('arg1', 'arg2')).toBe('result');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
  it('chains 2 functions', () => {

    const fn1: Spy & ((arg1: string, arg2: string) => string) = jasmine.createSpy('fn1').and.returnValue('arg3');
    const fn2: Spy & ((arg1: string) => string) = jasmine.createSpy('fn2').and.returnValue('result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('arg3');
  });
  it('chains 3 functions', () => {

    const fn1 = jasmine.createSpy('fn1').and.returnValue('result1');
    const fn2 = jasmine.createSpy('fn2').and.returnValue('result2');
    const fn3 = jasmine.createSpy('fn3').and.returnValue('result3');

    expect(callThru(fn1, fn2, fn3)('arg1', 'arg2')).toBe('result3');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('result1');
    expect(fn3).toHaveBeenCalledWith('result2');
  });
  it('chains functions with more than one argument', () => {

    const fn1 = jasmine.createSpy('fn1').and.returnValue(nextArgs('arg3', 'arg4'));
    const fn2 = jasmine.createSpy('fn2').and.returnValue('result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('arg3', 'arg4');
  });
});
