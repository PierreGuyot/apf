import { Lines } from "./helpers";
import { reportSection } from "./section.report";
import { Language, translate } from "./translation";

export const reportCheckboxList = ({
  title,
  items,
  language,
}: {
  title: string;
  items: string[];
  language: Language;
}): Lines => {
  const t = (value: string) => translate(value, language);

  return reportSection(
    title,
    language,
    items.map(t).map((item) => ` - ${item}`),
  );
};
