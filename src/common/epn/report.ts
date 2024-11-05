import { item, Language, toYesNo } from "../../ui";

export const getConclusionEpn = (hasEpn: boolean, language: Language) => {
  return item("Engainements périnerveux", toYesNo(hasEpn), language);
};
