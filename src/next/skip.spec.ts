import { callThru } from '../call-thru';
import { nextSkip } from './skip';

describe('nextSkip()', () => {
  it('has undefined outcome', () => {
    expect(callThru(nextSkip())()).toBeUndefined();
  });
  it('has undefined outcome when chained', () => {
    expect(callThru(nextSkip())()).toBeUndefined();
  });
  it('prevents subsequent functions from being called', () => {

    const nextSpy = jasmine.createSpy('next');

    expect(callThru(() => nextSkip(), nextSpy)()).toBeUndefined();
    expect(nextSpy).not.toHaveBeenCalled();
  });
  it('prevents subsequent functions from being called when chained', () => {

    const nextSpy = jasmine.createSpy('next');

    expect(callThru(nextSkip(), nextSpy)()).toBeUndefined();
    expect(nextSpy).not.toHaveBeenCalled();
  });
});
