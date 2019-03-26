import { valueProvider, valuesCloner, valuesProvider } from './value-providers';

describe('valueProvider', () => {
  it('always returns its argument', () => {
    expect(valueProvider('abc')()).toBe('abc');
  });
});

describe('valuesProvider', () => {
  it('always returns its arguments', () => {
    expect(valuesProvider('abc', 3)()).toEqual(['abc', 3]);
  });
  it('always returns the same tuple', () => {

    const provider = valuesProvider('foo', 'bar');

    expect(provider()).toBe(provider());
  });
});

describe('valuesCloner', () => {
  it('always returns its arguments', () => {
    expect(valuesCloner('abc', 3)()).toEqual(['abc', 3]);
  });
  it('always returns the same tuple', () => {

    const cloner = valuesCloner('foo', 'bar');

    expect(cloner()).not.toBe(cloner());
  });
});
