import { callThru } from '../call-thru';
import { nextIf } from './if';

describe('nextIf', () => {
  it('returns arguments when test passed', () => {
    expect(callThru(nextIf((a: number, b: number) => a < b))(1, 2)).toBe(1);
  });
  it('returns undefined when test failed', () => {
    expect(callThru(nextIf((a: number, b: number) => a > b))(1, 2)).toBeUndefined();
  });
});
