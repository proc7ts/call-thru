import { callThru } from '../call-thru';
import { nextArgs } from './args';

describe('nextArgs', () => {
  it('calls next pass with the given args', () => {

    const result: string | undefined = callThru(
        (value: number) => nextArgs<[string, number]>(String(value), value),
        (item: string, num: number) => new Array<string>(num).fill(item),
        array => array.join(''),
    )(5);

    expect(result).toBe('55555');
  });
  it('returns a tuple from the last pass', () => {

    const result: [string, number] | undefined = callThru(
        str => nextArgs(str, str.length),
    )('foo');

    expect(result).toEqual(['foo', 3]);
  });
  it('can be used as a pass itself', () => {

    const result: [string, string] | undefined = callThru(
        nextArgs('foo', 'bar'),
    )();

    expect(result).toEqual(['foo', 'bar']);
  });
});
