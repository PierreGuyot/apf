import { getCommentSection } from "../../../common/comment-section";
import { getConclusionEpn } from "../../../common/epn/report";
import {
  COLON_CHARACTER,
  filterEmpty,
  filterNullish,
  formatWithUnit,
  getFormTitle,
  joinLines,
  joinSections,
  Language,
  naturalJoin,
  pad,
  pluralize,
  sum,
  sumOnField,
  toYesNo,
  translate,
} from "../../../ui";
import {
  DEFAULT_GLEASON_ITEM,
  getGleasonConclusion,
  getTumorTypeOption,
} from "../helpers";
import { getImmunohistochemistrySection } from "../report";
import { FormState } from "./ProstateBiopsyForm";
import {
  getLocationLabel,
  PiradsItem,
  ProstateBiopsyFormId,
  Row,
  Score,
} from "./helpers";

export type ReportParams = FormState & {
  formId: ProstateBiopsyFormId;
  score: Score;
};

const renderPiradsItem = (
  formId: ProstateBiopsyFormId,
  item: PiradsItem,
  rows: Row[],
  language: Language,
) => {
  const t = (value: string) => translate(value, language);

  const matches = rows
    .filter((row) => row.type === "target" && row.location === item.location)
    .map(({ index }) => index + 1);
  const containerCount = matches.length
    ? ` (${pluralize(matches.length, t("pot"))} ${naturalJoin(matches, language)})`
    : undefined;

  return pad(
    `PIRADS ${item.score}, ${getLocationLabel(formId, item.location, language).toLocaleLowerCase()}${containerCount}`,
  );
};

const getClinicalInformationContent = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  if (!form.hasInfo) {
    return undefined;
  }

  if (!isExpertMode) {
    return form.clinicalInfo.trim();
  }

  return joinLines([
    pad(`${t("PSA")}: ${formatWithUnit(form.psaRate, "ng-per-mL")}`),
    pad(`${t("IRM")}: ${toYesNo(form.hasMri, language)}`),
    ...(form.piradsItems.length
      ? [
          `${t("Cibles")}${colon}`,
          ...form.piradsItems.map((item) =>
            renderPiradsItem(form.formId, item, form.rows, language),
          ),
        ].map(pad)
      : []),
  ]);
};

const getClinicalInformationSection = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const content = getClinicalInformationContent(form, language, isExpertMode);

  if (!content) {
    return undefined;
  }

  return joinLines([
    `${t("Renseignements cliniques")}${colon}`,
    "", // Empty line
    content,
  ]);
};

const getTumorLocation = (rows: Row[], language: Language) => {
  const tumorCount = sumOnField("tumorCount", rows);
  const totalCount = sumOnField("biopsyCount", rows);
  const tumorSize = sum(rows.map((item) => sum(item.tumorSize)));
  const totalSize = sum(rows.map((item) => sum(item.biopsySize)));
  const percentage = Math.round((tumorSize / totalSize) * 100);

  return language === "FR"
    ? `${tumorCount} des ${totalCount} biopsies (${tumorSize}mm sur ${totalSize}mm examinés, ${percentage}%)`
    : `${tumorCount} out of ${totalCount} biopsies (${tumorSize}mm out of ${totalSize}mm examined, ${percentage}%)`;
};

const formatLocations = (
  formId: "prostate-biopsy-transrectal" | "prostate-biopsy-transperineal",
  language: Language,
  rows: Row[],
) => {
  return naturalJoin(
    Array.from(
      new Set(
        rows.map((row) =>
          getLocationLabel(formId, row.location, language).toLocaleLowerCase(),
        ),
      ),
    ),
    language,
  );
};

const getLocationSection = (
  formId: "prostate-biopsy-transrectal" | "prostate-biopsy-transperineal",
  rows: Row[],
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const sextants = rows.filter((row) => row.type === "sextant");
  const targets = rows.filter((row) => row.type === "target");
  const tumorSize = sum(rows.map((item) => sum(item.tumorSize)));
  const totalSize = sum(rows.map((item) => sum(item.biopsySize)));

  const containerLocations = formatLocations(
    formId,
    language,
    rows.filter((row) => row.tumorCount > 0),
  );

  return joinLines([
    `${t("Localisation")}${colon}`,
    ...[
      `${t("Biopsies systématiques")}${colon} ${getTumorLocation(sextants, language)}`, // Systematic biopsies are mandatory
      targets.length
        ? `${t("Biopsies ciblées")}${colon} ${getTumorLocation(targets, language)}`
        : undefined, // Targets are optional
      language === "FR"
        ? `${t("Total")}${colon} ${tumorSize}mm sur ${totalSize}mm examinés (${containerLocations})`
        : `${t("Total")}${colon} ${tumorSize}mm out of ${totalSize}mm examined (${containerLocations})`,
    ]
      .filter(filterEmpty)
      .map(pad),
  ]);
};

const getPartTep = (
  formId: "prostate-biopsy-transrectal" | "prostate-biopsy-transperineal",
  rows: Row[],
  score: Score,
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const locations = formatLocations(
    formId,
    language,
    rows.filter((row) => !!row.tumorTep),
  );
  const locationPart = score.tumorTep ? ` (${locations})` : "";

  return `${t("Tissu extra-prostatique")}${colon} ${toYesNo(score.tumorTep ?? false, language)}${locationPart}`;
};

const getConclusionContent = (
  { formId, rows, score, tumorType }: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

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

  // Tumor presence

  const { label: tumorTypeLabel } = getTumorTypeOption(tumorType);
  const maxGleasonItem = score.tumorGleason ?? DEFAULT_GLEASON_ITEM;
  const lineGleason = `${t("Score de Gleason")}${colon} ${getGleasonConclusion(maxGleasonItem, language)}`;
  const locationSection = getLocationSection(formId, rows, language);

  const partEpn = getConclusionEpn(score.tumorEpn ?? false, language);
  const partTep = getPartTep(formId, rows, score, language);
  return joinLines(
    [
      // TODO clean: only lowercase first letter (for safety)
      `${t("Type de tumeur")}${colon} ${t(tumorTypeLabel.toLocaleLowerCase())}.`,
      lineGleason,
      isExpertMode ? locationSection : undefined,
      "", // Empty line
      partEpn,
      partTep,
    ].filter(filterNullish),
  );
};

const getConclusionSection = (
  params: ReportParams,
  language: Language,
  isExpertMode: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return joinLines([
    `${t("Conclusion")}${colon}`,
    "", // Empty line
    getConclusionContent(params, language, isExpertMode),
  ]);
};

export const generateReport = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    getClinicalInformationSection(form, language, isExpertMode),
    getImmunohistochemistrySection(form.ihc, language, true),
    getCommentSection(form, language),
    getConclusionSection(form, language, isExpertMode),
  ]);
};

// TODO CLEAN: centralize joinLines
// TODO CLEAN: use to refactor generateReport into TSX
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
