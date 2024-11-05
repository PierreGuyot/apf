import { COLON_CHARACTER, Language, toYesNo, translate } from "../../ui";

export const getConclusionEpn = (hasEpn: boolean, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return `${t("Engainements périnerveux")}${colon} ${toYesNo(hasEpn, language)}`;
};
