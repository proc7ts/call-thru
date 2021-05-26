import { describe, expect, it } from '@jest/globals';
import { callThru } from '../call-thru';
import { nextArg } from './arg';

describe('nextArg', () => {
  it('passes argument to the next pass', () => {

    const result: number = callThru(
        nextArg(2),
        n => n * n,
    )();

    expect(result).toBe(4);
  });
  it('returns single value from the last pass', () => {

    const result: number = callThru(
        () => nextArg(2),
    )();

    expect(result).toBe(2);
  });
});
