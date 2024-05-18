import { filterEmpty } from "./helpers";

export const EMPTY_LINE = "\n";
const PADDING = " ".repeat(4);

export const pad = (value: string) => `${PADDING}${value}`;
export const padSection = (value: string) =>
  value.split(EMPTY_LINE).map(pad).join(EMPTY_LINE);

export const joinLines = (lines: string[]) => lines.join(EMPTY_LINE);
export const joinSections = (paragraphs: Array<string | undefined>) =>
  paragraphs.filter(filterEmpty).join(`\n\n`);

export const naturalJoin = (items: Array<string | number>) => {
  const start = [...items];
  const last = start.pop();

  return [start.join(", "), last].filter(filterEmpty).join(" et ");
};
