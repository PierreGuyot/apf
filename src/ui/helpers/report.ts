import { Language, translate } from "../translation";
import { FormId, FORMS } from "./forms";
import { filterEmpty } from "./helpers";
import { joinLines, Lines } from "./text";

const getFormTitle = (formId: FormId, language: Language) =>
  translate(FORMS[formId].title, language).toLocaleUpperCase();

const joinSections = (paragraphs: Array<string | undefined>) =>
  paragraphs.filter(filterEmpty).join(`\n\n`);

export const reportStructure = (
  formId: FormId,
  language: Language,
  sections: Lines[],
): string => {
  return joinSections([
    getFormTitle(formId, language),
    ...sections.map(joinLines),
  ]);
};
