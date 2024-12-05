import { FormId, Language, reportStructure } from "../../../ui";
import { FormState } from "./ThyroidForm";

export type ReportParams = FormState & {
  formId: Extract<FormId, "thyroid">;
};

export const generateReport = ({
  form,
  language,
}: {
  form: ReportParams;
  language: Language;
}): string => {
  return reportStructure(form.formId, language, [
    // TODO: add sections
  ]);
};

export const Report = ({
  form,
  language,
}: {
  form: ReportParams;
  language: Language;
}) => {
  return <div>{generateReport({ form, language })}</div>;
};
