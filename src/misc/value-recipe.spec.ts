import { valueProvider } from './value-providers';
import { valueByRecipe, valueRecipe, ValueRecipe } from './value-recipe';

describe('valueByRecipe', () => {

  let value: string;
  let arg1: number;
  let arg2: string;

  beforeEach(() => {
    value = 'test';
    arg1 = 13;
    arg2 = 'arg2';
  });

  it('retains raw value', () => {
    expect(valueByRecipe(value, arg1, arg2)).toBe(value);
  });
  it('evaluates value', () => {

    const recipe: ValueRecipe<string, [number, string]> = jest.fn(() => value);

    expect(valueByRecipe(recipe, arg1, arg2)).toBe(value);
    expect(recipe).toHaveBeenCalledWith(arg1, arg2);
  });
});

describe('valueRecipe', () => {

  it('retains the recipe as-is', () => {

    const recipe: ValueRecipe<string> = valueProvider('test');

    expect(valueRecipe(recipe)).toBe(recipe);
  });
  it('converts value to its evaluator', () => {

    const value = 'test';

    expect(valueRecipe(value)()).toBe(value);
  });
});
