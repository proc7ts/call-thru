import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextFlatEach } from './flat-each';

describe('nextFlatEach', () => {
  it('flattens the next iterable', () => {
    expect([
      ...callThru(
        nextFlatEach([1, 2, 3]),
        n => Array<string>(n).fill(`${n}`),
    )()
    ]).toEqual(['1', '2', '2', '3', '3', '3']);
  });
  it('returns the same items when returned from the last pass', () => {

    const items = [1, 2, 3];

    expect([...callThru(nextFlatEach(items))()]).toEqual(items);
  });
  it('flattens the next iterable with next call items', () => {
    expect([
      ...callThru(
          nextFlatEach([nextArgs(0, 2), nextArgs(1, 3)]),
          (a, b) => Array<string>(a + b).fill(`${a + b}`),
      )()
    ]).toEqual(['2', '2', '4', '4', '4', '4']);
  });
  it('returns an iterable of last outcomes when returned from the last pass', () => {
    expect([
      ...callThru(
          nextFlatEach([
            nextArgs(1, 2),
            nextArgs(3, 4),
          ]))()
    ]).toEqual([[1, 2], [3, 4]]);
  });
});
