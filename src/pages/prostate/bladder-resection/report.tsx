import { reportAdditionalRemarks } from "../../../common/additional-remarks.report";
import { reportCaseSummary } from "../../../common/case-summary.report";
import { reportInvasion } from "../../../common/invasion/report";
import { getResectionMacroscopySection } from "../../../common/resection-macroscopy/report";
import {
  filterNullish,
  FormId,
  getFormTitle,
  item,
  join,
  joinLines,
  joinSections,
  Language,
  reportCheckboxList,
  reportSection,
  reportTroolean,
  reportValue,
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
    const partPreviousTreatment = join(
      reportTroolean({
        label: "Traitements antérieurs",
        value: form.hadPreviousTreatment,
        language,
      }),
      form.hadPreviousTreatment
        ? `(${reportValue(getTreatmentOption(form.previousTreatment).label, language)})`
        : undefined,
    );

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
  const content = getResectionMacroscopySection(form, language);
  return joinLines(reportSection("Macroscopie", language, content));
};

const getMicroscopySection = (form: ReportParams, language: Language) => {
  const otherResults = reportSection("Autres résultats", language, [
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
  ]);

  const content = [
    ...getTumorTypeSection({
      tumor: form.tumor,
      language,
      hasGrade: true,
      hasExtension: true,
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
      ? // FIXME: will break translate on debug
        item(
          "Nombre de copeaux",
          String(form.muscularisPropria.chipCount),
          language,
        )
      : // FIXME: will break translate on debug
        form.muscularisPropria.isPresent === "unspecified"
        ? item("Commentaire", form.muscularisPropria.notes, language)
        : undefined,
    "", // Empty line
    ...otherResults,
  ].filter(filterNullish);

  return joinLines(reportSection("Microscopie", language, content));
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
