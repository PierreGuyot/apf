import { COLON_CHARACTER, Language, translate } from "../translation";
import { filterEmpty, filterNullish } from "./helpers";

const EMPTY_LINE = "\n";
const PADDING = " ".repeat(4);

export const pad = (value: string) => `${PADDING}${value}`;

// TODO clean: this won't work for items like "G1" (where G needs to stay capitalized)
export const lowercaseFirstLetter = (value: string) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
};

// TODO CLEAN: extract as reportItem or reportSelect
// Simple helper for name-value items
export const item = (
  name: string | undefined,
  value: string,
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);
  return [
    name ? `${t(name)}${colon}` : undefined, // Optional label
    reportValue(value, language), // Value
  ]
    .filter(filterEmpty)
    .join(" ");
};

export const reportValue = (value: string, language: Language) => {
  const t = (value: string) => translate(value, language);
  return lowercaseFirstLetter(t(value));
};

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
