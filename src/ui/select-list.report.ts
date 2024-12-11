import { Lines } from "./helpers";
import { reportSection } from "./section.report";
import { Language, translate } from "./translation";

export const reportSelectList = ({
  title,
  items,
  language,
  hasSeparationLine,
  emptyState,
}: {
  title: string;
  items: string[];
  language: Language;
  hasSeparationLine?: boolean;
  emptyState?: string;
}): Lines => {
  const t = (value: string) => translate(value, language);

  return reportSection({
    title,
    language,
    content: items.map(t).map((item) => ` - ${item}`),
    hasSeparationLine,
    emptyState,
  });
};
