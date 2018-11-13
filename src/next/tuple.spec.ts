import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextTuple } from './tuple';

describe('nextTuple', () => {
  it('passes arguments to the next function in chain', () => {

    let result: string[] = [];
    const expected = ['a', 'b', 'c'];

    expect(callThru(
        nextTuple(),
        (arg: string[]) => result = arg,
        () => 9,
    )('a', 'b', 'c')).toEqual(9);

    expect(result).toEqual(expected);
  });
  it('extracts arguments tuple', () => {
    expect(callThru(nextTuple())('a', 2, false)).toEqual(['a', 2, false]);
  });
  it('extracts replaced arguments tuple', () => {
    expect(callThru(
        nextArgs('a', 'b'),
        nextArgs('arg1', 'arg2', 'arg3'),
        nextTuple(),
    )()).toEqual(['arg1', 'arg2', 'arg3']);
  });
  it('does not replace later outcome', () => {
    expect(callThru(
        nextTuple(),
        nextArgs('a', 'b', 'c'),
    )(1, 2)).toEqual('a');
  });
});
