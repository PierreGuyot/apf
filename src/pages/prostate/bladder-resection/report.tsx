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
  getLesionAspectOption,
  getLocationOption,
  getTreatmentOption,
} from "./helpers";
import { getTumorTypeSection } from "./tumor-input/report";

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
            ...getTumorTypeSection({ tumor: form.previousTumor, language }),
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

  const otherResults = [
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
  ];

  const hasExtension = true;
  const hasGrade = true;

  const content = [
    ...getTumorTypeSection({
      tumor: form.tumor,
      language,
      hasGrade,
      hasExtension,
    }),

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
    otherResults ? t("Autres résultats") : undefined,
    ...otherResults,
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
