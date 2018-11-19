import { callThru } from '../call-thru';
import { nextEach } from './each';

describe('nextEach', () => {
  it('calls the next chain for each item when chained', () => {
    expect([...callThru(() => nextEach([1, 2, 3]), n => n + 1)()]).toEqual([2, 3, 4]);
  });
  it('calls the next chain for each item when chained', () => {
    expect([...callThru(nextEach([1, 2, 3]), n => n + 1)()]).toEqual([2, 3, 4]);
  });
  it('returns the original iterable when returned from last pass', () => {

    const items = [1, 2, 3];

    expect(callThru(nextEach(items))()).toBe(items);
  });
});
