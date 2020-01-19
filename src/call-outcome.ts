/**
 * @module call-thru
 */
/**
 * Call chain outcome detection.
 *
 * A [[NextCall]] generic has a kind of outcome detection as its a first type parameter extending `CallOutcome.Kind`,
 * which is essentially a key of `CallOutcome.Map` map.
 *
 * To add another outcome detection algorithms augment the `CallOutcome.Map` and add new entry to it.
 */
export namespace CallOutcome {
  /**
   * A kind of call chain outcome detection algorithm.
   *
   * This is a key of `CallOutcome.Map` type.
   */
  export type Kind = keyof Map<unknown, unknown>;

  /**
   * A type of outcome of the given kind for the given return type of the next function and its call outcome.
   */
  export type OfKind<OutKind extends Kind, Return, Out> = ReturnType<Map<Return, Out>[OutKind]>;

  /**
   * A map implementing outcome detection algorithms.
   *
   * Each field here is a kind of algorithm. While the value is a type of outcome depending on `<Return>` type
   * parameter.
   *
   * @typeparam Return  A return type of the remaining part of call chain. A type of outcome may depend on it somehow.
   * @typeparam Out  A type of next call outcome.
   */
  export interface Map<Return, Out> {
    /**
     * Default outcome type. The same as the return one.
     */
    default(): Return;
  }
}
