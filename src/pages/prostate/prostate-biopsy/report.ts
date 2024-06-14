import { getFormTitle } from "../../../ui/helpers/forms";
import { sum, sumOnField } from "../../../ui/helpers/helpers";
import { toYesNo } from "../../../ui/helpers/options";
import { pluralize } from "../../../ui/helpers/plural";
import {
  joinLines,
  joinSections,
  naturalJoin,
  pad,
  padSection,
} from "../../../ui/helpers/text";
import { formatWithUnit } from "../../../ui/helpers/units";
import { COLON_CHARACTER, Language, translate } from "../../../ui/language";
import {
  DEFAULT_GLEASON_ITEM,
  getGleasonSummary,
  getTumorTypeOption,
} from "../helpers";
import { FormState } from "./ProstateBiopsyForm";
import {
  PiradsItem,
  ProstateBiopsyFormId,
  Row,
  Score,
  getIsupScore,
  getLocationLabel,
} from "./helpers";

export type ReportParams = FormState & {
  formId: ProstateBiopsyFormId;
  score: Score;
  comment: string;
};

const formatSize = (
  tumorSize: number,
  totalSize: number,
  language: Language,
) => {
  if (!totalSize) {
    return "";
  }

  const ratio = Math.round((tumorSize / totalSize) * 100);

  // NOTE: inline translation
  if (language === "FR") {
    return ` (${tumorSize} mm sur ${totalSize} mm examinés, ${ratio}%)`;
  }

  if (language === "EN") {
    return ` (${tumorSize} mm out of ${totalSize} mm examined, ${ratio}%)`;
  }
};

const renderPiradsItem = (
  formId: ProstateBiopsyFormId,
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
    `PIRADS ${item.score}, ${getLocationLabel(formId, item.location, language).toLocaleLowerCase()}${containerCount}`,
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
    `${translate("Renseignements cliniques", language)}${translate(COLON_CHARACTER, language)}`,
    pad(
      `${translate("PSA", language)}: ${formatWithUnit(form.psaRate, "ng-per-mL")}`,
    ),
    pad(`${translate("IRM", language)}: ${toYesNo(form.hasMri, language)}`),
    ...(form.piradsItems.length
      ? [
          `${translate("Cibles", language)}${translate(COLON_CHARACTER, language)}`,
          ...form.piradsItems.map((item) =>
            renderPiradsItem(form.formId, item, form.rows, language),
          ),
        ].map(pad)
      : []),
  ]);
};

const getCommentSection = (form: { comment: string }, language: Language) => {
  return form.comment
    ? joinLines([
        `${translate("Remarques particulières", language)}${translate(COLON_CHARACTER, language)}`,
        padSection(form.comment),
      ])
    : undefined;
};

const getConclusionSection = (
  { rows, score, tumorType }: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  // Pre-compute values to insert in the template
  const { label: tumorTypeLabel } = getTumorTypeOption(tumorType);
  const sextants = rows.filter((row) => row.type === "sextant");
  const sextantsWithTumor = sextants.filter((row) => row.tumorCount > 0);
  const targets = rows.filter((row) => row.type === "target");
  const targetsWithTumor = targets.filter((row) => row.tumorCount > 0);
  const maxGleasonItem = score.tumorGleason ?? DEFAULT_GLEASON_ITEM;
  const isupScore = getIsupScore(maxGleasonItem);
  const gleasonSummary = getGleasonSummary(maxGleasonItem, language);
  const sextantTumorSize = sum(sextants.map((item) => sum(item.tumorSize)));
  const sextantBiopsySize = sum(sextants.map((item) => sum(item.biopsySize)));
  const targetTumorSize = sum(targets.map((item) => sum(item.tumorSize)));
  const targetBiopsySize = sum(targets.map((item) => sum(item.biopsySize)));

  // TODO clean: use templates instead of joins?

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

  const totalTumorCountStandard = sumOnField("tumorCount", sextants);
  const totalBiopsyCountStandard = sumOnField("biopsyCount", sextants);
  const totalTumorCountTargeted = sumOnField("tumorCount", targets);
  const totalBiopsyCountTargeted = sumOnField("biopsyCount", targets);

  // NOTE: inline translation
  if (language === "FR") {
    const detailsSextants = isExpertMode
      ? formatSize(sextantTumorSize, sextantBiopsySize, language)
      : "";
    const detailsTargets = isExpertMode
      ? formatSize(targetTumorSize, targetBiopsySize, language)
      : "";

    return joinLines([
      `${translate(tumorTypeLabel, language)}.\n`, // We add an empty line for aesthetic purposes
      `Il présente un score de Gleason ${gleasonSummary}, soit un score ISUP de ${isupScore}.`,
      `Il est localisé sur ${totalTumorCountStandard} des ${totalBiopsyCountStandard} biopsies systématiques${detailsSextants} et sur ${totalTumorCountTargeted} des ${totalBiopsyCountTargeted} biopsies ciblées${detailsTargets}.`,
      isExpertMode
        ? `Il mesure ${score.tumorSize} mm sur ${score.biopsySize} mm examinés sur la totalité des biopsies examinés.\n` // We add an empty line for aesthetic purposes,
        : "",
      `${translate("Engainements périnerveux", language)} : ${toYesNo(score.tumorEpn ?? false, language)}`,
      `${translate("Tissu extra-prostatique", language)} : ${toYesNo(score.tumorTep ?? false, language)}`,
    ]);
  }

  if (language === "EN") {
    const detailsSextants = isExpertMode
      ? formatSize(sextantTumorSize, sextantBiopsySize, language)
      : "";
    const detailsTargets = isExpertMode
      ? formatSize(targetTumorSize, targetBiopsySize, language)
      : "";

    return joinLines([
      `${translate(tumorTypeLabel, language)}.\n`, // We add an empty line for aesthetic purposes
      `It has a Gleason score of ${gleasonSummary}, i.e. an ISUP score of ${isupScore}.`,
      `It is localized on ${sextantsWithTumor.length} out of ${sextants.length} systematic biopsies${detailsSextants} and on ${targetsWithTumor.length} out of ${targets.length} targeted biopsies ${detailsTargets}.`,
      isExpertMode
        ? `It has a size of ${score.tumorSize} mm out of ${score.biopsySize} mm examined on all biopsies.\n` // We add an empty line for aesthetic purposes
        : "",
      `${translate("Engainements périnerveux", language)} : ${toYesNo(score.tumorEpn ?? false, language)}`,
      `${translate("Tissu extra-prostatique", language)} : ${toYesNo(score.tumorTep ?? false, language)}`,
    ]);
  }
};

// TODO clean: test extensively
export const generateReport = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    getClinicalInformationSection(form, language),
    getCommentSection(form, language),
    getConclusionSection(form, language, isExpertMode),
  ]);
};
