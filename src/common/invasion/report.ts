import { item, Language, toYesNo } from "../../ui";

export const getConclusionInvasion = (
  hasLymphaticOrVascularInvasion: boolean,
  language: Language,
) => {
  return item(
    "Emboles vasculaires ou lymphatiques",
    toYesNo(hasLymphaticOrVascularInvasion),
    language,
  );
};
