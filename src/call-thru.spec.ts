import { callThru } from './call-thru';
import { nextArgs, passAsync, passIf } from './passes';

describe('callThru', () => {

  it('calls a single function', () => {

    const fn = jasmine.createSpy('fn').and.returnValue('result');

    expect(callThru(fn)('arg1', 'arg2')).toBe('result');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
  it('chains 2 functions', () => {

    const fn1 = jasmine.createSpy('fn1').and.returnValue('arg3');
    const fn2 = jasmine.createSpy('fn2').and.returnValue('result');

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
  describe('Combining', () => {
    it('combines`async` then `if`', async () => {

      const fn: (a: number, b: number) => Promise<string | undefined> = callThru(
          passAsync(),
          passIf((a: number, b: number) => a < b),
          () => 'ok',
      );

      expect(await fn(1, 2)).toBe('ok');
      expect(await fn(2, 1)).toBeUndefined();
    });
    it('combines `if` then `async`', async () => {

      const fn: (a: number, b: number) => Promise<string> | undefined = callThru(
          passIf((a: number, b: number) => a < b),
          passAsync(),
          () => 'ok',
      );

      expect(await fn(1, 2)).toBe('ok');
      expect(fn(2, 1)).toBeUndefined();
    });
  });
});
