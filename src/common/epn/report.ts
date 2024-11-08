import { Language, reportBoolean } from "../../ui";

export const reportEpn = (hasEpn: boolean, language: Language) => {
  return reportBoolean({
    label: "Engainements périnerveux",
    value: hasEpn,
    language,
  });
};
