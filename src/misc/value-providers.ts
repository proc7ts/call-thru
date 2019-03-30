/**
 * Creates a provider of the only argument.
 *
 * @param value A value to return.
 *
 * @returns A function that returns `value`.
 */
export function valueProvider<T>(value: T): (this: void) => T {
  // Functions are faster than lambdas in Firefox
  return function () {
    return value;
  };
}

/**
 * Creates a provider of arguments tuple.
 *
 * The returned tuple should never be modified as it is not cloned.
 *
 * @param values Values to return.
 *
 * @returns A function that returns `values` tuple.
 */
export function valuesProvider<T extends readonly any[]>(...values: T): (this: void) => T {
  // Functions are faster than lambdas in Firefox
  return function () {
    return values;
  };
}

/**
 * Creates a provider of cloned arguments tuple.
 *
 * The returned tuple can be modified as it is cloned before the return.
 *
 * @param values Values to return.
 *
 * @returns A function that returns a clone of `values` tuple.
 */
export function valuesCloner<T extends any[]>(...values: T): (this: void) => T {
  // Functions are faster than lambdas in Firefox
  return function () {
    return [...values] as T;
  };
}
