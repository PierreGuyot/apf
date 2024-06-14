import { getSelectedItems } from "../../../ui/SelectList";
import { getFormTitle } from "../../../ui/helpers/forms";
import { assertUnreachable } from "../../../ui/helpers/helpers";
import { toYesNo } from "../../../ui/helpers/options";
import {
  joinLines,
  joinSections,
  pad,
  padSection,
} from "../../../ui/helpers/text";
import { Language, translate } from "../../../ui/language";
import {
  OTHER_LESION_GROUPS,
  getGleasonSummary,
  getTumorTypeOption,
} from "../helpers";
import { FormState } from "./ProstateResectionForm";
import {
  ProstateResectionFormId,
  getPriorConditionOption,
  getSamplingTypeOption,
  getTumorQuantificationOption,
  isApplicable,
} from "./helpers";

export type ReportParams = FormState & {
  formId: ProstateResectionFormId;
};

const getCaseSummarySection = (form: ReportParams, language: Language) => {
  return form.caseSummary
    ? joinLines([
        `${translate("Renseignements cliniques", language)}:`,
        padSection(form.caseSummary),
      ])
    : undefined;
};

const getMacroscopySection = (form: ReportParams, language: Language) => {
  const { label: samplingTypeLabel } = getSamplingTypeOption(form.samplingType);

  return joinLines([
    `${translate("Poids des copeaux", language)} : ${form.chipWeight}g`,
    // NOTE: inline translation
    language === "FR"
      ? `${translate(samplingTypeLabel, language)} en ${form.blockCount} blocs (fixation : formol tamponné 4%, coloration ${form.coloration})`
      : `${translate(samplingTypeLabel, language)} in ${form.blockCount} blocks (fixation : buffered formalin 4%, stain ${form.coloration})`,
  ]);
};

// NOTE: inline translation
const getConclusionSection = (form: ReportParams, language: Language) => {
  // Tumor presence
  if (form.mainLesionType === "tumor") {
    const { label: tumorTypeLabel } = getTumorTypeOption(form.tumorType);
    const { label: priorConditionsLabel } = getPriorConditionOption(
      form.priorConditions,
    );
    const { label: tumorQuantificationLabel } = getTumorQuantificationOption(
      form.tumorQuantification,
    );

    return joinLines([
      `${translate(tumorTypeLabel, language)}.\n`, // We add an empty line for aesthetic purposes
      `${translate("Conditions pré-existantes", language)} : ${translate(priorConditionsLabel, language)}`,
      isApplicable(form.priorConditions)
        ? `${translate("Score de Gleason", language)} : ${getGleasonSummary(form.histologicalGrade, language)}`
        : "",
      `${translate("Estimation de la surface envahie", language)} : ${translate(tumorQuantificationLabel, language)}`,
      `${translate("Emboles vasculaires ou lymphatiques", language)} : ${toYesNo(form.hasLymphaticOrVascularInvasion, language)}`,
      `${translate("Engainements périnerveux", language)} : ${toYesNo(form.hasEpn, language)}`,
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
  const selectedItems = getSelectedItems({
    value: form.otherLesions,
    groups: OTHER_LESION_GROUPS,
  });

  if (!selectedItems.length) {
    return undefined;
  }

  return joinLines([
    `${translate("Autres lésions", language)} :`,
    ...selectedItems.map((item) =>
      pad(` - ${translate(item.label, language)}`),
    ),
  ]);
};

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    getCaseSummarySection(form, language),
    getMacroscopySection(form, language),
    getConclusionSection(form, language),
    getOtherLesionsSection(form, language),
  ]);
};
