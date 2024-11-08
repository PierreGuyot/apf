import { Language, reportTextArea } from "../ui";

export const reportCaseSummary = (value: string, language: Language) =>
  reportTextArea("Renseignements cliniques", value, language);
