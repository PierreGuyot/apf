import { FormId, Language, reportStructure } from "../../../ui";
import { FormState } from "./InvasiveMelanomaForm";

export type ReportParams = FormState & {
  formId: Extract<FormId, "invasive-melanoma">;
};

export const generateReport = ({
  form,
  language,
}: {
  form: ReportParams;
  language: Language;
}): string => {
  // FIXME: un-mock
  const sections = [[JSON.stringify(form, null, 2)]];
  return reportStructure(form.formId, language, sections);
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
