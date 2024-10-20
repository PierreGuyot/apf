import { FormId } from "../../ui/helpers/forms";
import { Language } from "../../ui/translation";
import { FormState } from "./DermatologyForm";

type ReportParams = FormState & {
  formId: FormId;
  comment: string;
  language: Language;
};

// FIXME: un-mock
const mockGetContent = (form: ReportParams) =>
  `${JSON.stringify(form, null, 2).slice(0, 50)}...`;

// TODO clean: test extensively
export const generateReport = (form: ReportParams): string => {
  const { language } = form;

  switch (language) {
    case "FR": {
      return mockGetContent(form);
    }

    case "EN": {
      return mockGetContent(form);
    }
  }
};
