import { Language, translate } from "../translation";
import { filterEmpty, filterNullish } from "./helpers";

export const EMPTY_LINE = "\n";
const PADDING = " ".repeat(4);

export const pad = (value: string) => `${PADDING}${value}`;

export const nest =
  (depth: number = 1) =>
  (value: string) =>
    `${PADDING.repeat(depth)}${value}`;

export const padSection = (value: string) =>
  value.split(EMPTY_LINE).map(pad).join(EMPTY_LINE);

export const joinLines = (lines: Array<string | undefined>) =>
  lines.filter(filterNullish).join(EMPTY_LINE);

export const joinSections = (paragraphs: Array<string | undefined>) =>
  paragraphs.filter(filterEmpty).join(`\n\n`);

export const naturalJoin = (
  items: Array<string | number>,
  language: Language,
) => {
  const start = [...items];
  const last = start.pop();
  const linkWord = translate("et", language);

  return [start.join(", "), last].filter(filterEmpty).join(` ${linkWord} `);
};
