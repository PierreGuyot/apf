import { pad } from "./helpers";
import { COLON_CHARACTER, Language, translate } from "./translation";

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
  const colon = t(COLON_CHARACTER);

  return [
    `${t(title)}${colon}`,
    ...items.map(t).map((item) => pad(` - ${item}`)),
  ];
};
