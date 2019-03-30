import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextEach } from './each';
import { passFlat } from './flat';
import { passIf } from './if';

describe('passFlat', () => {
  it('flattens the next iterable', () => {

    const outcome: Iterable<string> = callThru(
        passFlat(),
        nextEach([1, 2]),
        (n: number) => Array<string>(n).fill(`${n}`),
    )();

    expect([...outcome]).toEqual(['1', '2', '2']);
  });
  it('returns an empty array when used as last pass', () => {
    expect(callThru(passFlat())()).toEqual([]);
  });
  it('filters the next iterable', () => {

    const outcome: Iterable<string> = callThru(
        passFlat(),
        nextEach([1, 2, 3]),
        passIf(n => n > 1),
        (n: number) => Array<string>(n).fill(`${n}`),
    )();

    expect([...outcome]).toEqual(['2', '2', '3', '3', '3']);
  });
  it('handles simple iterable', () => {

    const outcome: Iterable<number> = callThru(
        passFlat(),
        nextArgs(1, 2),
    )();

    expect([...outcome]).toEqual([1, 2]);
  });
  it('handles non-iterable', () => {

    const outcome: Iterable<number> = callThru(
        passFlat(),
        () => 1,
    )();

    expect([...outcome]).toEqual([1]);
  });
});
