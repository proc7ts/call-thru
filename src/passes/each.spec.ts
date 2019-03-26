import { callThru } from '../call-thru';
import { PassedThru, PassedThru__symbol } from '../passed-thru';
import { nextArgs } from './args';
import { nextEach } from './each';
import { passIf } from './if';

describe('nextEach', () => {
  it('calls the next pass for each item when chained', () => {
    expect([...callThru(() => nextEach([1, 2, 3]), n => n + 1)()]).toEqual([2, 3, 4]);
  });
  it('calls the next pass for each item when chained', () => {
    expect([...callThru(nextEach([1, 2, 3]), n => n + 1)()]).toEqual([2, 3, 4]);
  });
  it('returns the same items when returned from the last pass', () => {

    const items = [1, 2, 3];

    expect([...callThru(nextEach(items))()]).toEqual(items);
  });
  it('calls the next pass with next call items', () => {

    const outcome: Iterable<number> = callThru(
        nextEach([
          nextArgs(1, 2),
          nextArgs(3, 4),
        ]),
        (a, b) => a + b,
    )();

    expect([...outcome]).toEqual([3, 7]);
  });
  it('builds an iterable of last outcomes when returned from the last pass', () => {

    const outcome: Iterable<[number, number]> = callThru(
        nextEach([
          nextArgs(1, 2),
          nextArgs(3, 4),
        ])
    )();

    expect([...outcome]).toEqual([[1, 2], [3, 4]]);
  });
  it('excludes the skipped items', () => {

    const outcome: Iterable<number> = callThru(
        nextEach([1, 2, 3]),
        passIf((n: number) => n > 1),
        n => n + 1,
    )();

    expect([...outcome]).toEqual([3, 4]);
  });
  it('builds an iterable of passed through values when returned from the last pass', () => {

    const passed: PassedThru<string, number> = {
      [PassedThru__symbol]: 'foo',
      * [Symbol.iterator]() { yield 13; }
    };
    const outcome: Iterable<number> = callThru(
        nextEach([
          passed,
        ])
    )();

    expect([...outcome]).toEqual([13]);
  });
});
