/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */

import { valueProvider } from './value-providers';

/**
 * A recipe of value evaluation.
 *
 * This is either a value as-is, or its {@link ValueRecipe.Evaluator evaluator} function.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 */
export type ValueRecipe<T, P extends any[] = []> =
    | T
    | ValueRecipe.Evaluator<T, P>;

export namespace ValueRecipe {

  /**
   * Value evaluator signature.
   *
   * @typeparam T  Evaluated value type. This can not be a function.
   * @typeparam P  A type of parameters tuple required for value evaluation.
   */
  export type Evaluator<T, P extends any[] = []> =
  /**
   * @param args  Parameters required for value evaluation.
   *
   * @returns Evaluated value.
   */
      (this: void, ...args: P) => T;

}

/**
 * @internal
 */
function isValueEvaluator<T, P extends any[]>(
    value: ValueRecipe<T, P>,
): value is ValueRecipe.Evaluator<T, P> {
  return typeof value === 'function';
}

/**
 * Evaluates a value by its recipe.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 * @param recipe  Value evaluation recipe.
 * @param args  Parameters required for value evaluation.
 *
 * @returns Either value itself, or the one evaluated by the given evaluator recipe.
 */
export function valueByRecipe<T, P extends any[]>(
    recipe: ValueRecipe<T, P>,
    ...args: P
): T {
  return (/*#__INLINE__*/ isValueEvaluator(recipe)) ? recipe(...args) : recipe;
}

/**
 * Converts a value recipe to its {@link ValueRecipe.Evaluator evaluator} function.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 * @param recipe  Value recipe to convert.
 *
 * @returns Either evaluator itself, or the one evaluating to the given value.
 */
export function valueRecipe<T, P extends any[]>(recipe: ValueRecipe<T, P>): ValueRecipe.Evaluator<T, P> {
  return (/*#__INLINE__*/ isValueEvaluator(recipe)) ? recipe : valueProvider(recipe);
}
