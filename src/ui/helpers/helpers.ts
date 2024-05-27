import { v4 as uuidv4 } from "uuid";

export const noop = () => {};

export const anId = () => uuidv4();

export const sum = (items: number[]): number =>
  items.reduce((acc, item) => acc + item, 0);

export const sumArrays = (items: number[][]): number => sum(items.map(sum));

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

/** Generate a range of number from start to end.
 * If only end is passed, we assume start is 1.
 *
 * For instance:
 *  `range(3)` should return `[1, 2, 3]`
 *  `range(2, 5)` should return `[2, 3, 4, 5]`
 */
export const range = (
  ...params: [end: number] | [start: number, end: number]
) => {
  const { end, start } =
    params.length === 2
      ? { end: params[1], start: params[0] }
      : { end: params[0], start: 1 };
  return [...new Array(end - start + 1)].map((_, i) => i + start);
};

export const patchArray = <T>(
  items: T[],
  index: number,
  updater: (item: T) => T,
) => items.map((row, i) => (i === index ? updater(row) : row));

export const toOption = <T extends number = number>(value: T) => ({
  value,
  label: String(value),
});

export const px = (value: number) => `${value}px`;

export const clamp = ({
  value: _value,
  min,
  max,
}: {
  value: number;
  min?: number;
  max?: number;
}) => {
  let value = _value;

  if (min) {
    value = Math.max(value, min);
  }
  if (max) {
    value = Math.min(value, max);
  }

  return value;
};

/** Helper to ensure a switch or a list of if is exhausted.
 * For example:
 * ```
 * switch (aOrB) {
 *   case 'a':
 *      return ...
 *
 *   case 'b':
 *      return ...
 *
 *  return assertUnreachable(aOrB);
 * ```
 */
export const assertUnreachable = (x: never): never => {
  throw new Error(`assertUnreachable: ${x}`);
};
