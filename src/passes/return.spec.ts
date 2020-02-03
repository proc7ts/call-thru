import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextReturn } from './return';

describe('nextReturn', () => {
  it('results to the given value', () => {

    const result: string = callThru(nextReturn('abc'))();

    expect(result).toBe('abc');
  });
  it('results to the given value when used in condition', () => {

    const fn = callThru(
        str => str + '!',
        (str: string) => str.length > 3 ? nextArgs(str) : nextReturn(false),
        (str: string) => str + '!!',
    );

    const result1: string | boolean = fn('foo');
    const result2: string | boolean = fn('fo');

    expect(result1).toBe('foo!!!');
    expect(result2).toBe(false);
  });
});
