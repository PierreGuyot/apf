import { Language } from "../../ui/helpers.types";
import { FormState } from "./ProstateBiopsyForm";
import { Score } from "./helpers";

type ReportParams = FormState & {
  score: Score;
  comment: string;
  language: Language;
};

// TODO with Louis: un-mock
const mockGetContent = (form: ReportParams) =>
  JSON.stringify(form.score, null, 2);

// TODO: test extensively
export const generateReport = (form: ReportParams): string => {
  switch (form.language) {
    case "FR": {
      return mockGetContent(form);
    }

    case "EN": {
      return mockGetContent(form);
    }
  }
};
