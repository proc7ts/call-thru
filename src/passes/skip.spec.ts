import { describe, expect, it } from '@jest/globals';
import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextSkip } from './skip';

describe('nextSkip', () => {
  it('results to `undefined`', () => {
    const result: undefined = callThru(nextSkip())();

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used as a pass', () => {
    const result: undefined = callThru(nextSkip)();

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used in the middle of call chain', () => {
    const result: string | undefined = callThru(
      (str: string) => `${str}!`,
      _str => nextSkip(),
      (str: string) => `${str}!!`,
    )('foo');

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used in condition', () => {
    const fn = callThru(
      (str: string) => `${str}!`,
      (str: string) => (str.length > 3 ? nextArgs(str) : nextSkip),
      (str: string) => `${str}!!`,
    );
    const result1: string | undefined = fn('foo');
    const result2: string | undefined = fn('fo');

    expect(result1).toBe('foo!!!');
    expect(result2).toBeUndefined();
  });
});
