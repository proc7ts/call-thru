import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { nextTuple } from './tuple';

describe('nextTuple', () => {
  it('passes arguments to the next function in chain', () => {

    let result: string[] = [];
    const expected = ['a', 'b', 'c'];

    expect(callThru(
        nextTuple(),
        (arg: string[]) => { result = arg; },
    )('a', 'b', 'c')).toEqual(expected);

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
});
