import { Language } from "../../ui/language";
import { FormState } from "./DermatologyForm";

type ReportParams = FormState & {
  comment: string;
  language: Language;
};

// TODO with Louis: un-mock
const mockGetContent = (form: ReportParams) =>
  `${JSON.stringify(form, null, 2).slice(0, 50)}...`;

// TODO: test extensively
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
