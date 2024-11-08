import { Language } from "../ui";
import { reportTextArea } from "../ui/text-area.report";

export const reportCaseSummary = (value: string, language: Language) =>
  reportTextArea("Renseignements cliniques", value, language);
