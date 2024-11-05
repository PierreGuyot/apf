import { COLON_CHARACTER, Language, toYesNo, translate } from "../../ui";

export const getConclusionInvasion = (
  hasLymphaticOrVascularInvasion: boolean,
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return `${t("Emboles vasculaires ou lymphatiques")}${colon} ${toYesNo(hasLymphaticOrVascularInvasion, language)}`;
};
