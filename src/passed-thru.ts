/**
 * @module call-thru
 */
/**
 * A key of a [[PassedThru]] property containing the actual outcome value.
 */
export const PassedThru__symbol = (/*#__PURE__*/ Symbol('passed-thru'));

/**
 * An chained pass outcome value wrapping the actual outcome.
 *
 * When the outcome of the last chained pass is a [[PassedThru]] instance, it is be replaced with the value of its
 * [[PassedThru__symbol]] property.
 *
 * Also extends an `Iterable` interface, so that e.g. [[nextEach]] and [[nextFlatEach]] unwrap the passed through value
 * to convert it to arbitrary number of elements. Including zero, which is the case when `nextSkip()` is returned.
 */
export abstract class PassedThru<V, I = V> implements Iterable<I> {

  /**
   * The actual passed thru value.
   */
  abstract readonly [PassedThru__symbol]: V;

  /**
   * Checks whether `target` value is a [[PassedThru]] instance.
   *
   * @param target  A value to check.
   *
   * @returns `true`.
   */
  static is<V extends PassedThru<any, any>>(target: V): target is V;

  /**
   * Checks whether `target` value is a [[PassedThru]] instance.
   *
   * @param target  A value to check.
   *
   * @returns `true` if the `target` value is an object with a [[PassedThru__symbol]] property, or `false` otherwise.
   */
  static is<V>(target: any): target is PassedThru<V, any>;

  static is(target: any): target is PassedThru<any, any> {
    return typeof target === 'object' && PassedThru__symbol in target;
  }

  /**
   * Extracts the passed through value.
   *
   * @param outcome  The outcome to extract the value from.
   *
   * @returns A [[PassedThru__symbol]] property value is the given `outcome` is a [[PassedThru]] instance, or `outcome`
   * itself otherwise.
   */
  static get<V>(outcome: V): PassedThru.Value<V> {
    if (PassedThru.is<V>(outcome)) {
      return outcome[PassedThru__symbol] as PassedThru.Value<V>;
    }
    return outcome as PassedThru.Value<V>;
  }

  /**
   * Extracts the passed through items.
   *
   * @param outcome  The outcome to extract the items from.
   *
   * @return An iterable of passed through items if the the given `outcome` is a [[PassedThru]] instance, or an iterable
   * containing the `outcome` itself otherwise.
   */
  static items<V>(outcome: V): Iterable<PassedThru.Item<V>> {
    if (PassedThru.is<V>(outcome)) {
      return outcome;
    }
    return {
      * [Symbol.iterator]() {
        yield outcome as PassedThru.Item<V>;
      },
    };
  }

  abstract [Symbol.iterator](): Iterator<I>;

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

}
