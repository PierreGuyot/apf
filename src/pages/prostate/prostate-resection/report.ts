import { reportCaseSummary } from "../../../common/case-summary.report";
import { reportEpn } from "../../../common/epn/report";
import { reportInvasion } from "../../../common/invasion/report";
import { reportResectionMacroscopy } from "../../../common/resection-macroscopy/report";
import {
  Language,
  Lines,
  assertUnreachable,
  getSelectedOptions,
  item,
  reportCheckboxList,
  reportStructure,
  translate,
} from "../../../ui";
import {
  OTHER_LESION_GROUPS,
  getGleasonConclusion,
  getTumorTypeOption,
} from "../helpers";
import { reportImmunohistochemistry } from "../report";
import { FormState } from "./ProstateResectionForm";
import {
  ProstateResectionFormId,
  getPriorConditionOption,
  getTumorQuantificationOption,
  isApplicable,
} from "./helpers";

export type ReportParams = FormState & {
  formId: ProstateResectionFormId;
};

// NOTE: inline translation
const reportConclusion = (form: ReportParams, language: Language): Lines => {
  const t = (value: string) => translate(value, language);

  // Tumor presence
  if (form.mainLesionType === "tumor") {
    const { label: tumorTypeLabel } = getTumorTypeOption(form.tumorType);
    const { label: priorConditionsLabel } = getPriorConditionOption(
      form.priorConditions,
    );
    const { label: tumorQuantificationLabel } = getTumorQuantificationOption(
      form.tumorQuantification,
    );

    return [
      `${t(tumorTypeLabel)}.\n`, // We add an empty line for aesthetic purposes
      item("Conditions pré-existantes", priorConditionsLabel, language),
      isApplicable(form.priorConditions)
        ? // FIXME: will break translate on debug
          item(
            "Score de Gleason",
            getGleasonConclusion(form.histologicalGrade, language),
            language,
          )
        : "",
      item(
        "Estimation de la surface envahie",
        tumorQuantificationLabel,
        language,
      ),
      reportInvasion(form.hasLymphaticOrVascularInvasion, language),
      reportEpn(form.hasEpn, language),
    ];
  }

  // Tumor absence

  if (form.mainLesionType === "prostate-adenomyoma") {
    switch (language) {
      case "FR":
        return [
          "On observe des glandes prostatiques nombreuses souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse. Absence de foyer carcinomateux.",
        ];

      case "EN":
        return [
          "Numerous prostate glands, often grouped into nodules, are found within a smooth muscular prostatic stroma. No carcinomatous focus.",
        ];
    }
  }

  if (
    form.mainLesionType === "prostate-adenomyoma-and-granulomatous-inflammation"
  ) {
    switch (language) {
      case "FR":
        return [
          "On observe des glandes prostatiques nombreuses autour desquelles s'organisent des granulomes macrophagiques avec cellules épithélioïdes et cellules géantes centrées par de la nécrose et des polynucléaires. Les glandes sont souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse inflammatoire. Absence de foyer carcinomateux.",
        ];

      case "EN":
        return [
          "Numerous prostate glands are present, surrounded by macrophagic granulomas with epithelioid cells and giant cells, centered by necrosis and neutrophils. Glands are often grouped in nodules, within an inflammatory smooth muscle prostatic stroma. No carcinomatous focus.",
        ];
    }
  }

  if (
    form.mainLesionType === "prostate-adenomyoma-and-nonspecific-inflammation"
  ) {
    switch (language) {
      case "FR":
        return [
          "On observe des glandes prostatiques nombreuses souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse. Sur de nombreux copeaux, les glandes sont entourées d’un infiltrat lymphocytaire non spécifique. Absence de foyer carcinomateux.",
        ];

      case "EN":
        return [
          "Numerous prostate glands, often grouped in nodules, are found within a smooth muscular prostatic stroma. On many chips, the glands are surrounded by a nonspecific lymphocytic infiltrate. No carcinomatous focus.",
        ];
    }
  }

  return assertUnreachable(form.mainLesionType);
};

const reportOtherLesions = (form: ReportParams, language: Language): Lines => {
  const selectedItems = getSelectedOptions({
    values: form.otherLesions,
    groups: OTHER_LESION_GROUPS,
  }).map((item) => item.label);

  return reportCheckboxList({
    title: "Autres lésions",
    items: selectedItems,
    language,
  });
};

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
): string => {
  return reportStructure(form.formId, language, [
    reportCaseSummary(form.caseSummary, language),
    reportResectionMacroscopy(form, language),
    reportImmunohistochemistry(form.ihc, language, false),
    reportConclusion(form, language),
    reportOtherLesions(form, language),
  ]);
};
