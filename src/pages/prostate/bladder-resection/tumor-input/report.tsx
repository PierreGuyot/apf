import {
  COLON_CHARACTER,
  formatList,
  item,
  Language,
  translate,
} from "../../../../ui";
import {
  getGradeOption,
  getPtnmOption,
  getTumorSubtypeOptions,
  hasTumoralExtensionSection,
  PtnmOptionType,
  Tumor,
} from "./helpers";

export const getTumorTypeSection = ({
  tumor,
  language,
  hasGrade,
  hasExtension,
}: {
  tumor: Tumor;
  language: Language;
  hasGrade?: boolean;
  hasExtension?: boolean;
}) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const tumorSubtypeOptions = getTumorSubtypeOptions(tumor.type);

  return [
    item("Type histologique de la tumeur", tumor.type, language),
    tumorSubtypeOptions.length
      ? item("Sous-type histologique de la tumeur", tumor.subtype, language)
      : undefined,
    tumor.type === "other"
      ? item(
          "Sous-type histologique de la tumeur",
          tumor.otherSubtype,
          language,
        )
      : undefined,
    hasGrade
      ? item(
          "Grade tumoral",
          tumor.type === "other"
            ? tumor.grade
            : getGradeOption(tumor.grade).label,
          language,
        )
      : undefined,
    ...(hasExtension
      ? hasTumoralExtensionSection(tumor.type)
        ? formatList({
            title: "Extension tumorale",
            items: Object.entries(tumor.extension)
              .filter(([_key, percentage]) => percentage > 0)
              .map(([key, percentage]) => {
                // CAUTION: this cast is type-unsafe
                const { label } = getPtnmOption(key as PtnmOptionType);
                return `${t(label)}${colon} ${percentage}%`;
              }),
            language,
          })
        : // TODO: int this case, value should automatically be inferred
          ["TODO: infer"]
      : []),
  ];
};
