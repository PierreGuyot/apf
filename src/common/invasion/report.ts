import { Language, reportBoolean } from "../../ui";

export const reportInvasion = (
  hasLymphaticOrVascularInvasion: boolean,
  language: Language,
) => {
  return reportBoolean({
    label: "Emboles vasculaires ou lymphatiques",
    value: hasLymphaticOrVascularInvasion,
    language,
  });
};
