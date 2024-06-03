import { Language } from "../../../ui/language";
import { FormState } from "./ProstateResectionForm";

type ReportParams = FormState & {
  language: Language;
};

// TODO: test extensively
// TODO: un-mock
export const generateReport = (form: ReportParams): string => {
  return JSON.stringify(form, null, 2);
};
