/**
 * An chained pass outcome value wrapping the actual outcome.
 *
 * When the outcome of the last chained pass is a `PassedThru` instance, it is be replaced with the value of its
 * `[PassedThru.as]` property.
 *
 * Also extends an `Iterable` interface, so that e.g. `nextEach()` and `nextFlatEach()` unwrap the passed through value
 * to convert it to arbitrary number of elements. Including zero, which is the case when `nextSkip()` is returned.
 */
export interface PassedThru<V, I = V> extends Iterable<I> {

  /**
   * The actual passed thru value.
   */
  [PassedThru.as]: V;

}

export namespace PassedThru {

  /**
   * A type of the passed though value.
   */
  export type Value<V> = V extends PassedThru<infer T, any> ? T : V;

  /**
   * A type of the passed though item.
   */
  export type Item<V> = V extends PassedThru<any, infer I> ? I : V;

  /**
   * A key of a `PassedThru` property containing the actual outcome value.
   */
  export const as = Symbol('passed-thru-as');

  /**
   * Checks whether `target` value is a `PassedThru` instance.
   *
   * @param target A value to check.
   *
   * @returns `true`.
   */
  export function is<V extends PassedThru<any, any>>(target: V): target is V;

  /**
   * Checks whether `target` value is a `PassedThru` instance.
   *
   * @param target A value to check.
   *
   * @returns `true` if the `target` value is an object with a `[PassedThru.as]` property, or `false` otherwise.
   */
  export function is<V>(target: any): target is PassedThru<V, any>;

  export function is(target: any): target is PassedThru<any, any> {
    return typeof target === 'object' && as in target;
  }

  /**
   * Extracts the passed through value.
   *
   * @param outcome The outcome to extract the value from.
   *
   * @returns A `[PassedThru.as]` property value is the given `outcome` is a `PassedThru` instance, or `outcome` itself
   * otherwise.
   */
  export function get<V>(outcome: V): Value<V> {
    if (is<V>(outcome)) {
      return outcome[as] as Value<V>;
    }
    return outcome as Value<V>;
  }

  /**
   * Extracts the passed through items.
   *
   * @param outcome The outcome to extract the items from.
   *
   * @return An iterable of passed through items if the the given `outcome` is a `PassedThru` instance, or an iterable
   * containing the `outcome` itself otherwise.
   */
  export function items<V>(outcome: V): Iterable<Item<V>> {
    if (is<V>(outcome)) {
      return outcome;
    }
    return {
      * [Symbol.iterator]() {
        yield outcome as Item<V>;
      }
    };
  }

}
