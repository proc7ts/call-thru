import { callThru } from './call-thru';
import { PassedThru, PassedThru__symbol } from './passed-thru';
import { NextArgs, nextArgs, passAsync, passIf } from './passes';

describe('callThru', () => {
  it('calls a single function', () => {

    const fn = jest.fn<string, [string, string]>(() => 'result');

    expect(callThru(fn)('arg1', 'arg2')).toBe('result');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
  it('chains 2 functions', () => {

    const fn1 = jest.fn<string, [string, string]>(() => 'arg3');
    const fn2 = jest.fn<string, [string]>(() => 'result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('arg3');
  });
  it('chains 3 functions', () => {

    const fn1 = jest.fn<'a' | 'b', [string, string]>(() => 'a');
    const fn2 = jest.fn<number, ['a' | 'b' | 'c']>(() => 1);
    const fn3 = jest.fn<string, [number]>(() => 'result3');

    expect(callThru(fn1, fn2, fn3)('arg1', 'arg2')).toBe('result3');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('a');
    expect(fn3).toHaveBeenCalledWith(1);
  });
  it('chains functions with more than one argument', () => {

    const fn1 = jest.fn<NextArgs<[boolean, string], string>, [string, string]>(() => nextArgs(false, 'arg4'));
    const fn2 = jest.fn<string, [boolean, string]>(() => 'result');

    expect(callThru(fn1, fn2)('arg1', 'arg2')).toBe('result');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith(false, 'arg4');
  });
  it('extracts the passed through value', () => {

    // noinspection JSMismatchedCollectionQueryUpdate
    const passed: PassedThru<string, number> = {
      [PassedThru__symbol]: 'foo',
      * [Symbol.iterator]() { yield 13; }
    };
    const outcome: string = callThru(() => passed)();

    expect(outcome).toBe('foo');
  });
  describe('Combining', () => {
    it('combines `async` then `if`', async () => {

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
