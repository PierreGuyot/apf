import {
  getCommentSection,
  getParagraphSection,
} from "../../../common/comment-section";
import { getConclusionInvasion } from "../../../common/invasion/report";
import { getResectionMacroscopySection } from "../../../common/resection-macroscopy/report";
import {
  COLON_CHARACTER,
  filterNullish,
  formatList,
  FormId,
  getFormTitle,
  getTrooleanOption,
  item,
  joinLines,
  joinSections,
  Language,
  lowercaseFirstLetter,
  pad,
  toOptionalYesNo,
  translate,
} from "../../../ui";
import { FormState } from "./BladderResectionForm";
import {
  getGradeOption,
  getLesionAspectOption,
  getLocationOption,
  getPtnmOption,
  getTreatmentOption,
  getTumorSubtypeOptions,
  hasTumoralExtensionSection,
  PtnmOptionType,
  Tumor,
} from "./helpers";

export type ReportParams = FormState & {
  formId: Extract<FormId, "bladder-transurethral-resection">;
};

export const generateReport = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    getClinicalInfoSection(form, language, isExpertMode),
    getMacroscopySection(form, language),
    getMicroscopySection(form, language),
    getCommentSection(form, language),
  ]);
};

const getTumorTypeSection = (tumorType: Tumor, language: Language) => {
  const tumorSubtypeOptions = getTumorSubtypeOptions(tumorType.type);

  return [
    item("Type histologique de la tumeur", tumorType.type, language),
    tumorSubtypeOptions.length
      ? item("Sous-type histologique de la tumeur", tumorType.subtype, language)
      : undefined,
    tumorType.type === "other"
      ? item(
          "Sous-type histologique de la tumeur",
          tumorType.otherSubtype,
          language,
        )
      : undefined,
  ].filter(filterNullish);
};

const getClinicalInfoSection = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  // Expert mode
  if (isExpertMode) {
    return joinLines([
      item(
        "Antécédents de maladie des voies urinaires ou de métastases à distance",
        getTrooleanOption(form.medicalHistory).label,
        language,
      ),
      ...(form.medicalHistory === "yes"
        ? [
            ...getTumorTypeSection(form.previousTumorType, language),
            item(
              "Localisation",
              getLocationOption(form.location.location).label,
              language,
            ),
            `${t("Traitements antérieurs")}${colon} ${lowercaseFirstLetter(t(getTrooleanOption(form.hadPreviousTreatment).label))}${
              form.hadPreviousTreatment
                ? ` (${lowercaseFirstLetter(t(getTreatmentOption(form.previousTreatment).label))})`
                : undefined
            }`,
            item(
              "Aspect cystoscopique de la lésion actuelle",
              getLesionAspectOption(form.lesionAspect).label,
              language,
            ),
          ]
        : []),
    ]);
  }

  // Standard mode
  return getParagraphSection(
    "Renseignements cliniques",
    form.clinicalInfo,
    language,
  );
};

const getMacroscopySection = (form: ReportParams, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const content = getResectionMacroscopySection(form, language);
  return joinLines([`${t("Macroscopie")}${colon}`, ...content.map(pad)]);
};

const getMicroscopySection = (form: ReportParams, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const content = [
    ...getTumorTypeSection(form.tumor, language),
    item(
      "Grade tumoral",
      form.tumor.type === "other"
        ? form.tumor.grade
        : getGradeOption(form.tumor.grade).label,
      language,
    ),
    ...(hasTumoralExtensionSection(form.tumor.type)
      ? formatList({
          title: "Extension tumorale",
          items: Object.entries(form.tumor.extension)
            .filter(([_key, percentage]) => percentage > 0)
            .map(([key, percentage]) => {
              // CAUTION: this cast is type-unsafe
              const { label } = getPtnmOption(key as PtnmOptionType);
              return `${t(label)}${colon} ${percentage}%`;
            }),
          language,
        })
      : // TODO: int this case, value should automatically be inferred
        ["TODO"]),

    "", // Empty line
    getConclusionInvasion(form.hasLymphaticOrVascularInvasion, language),

    "", // Empty line
    item(
      "Copeaux de résection présentant de la musculeuse",
      toOptionalYesNo(form.muscularisPropria.isPresent),
      language,
    ),
    form.muscularisPropria.isPresent === "yes"
      ? item(
          "Nombre de copeaux",
          String(form.muscularisPropria.chipCount),
          language,
        )
      : form.muscularisPropria.isPresent === "unspecified"
        ? item("Commentaire", form.muscularisPropria.notes, language)
        : undefined,
    "", // Empty line
    t("Autres résultats"),
    ...formatList({
      title: "Tumoraux",
      items: form.otherResults.tumoral,
      language,
    }).map(pad),
    ...formatList({
      title: "Non-tumoraux",
      items: form.otherResults.nonTumoral,
      language,
    }).map(pad),
  ].filter(filterNullish);

  return joinLines([
    `${t("Microscopie")}${colon}`,
    ...content.map((line) => (line ? pad(line) : "")),
  ]);
};

export const Report = ({
  form,
  language,
  isExpertMode,
}: {
  form: ReportParams;
  language: Language;
  isExpertMode: boolean;
}) => {
  return <div>{generateReport(form, language, isExpertMode)}</div>;
};
