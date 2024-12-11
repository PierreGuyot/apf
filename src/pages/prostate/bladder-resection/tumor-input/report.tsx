import { filterNullish, item, Language, Lines } from "../../../../ui";
import { getGradeOption, hasTumoralExtension, Tumor } from "./helpers";

export const reportTumor = ({
  tumor,
  language,
  hasGrade,
  hasExtension,
}: {
  tumor: Tumor;
  language: Language;
  hasGrade?: boolean;
  hasExtension?: boolean;
}): Lines => {
  return [
    item(
      "Type histologique de la tumeur",
      tumor.type === "other" ? tumor.typeOther : tumor.type,
      language,
    ),
    hasGrade
      ? // FIXME: will break translate on debug
        item(
          "Grade tumoral",
          tumor.type === "other"
            ? tumor.grade
            : getGradeOption(tumor.grade).label,
          language,
        )
      : undefined,
    hasExtension
      ? hasTumoralExtension(tumor.type)
        ? item("Extension tumorale", tumor.extension, language)
        : // TODO: in this case, value should automatically be inferred
          "TODO: infer"
      : undefined,
  ].filter(filterNullish);
};
