import { pad } from "./helpers";
import { reportTitle } from "./title.report";
import { Language, translate } from "./translation";

export const reportCheckboxList = ({
  title,
  items,
  language,
}: {
  title: string;
  items: string[];
  language: Language;
}) => {
  if (!items.length) {
    return [];
  }

  const t = (value: string) => translate(value, language);

  return [
    reportTitle(title, language),
    ...items.map(t).map((item) => pad(` - ${item}`)),
  ];
};
