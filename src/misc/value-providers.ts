/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
/**
 * Creates a provider of the only argument.
 *
 * @param value  A value to return.
 *
 * @returns A function that returns `value`.
 */
export function valueProvider<T>(value: T): (this: void) => T {
  return (): T => value;
}

/**
 * Creates a provider of lazily evaluated value.
 *
 * The returned function evaluates the value first time it is called. Then it just returns previously evaluated value.
 *
 * @param provider  A no-arg function evaluating the value.
 *
 * @returns A function that returns the value evaluated by `provider`.
 */
export function lazyValue<T>(provider: (this: void) => T): (this: void) => T {

  let get = (): T => (get = valueProvider(provider()))();

  return () => get();
}

/**
 * Creates a provider of arguments tuple.
 *
 * The returned tuple should never be modified as it is not cloned.
 *
 * @param values  Values to return.
 *
 * @returns A function that returns `values` tuple.
 */
export function valuesProvider<T extends readonly any[]>(...values: T): (this: void) => T {
  return (): T => values;
}

/**
 * Creates a provider of cloned arguments tuple.
 *
 * The returned tuple can be modified as it is cloned before the return.
 *
 * @param values  Values to return.
 *
 * @returns A function that returns a clone of `values` tuple.
 */
export function valuesCloner<T extends any[]>(...values: T): (this: void) => T {
  return (): T => Array.from(values) as T;
}
