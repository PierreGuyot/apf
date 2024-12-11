import { Lines, pad } from "./helpers";
import { reportTitle } from "./title.report";
import { Language, translate } from "./translation";

export const reportSection = ({
  title,
  language,
  content,
  hasSeparationLine,
  emptyState,
}: {
  title: string;
  language: Language;
  content: string[];
  hasSeparationLine?: boolean;
  emptyState?: string;
}): Lines => {
  const t = (value: string) => translate(value, language);

  if (!content.length) {
    if (!emptyState) {
      return [];
    }

    return [`${reportTitle(title, language)} ${t(emptyState)}`];
  }

  return [
    reportTitle(title, language),
    ...(hasSeparationLine ? [""] : []),
    // Don't pad empty lines
    ...content.map((line) => (line ? pad(line) : "")),
  ];
};
