import { callThru } from '../call-thru';
import { nextEach } from './each';
import { passFlat } from './flat';

describe('passFlat', () => {
  it('flattens the next iterable', () => {
    expect([
      ...callThru(
          passFlat(),
          nextEach([1, 2]),
          n => Array<string>(n).fill(`${n}`),
      )(),
    ]).toEqual(['1', '2', '2']);
  });
  it('returns an empty array when used as last pass', () => {
    expect(callThru(passFlat())()).toEqual([]);
  });
});
