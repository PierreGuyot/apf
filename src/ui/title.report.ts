import { COLON_CHARACTER, Language, translate } from "./translation";

export const reportTitle = (label: string, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);
  return `${t(label)}${colon}`;
};
