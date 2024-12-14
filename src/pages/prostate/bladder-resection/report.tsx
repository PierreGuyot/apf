import { reportAdditionalRemarks } from "../../../common/additional-remarks.report";
import { reportCaseSummary } from "../../../common/case-summary.report";
import { reportInvasion } from "../../../common/invasion/report";
import { reportResectionMacroscopy } from "../../../common/resection-macroscopy/report";
import {
  filterNullish,
  FormId,
  item,
  Language,
  Lines,
  reportBoolean,
  reportSection,
  reportSelectList,
  reportStructure,
} from "../../../ui";
import { FormState } from "./BladderResectionForm";
import {
  getLesionAspectOption,
  getLocationOption,
  getTreatmentOption,
} from "./helpers";
import { reportTumor } from "./tumor-input/report";

export type ReportParams = FormState & {
  formId: Extract<FormId, "bladder-transurethral-resection">;
};

export const generateReport = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string => {
  return reportStructure(form.formId, language, [
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
): Lines => {
  // Expert mode
  if (isExpertMode) {
    return [
      reportBoolean({
        label:
          "Antécédents de maladie des voies urinaires ou de métastases à distance",
        value: form.medicalHistory,
        language,
      }),
      ...(form.medicalHistory
        ? [
            ...reportTumor({ tumor: form.previousTumor, language }),
            item(
              "Localisation",
              getLocationOption(form.location.location).label,
              language,
            ),
            ...reportSelectList({
              title: "Traitements antérieurs",
              items: form.previousTreatments.map(
                (value) => getTreatmentOption(value).label,
              ),
              language,
              emptyState: "absence de traitement antérieur",
            }),
            item(
              "Aspect cystoscopique de la lésion actuelle",
              getLesionAspectOption(form.lesionAspect).label,
              language,
            ),
          ]
        : []),
    ];
  }

  // Standard mode
  return reportCaseSummary(form.clinicalInfo, language);
};

const getMacroscopySection = (
  form: ReportParams,
  language: Language,
): Lines => {
  const content = reportResectionMacroscopy(form, language);
  return reportSection({ title: "Macroscopie", language, content });
};

const getMicroscopySection = (
  form: ReportParams,
  language: Language,
): Lines => {
  const otherResults = reportSection({
    title: "Autres résultats",
    language,
    content: [
      ...reportSelectList({
        title: "Tumoraux",
        items: form.otherResults.tumoral,
        language,
      }),
      ...reportSelectList({
        title: "Non-tumoraux",
        items: form.otherResults.nonTumoral,
        language,
      }),
    ],
  });

  const content = [
    ...reportTumor({
      tumor: form.tumor,
      language,
      hasGrade: true,
      hasExtension: true,
    }),

    "", // Empty line
    reportInvasion(form.hasLymphaticOrVascularInvasion, language),

    "", // Empty line
    reportBoolean({
      label: "Copeaux de résection présentant de la musculeuse",
      value: form.muscularisPropria.isPresent,
      language,
    }),
    form.muscularisPropria.isPresent
      ? // FIXME: will break translate on debug
        item(
          "Nombre de copeaux",
          String(form.muscularisPropria.chipCount),
          language,
        )
      : undefined,
    "", // Empty line
    ...otherResults,
  ].filter(filterNullish);

  return reportSection({ title: "Microscopie", language, content });
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
