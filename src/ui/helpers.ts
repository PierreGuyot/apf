import { v4 as uuidv4 } from "uuid";

export const anId = () => uuidv4();

export const sum = (items: number[]): number =>
  items.reduce((acc, item) => acc + item);

/** Remove the nullish (i.e. null or undefined) items in an array and properly narrow the result's type.
 *
 * For instance:
 *   `[0, 1, undefined, false, {}, [], '', null].filter(filterNullish)` should return `[0, 1, false, {}, [], '']`
 */
export const filterNullish = <T>(item: T | null | undefined): item is T =>
  item != null;

/** Remove the empty (i.e. falsy) items in an array and properly narrow the result's type.
 *
 * For instance:
 *   `[0, 1, undefined, false, {}, [], '', null].filter(filterNullish)` should return `[0, 1, false, {}, [], '']`
 */
export const filterEmpty = <T>(item: T | null | undefined): item is T => !!item;

/** Helper to help join classNames when composing them
 * For instance:
 *   join('my-class-name', isLoading ? "is-loading" : undefined) should return
 *     'my-class-name is-loading' if isLoading is true
 *     'my-class-name' if isLoading is false
 */
export const join = (...classNames: Array<string | undefined>) =>
  classNames
    .map((item) => item?.trim())
    .filter(filterEmpty)
    .join(" ");

/** Generate a range of number of length n (from 1 to n).
 *
 * For instance:
 *  `range(3)` should return `[1, 2, 3]`
 */
export const range = (size: number) =>
  [...new Array(size)].map((_, i) => i + 1);
