import { Lines, pad } from "./helpers";
import { reportTitle } from "./title.report";
import { Language } from "./translation";

export const reportSection = (
  title: string,
  language: Language,
  content: string[],
  hasSeparationLine?: boolean,
): Lines => {
  if (!content.length) {
    return [];
  }

  return [
    reportTitle(title, language),
    ...(hasSeparationLine ? [""] : []),
    // Don't pad empty lines
    ...content.map((line) => (line ? pad(line) : "")),
  ];
};
