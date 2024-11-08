import { reportTitle } from "../title.report";
import { Language, translate } from "../translation";
import { filterEmpty, filterNullish, join } from "./helpers";

export type Lines = string[];

export const EMPTY_LINE = "\n";
const PADDING = " ".repeat(4);

export const pad = (value: string) => `${PADDING}${value}`;

// TODO clean: this won't work for items like "G1" (where G needs to stay capitalized)
const lowercaseFirstLetter = (value: string) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
};

// TODO CLEAN: consider separating translation and formatting
// TODO CLEAN: consider extracting as reportKeyValue
// Simple helper for name-value items
export const item = (
  name: string | undefined,
  value: string,
  language: Language,
) => {
  return join(
    name ? reportTitle(name, language) : undefined, // Optional label
    reportValue(value, language), // Value
  );
};

export const reportValue = (value: string, language: Language) => {
  const t = (value: string) => translate(value, language);
  return lowercaseFirstLetter(t(value));
};

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
