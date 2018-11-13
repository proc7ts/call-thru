import { callThru } from '../call-thru';
import { thruIf } from './if';

describe('thruIf', () => {
  it('returns arguments when test passed', () => {
    expect(callThru(thruIf((a: number, b: number) => a < b))(1, 2)).toBe(1);
  });
  it('returns undefined when test failed', () => {
    expect(callThru(thruIf((a: number, b: number) => a > b))(1, 2)).toBeUndefined();
  });
});
