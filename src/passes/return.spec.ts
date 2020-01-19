import { callThru } from '../call-thru';
import { nextReturn } from './return';

describe('nextReturn', () => {
  it('returns provided value when used as a result', () => {
    expect(callThru((val: number) => nextReturn(val))(13)).toBe(13);
  });
  it('returns provided value when used as a pass', () => {
    expect(callThru(nextReturn(13))()).toBe(13);
  });
  it('ignores the rest of the passes', () => {
    expect(callThru(nextReturn(13), () => 'bar')()).toBe(13);
  });
});
