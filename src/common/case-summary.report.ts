import { Language, Lines, reportTextArea } from "../ui";

export const reportCaseSummary = (value: string, language: Language): Lines =>
  reportTextArea("Renseignements cliniques", value, language);
