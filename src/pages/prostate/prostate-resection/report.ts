import { getResectionMacroscopySection } from "../../../common/resection-macroscopy/report";
import { getConclusionInvasion } from "../../../common/invasion/report";
import { getConclusionEpn } from "../../../common/epn/report";
import {
  COLON_CHARACTER,
  Language,
  assertUnreachable,
  formatList,
  getFormTitle,
  getSelectedOptions,
  joinLines,
  joinSections,
  padSection,
  translate,
} from "../../../ui";
import {
  OTHER_LESION_GROUPS,
  getGleasonConclusion,
  getTumorTypeOption,
} from "../helpers";
import { getImmunohistochemistrySection } from "../report";
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

const getCaseSummarySection = (form: ReportParams, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return form.caseSummary
    ? joinLines([
        `${t("Renseignements cliniques")}${colon}`,
        padSection(form.caseSummary),
      ])
    : undefined;
};

// NOTE: inline translation
const getConclusionSection = (form: ReportParams, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  // Tumor presence
  if (form.mainLesionType === "tumor") {
    const { label: tumorTypeLabel } = getTumorTypeOption(form.tumorType);
    const { label: priorConditionsLabel } = getPriorConditionOption(
      form.priorConditions,
    );
    const { label: tumorQuantificationLabel } = getTumorQuantificationOption(
      form.tumorQuantification,
    );

    // TODO clean: extract simple helper for key value items
    return joinLines([
      `${t(tumorTypeLabel)}.\n`, // We add an empty line for aesthetic purposes
      `${t("Conditions pré-existantes")}${colon} ${t(priorConditionsLabel)}`,
      isApplicable(form.priorConditions)
        ? `${t("Score de Gleason")}${colon} ${getGleasonConclusion(form.histologicalGrade, language)}`
        : "",
      `${t("Estimation de la surface envahie")}${colon} ${t(tumorQuantificationLabel)}`,
      getConclusionInvasion(form.hasLymphaticOrVascularInvasion, language),
      getConclusionEpn(form.hasEpn, language),
    ]);
  }

  // Tumor absence

  if (form.mainLesionType === "prostate-adenomyoma") {
    switch (language) {
      case "FR":
        return "On observe des glandes prostatiques nombreuses souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse. Absence de foyer carcinomateux.";

      case "EN":
        return "Numerous prostate glands, often grouped into nodules, are found within a smooth muscular prostatic stroma. No carcinomatous focus.";
    }
  }

  if (
    form.mainLesionType === "prostate-adenomyoma-and-granulomatous-inflammation"
  ) {
    switch (language) {
      case "FR":
        return "On observe des glandes prostatiques nombreuses autour desquelles s'organisent des granulomes macrophagiques avec cellules épithélioïdes et cellules géantes centrées par de la nécrose et des polynucléaires. Les glandes sont souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse inflammatoire. Absence de foyer carcinomateux.";

      case "EN":
        return "Numerous prostate glands are present, surrounded by macrophagic granulomas with epithelioid cells and giant cells, centered by necrosis and neutrophils. Glands are often grouped in nodules, within an inflammatory smooth muscle prostatic stroma. No carcinomatous focus.";
    }
  }

  if (
    form.mainLesionType === "prostate-adenomyoma-and-nonspecific-inflammation"
  ) {
    switch (language) {
      case "FR":
        return "On observe des glandes prostatiques nombreuses souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse. Sur de nombreux copeaux, les glandes sont entourées d’un infiltrat lymphocytaire non spécifique. Absence de foyer carcinomateux.";

      case "EN":
        return "Numerous prostate glands, often grouped in nodules, are found within a smooth muscular prostatic stroma. On many chips, the glands are surrounded by a nonspecific lymphocytic infiltrate. No carcinomatous focus.";
    }
  }

  return assertUnreachable(form.mainLesionType);
};

const getOtherLesionsSection = (form: ReportParams, language: Language) => {
  const selectedItems = getSelectedOptions({
    values: form.otherLesions,
    groups: OTHER_LESION_GROUPS,
  }).map((item) => item.label);

  return joinLines(
    formatList({
      title: "Autres lésions",
      items: selectedItems,
      language,
    }),
  );
};

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    getCaseSummarySection(form, language),
    joinLines(getResectionMacroscopySection(form, language)),
    getImmunohistochemistrySection(form.ihc, language, false),
    getConclusionSection(form, language),
    getOtherLesionsSection(form, language),
  ]);
};
