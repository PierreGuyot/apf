import {
  filterNullish,
  item,
  Language,
  Lines,
  reportCheckboxList,
  reportTitle,
} from "../../../../ui";
import {
  getGradeOption,
  getPtnmOption,
  getTumorSubtypeOptions,
  hasTumoralExtensionSection,
  PtnmOptionType,
  Tumor,
} from "./helpers";

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
  const tumorSubtypeOptions = getTumorSubtypeOptions(tumor.type);

  return [
    item("Type histologique de la tumeur", tumor.type, language),
    tumorSubtypeOptions.length
      ? item("Sous-type histologique de la tumeur", tumor.subtype, language)
      : undefined,
    tumor.type === "other"
      ? // FIXME: will break translate on debug
        item(
          "Sous-type histologique de la tumeur",
          tumor.otherSubtype,
          language,
        )
      : undefined,
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
    ...(hasExtension
      ? hasTumoralExtensionSection(tumor.type)
        ? reportCheckboxList({
            title: "Extension tumorale",
            items: Object.entries(tumor.extension)
              .filter(([_key, percentage]) => percentage > 0)
              .map(([key, percentage]) => {
                // CAUTION: this cast is type-unsafe
                const { label } = getPtnmOption(key as PtnmOptionType);
                // FIXME: will break translate on debug
                return `${reportTitle(label, language)} ${percentage}%`;
              }),
            language,
          })
        : // TODO: int this case, value should automatically be inferred
          ["TODO: infer"]
      : []),
  ].filter(filterNullish);
};
