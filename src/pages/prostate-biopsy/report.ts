import { FORMS, FormId } from "../../ui/helpers/forms";
import { sum } from "../../ui/helpers/helpers";
import { toYesNo } from "../../ui/helpers/options";
import { pluralize } from "../../ui/helpers/plural";
import {
  joinLines,
  joinSections,
  naturalJoin,
  pad,
  padSection,
} from "../../ui/helpers/text";
import { formatWithUnit } from "../../ui/helpers/units";
import { Language, translate } from "../../ui/language";
import { FormState } from "./ProstateBiopsyForm";
import {
  DEFAULT_GLEASON_ITEM,
  PiradsItem,
  Row,
  Score,
  getGleasonSummary,
  getIsupScore,
  getLocationLabel,
  getTumorTypeOption,
} from "./helpers";

type ReportParams = FormState & {
  formId: FormId;
  score: Score;
  comment: string;
  language: Language;
};

const formatSize = (
  tumorSize: number,
  totalSize: number,
  language: Language,
) => {
  // NOTE: inline translation
  // TODO: add an error if any size field is zero (add validation directly on the field?) and remove this case
  if (!totalSize) {
    if (language === "FR") {
      return `(${tumorSize} mm examinés)`;
    }

    if (language === "EN") {
      return `(${tumorSize} mm examined)`;
    }
  }

  const ratio = Math.round((tumorSize / totalSize) * 100);

  // NOTE: inline translation
  if (language === "FR") {
    return `(${tumorSize} mm sur ${totalSize} mm examinés, ${ratio}%)`;
  }

  if (language === "EN") {
    return `(${tumorSize} mm out of ${totalSize} mm examined, ${ratio}%)`;
  }
};

const getTitle = (formId: FormId, language: Language) =>
  translate(FORMS[formId].title, language).toLocaleUpperCase();

const renderPiradsItem = (
  item: PiradsItem,
  rows: Row[],
  language: Language,
) => {
  const matches = rows
    .filter((row) => row.type === "target" && row.location === item.location)
    .map(({ index }) => index);
  const containerCount = matches.length
    ? ` (${pluralize(matches.length, translate("pot", language))} ${naturalJoin(matches, language)})`
    : undefined;

  return pad(
    `PIRADS ${item.score}, ${getLocationLabel(item.location, language).toLocaleLowerCase()}${containerCount}`,
  );
};

const getClinicalInformationSection = (
  form: ReportParams,
  language: Language,
) => {
  if (!form.hasInfo) {
    return undefined;
  }

  return joinLines([
    `${translate("Renseignements cliniques", language)}:`,
    pad(
      `${translate("PSA", language)}: ${formatWithUnit(form.psaRate, "ng-per-mL")}`,
    ),
    pad(`${translate("IRM", language)}: ${toYesNo(form.hasMri, language)}`),
    ...(form.piradsItems.length
      ? [
          `${translate("Cibles", language)}:`,
          ...form.piradsItems.map((item) =>
            renderPiradsItem(item, form.rows, language),
          ),
        ].map(pad)
      : []),
  ]);
};

const getCommentSection = (form: ReportParams, language: Language) => {
  return form.comment
    ? joinLines([
        `${translate("Remarques particulières", language)}:`,
        padSection(form.comment),
      ])
    : undefined;
};

const getConclusionSection = (
  { rows, score, tumorType }: ReportParams,
  language: Language,
) => {
  // Pre-compute values to insert in the template
  const { label: tumorTypeLabel } = getTumorTypeOption(tumorType);
  const sextans = rows.filter((row) => row.type === "sextan");
  const sextansWithTumor = sextans.filter((row) => row.tumorCount > 0);
  const targets = rows.filter((row) => row.type === "target");
  const targetsWithTumor = targets.filter((row) => row.tumorCount > 0);
  const maxGleasonItem = score.tumorGleason ?? DEFAULT_GLEASON_ITEM;
  const isupScore = getIsupScore(maxGleasonItem);
  const gleasonSummary = getGleasonSummary(maxGleasonItem, language);
  const sextanTumorSize = sum(sextans.map((item) => sum(item.tumorSize)));
  const sextanBiopsySize = sum(sextans.map((item) => sum(item.biopsySize)));
  const targetTumorSize = sum(targets.map((item) => sum(item.tumorSize)));
  const targetBiopsySize = sum(targets.map((item) => sum(item.biopsySize)));

  // TODO: use templates instead of joins?

  // Tumor absence
  if (score.tumorCount === 0) {
    // NOTE: inline translation
    if (language === "FR") {
      return `Absence de foyer tumoral sur l'ensemble des ${score.biopsyCount} biopsies étudiées (${score.biopsySize} mm).
Adénomyome prostatique.`;
    }

    if (language === "EN") {
      return `No tumor seen among the ${score.biopsyCount} studied biopsies (${score.biopsySize} mm).
Prostate adenomyoma.`;
    }
  }

  // NOTE: inline translation
  if (language === "FR") {
    return joinLines([
      `${translate(tumorTypeLabel, language)}.\n`, // We add an empty line for aesthetic purposes
      `Il présente un score de Gleason ${gleasonSummary}, soit un score ISUP de ${isupScore}.`,
      `Il est localisé sur ${sextansWithTumor.length} des ${sextans.length} biopsies systématiques ${formatSize(sextanTumorSize, sextanBiopsySize, language)} et sur ${targetsWithTumor.length} des ${targets.length} biopsies ciblées ${formatSize(targetTumorSize, targetBiopsySize, language)}.`,
      `Il mesure ${score.tumorSize} mm sur ${score.biopsySize} mm examinés sur les biopsies standards.\n`, // We add an empty line for aesthetic purposes,
      `${translate("Envahissement périneural", language)} : ${toYesNo(score.tumorEpn ?? false, language)}`,
      `${translate("Tissu extra-prostatique", language)} : ${toYesNo(score.tumorTep ?? false, language)}`,
    ]);
  }

  if (language === "EN") {
    return joinLines([
      `${translate(tumorTypeLabel, language)}.\n`, // We add an empty line for aesthetic purposes
      `It has a Gleason score of ${gleasonSummary}, i.e. an ISUP score of ${isupScore}.`,
      `It is localized on ${sextansWithTumor.length} out of ${sextans.length} systematic biopsies ${formatSize(sextanTumorSize, sextanBiopsySize, language)} and on ${targetsWithTumor.length} out of ${targets.length} targeted biopsies ${formatSize(targetTumorSize, targetBiopsySize, language)}.`,
      `It has a size of ${score.tumorSize} mm out of ${score.biopsySize} mm examined on systematic biopsies.\n`, // We add an empty line for aesthetic purposes,
      `${translate("Envahissement périneural", language)} : ${toYesNo(score.tumorEpn ?? false, language)}`,
      `${translate("Tissu extra-prostatique", language)} : ${toYesNo(score.tumorTep ?? false, language)}`,
    ]);
  }
};

// TODO: test extensively
export const generateReport = (form: ReportParams): string => {
  const { formId, language } = form;

  return joinSections([
    getTitle(formId, language),
    getClinicalInformationSection(form, language),
    getCommentSection(form, language),
    getConclusionSection(form, language),
  ]);
};
