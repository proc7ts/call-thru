import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextSkip } from './skip';

describe('nextSkip', () => {
  it('results to `undefined`', () => {

    const result: undefined = callThru(nextSkip())();

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used as a pass', () => {

    const result: undefined = callThru(nextSkip)();

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used in the middle of call chain', () => {

    const result: string | undefined = callThru(
        str => str + '!',
        _str => nextSkip(),
        str => str + '!!',
    )('foo');

    expect(result).toBeUndefined();
  });
  it('results to `undefined` when used in condition', () => {

    const fn = callThru(
        str => str + '!',
        (str: string) => str.length > 3 ? nextArgs(str) : nextSkip,
        (str: string) => str + '!!',
    );

    expect(fn('foo')).toBe('foo!!!');
    expect(fn('fo')).toBeUndefined();
  });
});
