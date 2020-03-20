/**
 * @packageDocumentation
 * @module @proc7ts/call-thru
 */
/**
 * A function that checks whether the given value is present.
 *
 * @param value  A value to check.
 *
 * @returns `true` when the given `value` is not `null` or `undefined`, or `false` otherwise.
 */
export function isPresent<T>(value: T | undefined | null): value is T {
  return value != null;
}

/**
 * A function that checks whether the given value is not present.
 *
 * This is a direct opposite to `isPresent()`.
 *
 * @param value  A value to check.
 *
 * @returns `true` when the given `value` is `null` or `undefined`, or `false` otherwise.
 */
export function isNotPresent<T>(value: T | undefined | null): value is T {
  return value == null;
}

/**
 * A function that checks whether the given value is defined.
 *
 * @param value  A value to check.
 *
 * @returns `true` when the given `value` is not `undefined`, or `false` otherwise.
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * A function that checks whether the given value is undefined.
 *
 * This is a direct opposite to `isDefined()`.
 *
 * @param value  A value to check.
 *
 * @returns `true` when the given `value` is `undefined`, or `false` otherwise.
 */
export function isUndefined<T>(value: T | undefined): value is T {
  return value === undefined;
}
