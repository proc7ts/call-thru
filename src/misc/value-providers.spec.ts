import { lazyValue, valueProvider, valuesCloner, valuesProvider } from './value-providers';

describe('valueProvider', () => {
  it('always returns its argument', () => {
    expect(valueProvider('abc')()).toBe('abc');
  });
});

describe('lazyValue', () => {

  let provider: jest.Mock<string>;
  let lazy: () => string;

  beforeEach(() => {
    provider = jest.fn(() => 'test');
    lazy = lazyValue(provider);
  });

  it('does not call provider until requested', () => {
    expect(provider).not.toHaveBeenCalled();
  });
  it('evaluates the value when called', () => {
    expect(lazy()).toBe('test');
    expect(provider).toHaveBeenCalledTimes(1);
  });
  it('does not re-evaluate the value', () => {
    lazy();
    provider.mockImplementation(() => 'other');
    expect(lazy()).toBe('test');
    expect(provider).toHaveBeenCalledTimes(1);
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
