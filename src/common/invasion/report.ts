import { Language, reportBoolean } from "../../ui";

export const reportInvasion = (
  hasLymphaticOrVascularInvasion: boolean,
  language: Language,
) => {
  return reportBoolean({
    label: "Invasion lymphatique ou vasculaire",
    value: hasLymphaticOrVascularInvasion,
    language,
  });
};
