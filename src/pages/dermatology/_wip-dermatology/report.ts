import { Language } from "../../../ui";
import { FormState } from "./DermatologyForm";

// FIXME: un-mock

type ReportParams = FormState & {
  formId: "dermatology";
};

const mockGetContent = (form: ReportParams) =>
  `${JSON.stringify(form, null, 2).slice(0, 50)}...`;

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
): string => {
  switch (language) {
    case "FR": {
      return mockGetContent(form);
    }

    case "EN": {
      return mockGetContent(form);
    }
  }
};
