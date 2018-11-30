import { callThru } from '../call-thru';
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
    expect([
      ...callThru(
          nextEach([
            nextArgs(1, 2),
            nextArgs(3, 4),
          ]),
          (a, b) => a + b,
      )()
    ]).toEqual([3, 7]);
  });
  it('returns an iterable of last outcomes when returned from the last pass', () => {
    expect([
      ...callThru(
          nextEach([
            nextArgs(1, 2),
            nextArgs(3, 4),
          ]))()
    ]).toEqual([[1, 2], [3, 4]]);
  });
  it('excludes the skipped items', () => {
    expect([
      ...callThru(
          nextEach([1, 2, 3]),
          n => n + 1,
          passIf(n => n > 2),
      )()
    ]).toEqual([3, 4]);
  });
});
