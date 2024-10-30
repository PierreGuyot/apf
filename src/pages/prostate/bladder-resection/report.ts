import { FormId, Language } from "../../../ui";
import { FormState } from "./BladderResectionForm";

export type ReportParams = FormState & {
  formId: Extract<FormId, "bladder-transurethral-resection">;
};

// FIXME: un-mock

const mockGetContent = (form: ReportParams) =>
  ["TODO: un-mock summary", "", JSON.stringify(form, null, 2)].join("\n");

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
  _isExpertMode: boolean,
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
