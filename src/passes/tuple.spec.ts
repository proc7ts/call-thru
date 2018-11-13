import { callThru } from '../call-thru';
import { nextArgs } from './args';
import { passTuple } from './tuple';

describe('passTuple', () => {
  it('passes arguments to the next function in chain', () => {

    let result: string[] = [];
    const expected = ['a', 'b', 'c'];

    expect(callThru(
        passTuple(),
        (arg: string[]) => result = arg,
        () => 9,
    )('a', 'b', 'c')).toEqual(9);

    expect(result).toEqual(expected);
  });
  it('extracts arguments tuple', () => {
    expect(callThru(passTuple())('a', 2, false)).toEqual(['a', 2, false]);
  });
  it('extracts replaced arguments tuple', () => {
    expect(callThru(
        nextArgs('a', 'b'),
        nextArgs('arg1', 'arg2', 'arg3'),
        passTuple(),
    )()).toEqual(['arg1', 'arg2', 'arg3']);
  });
  it('does not replace later outcome', () => {
    expect(callThru(
        passTuple(),
        nextArgs('a', 'b', 'c'),
    )(1, 2)).toEqual('a');
  });
});
