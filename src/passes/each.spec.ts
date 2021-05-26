import { describe, expect, it } from '@jest/globals';
import { callThru } from '../call-thru';
import { nextEach } from './each';

describe('nextEach', () => {
  it('passes each element', () => {

    const result: number[] = [];

    callThru(
        nextEach([1, 2, 3]),
        arg => result.push(arg),
    )();

    expect(result).toEqual([1, 2, 3]);
  });
  it('returns the last element', () => {

    const result: number = callThru(
        nextEach([1, 2, 3]),
    )();

    expect(result).toEqual(3);
  });
});
