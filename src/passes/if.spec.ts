import { callThru } from '../call-thru';
import { passIf } from './if';

describe('passIf', () => {
  it('returns arguments when test passed', () => {
    expect(callThru(passIf((a: number, b: number) => a < b))(1, 2)).toBe(1);
  });
  it('returns undefined when test failed', () => {
    expect(callThru(passIf((a: number, b: number) => a > b))(1, 2)).toBeUndefined();
  });
});
