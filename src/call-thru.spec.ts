import { callThru } from './call-thru';

describe('callThru', () => {
  it('returns the result of single pass', () => {

    const result: string = callThru((a: string) => a + '!')('foo');

    expect(result).toBe('foo!');
  });
  it('returns the result of the last pass', () => {

    const result: string = callThru(
        (a: number, b: number) => a + b,
        sum => `${sum}!`,
    )(5, 8);

    expect(result).toBe('13!');
  });
});
