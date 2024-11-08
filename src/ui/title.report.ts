import { COLON_CHARACTER, Language, translate } from "./translation";

export const reportTitle = (label: string, language: Language): string => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);
  return `${t(label)}${colon}`;
};
