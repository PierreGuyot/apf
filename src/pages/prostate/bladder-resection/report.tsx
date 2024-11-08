import { reportAdditionalRemarks } from "../../../common/additional-remarks.report";
import { reportCaseSummary } from "../../../common/case-summary.report";
import { reportInvasion } from "../../../common/invasion/report";
import { getResectionMacroscopySection } from "../../../common/resection-macroscopy/report";
import {
  COLON_CHARACTER,
  filterNullish,
  FormId,
  getFormTitle,
  item,
  joinLines,
  joinSections,
  Language,
  pad,
  reportCheckboxList,
  reportTitle,
  reportTroolean,
  reportValue,
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
    reportAdditionalRemarks(form, language),
  ]);
};

const getClinicalInfoSection = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  // Expert mode
  if (isExpertMode) {
    const partPreviousTreatment = [
      reportTroolean({
        label: "Traitements antérieurs",
        value: form.hadPreviousTreatment,
        language,
      }),
      form.hadPreviousTreatment
        ? `(${reportValue(getTreatmentOption(form.previousTreatment).label, language)})`
        : undefined,
    ]
      .filter(filterNullish)
      .join(" ");

    return joinLines([
      reportTroolean({
        label:
          "Antécédents de maladie des voies urinaires ou de métastases à distance",
        value: form.medicalHistory,
        language,
      }),
      ...(form.medicalHistory === "yes"
        ? [
            ...getTumorTypeSection({ tumor: form.previousTumor, language }),
            item(
              "Localisation",
              getLocationOption(form.location.location).label,
              language,
            ),
            partPreviousTreatment,
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
  return reportCaseSummary(form.clinicalInfo, language);
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
    ...reportCheckboxList({
      title: "Tumoraux",
      items: form.otherResults.tumoral,
      language,
    }),
    ...reportCheckboxList({
      title: "Non-tumoraux",
      items: form.otherResults.nonTumoral,
      language,
    }),
  ].map(pad);

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
    reportInvasion(form.hasLymphaticOrVascularInvasion, language),

    "", // Empty line
    reportTroolean({
      label: "Copeaux de résection présentant de la musculeuse",
      value: form.muscularisPropria.isPresent,
      language,
    }),
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
    reportTitle("Microscopie", language),
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
