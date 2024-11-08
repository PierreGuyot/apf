import { reportAdditionalRemarks } from "../../../common/additional-remarks.report";
import { reportEpn } from "../../../common/epn/report";
import {
  COLON_CHARACTER,
  filterEmpty,
  filterNullish,
  formatWithUnit,
  getFormTitle,
  item,
  joinLines,
  joinSections,
  Language,
  naturalJoin,
  pluralize,
  reportBoolean,
  reportSection,
  reportTextArea,
  sum,
  sumOnField,
  translate,
} from "../../../ui";
import {
  DEFAULT_GLEASON_ITEM,
  getGleasonConclusion,
  getTumorTypeOption,
} from "../helpers";
import { reportImmunohistochemistry } from "../report";
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

// TODO CLEAN: colocate with associated component
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

  return `PIRADS ${item.score}, ${getLocationLabel(formId, item.location, language).toLocaleLowerCase()}${containerCount}`;
};

const getClinicalInformationSection = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string[] => {
  if (!form.hasInfo) {
    return [];
  }

  if (!isExpertMode) {
    return reportTextArea(
      "Renseignements cliniques",
      form.clinicalInfo.trim(),
      language,
    );
  }

  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const content = [
    `${t("PSA")}${colon} ${formatWithUnit(form.psaRate, "ng-per-mL")}`,
    reportBoolean({ label: "IRM", value: form.hasMri, language }),
    ...reportSection(
      "Cibles",
      language,
      form.piradsItems.map((item) =>
        renderPiradsItem(form.formId, item, form.rows, language),
      ),
    ),
  ];

  return reportSection("Renseignements cliniques", language, content, true);
};

const getLocations = (rows: Row[], language: Language) => {
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

  const content = [
    `${t("Biopsies systématiques")}${colon} ${getLocations(sextants, language)}`, // Systematic biopsies are mandatory
    targets.length
      ? `${t("Biopsies ciblées")}${colon} ${getLocations(targets, language)}`
      : undefined, // Targets are optional
    language === "FR"
      ? `${t("Total")}${colon} ${tumorSize}mm sur ${totalSize}mm examinés (${containerLocations})`
      : `${t("Total")}${colon} ${tumorSize}mm out of ${totalSize}mm examined (${containerLocations})`,
  ].filter(filterEmpty);

  return reportSection("Localisation", language, content);
};

const reportTep = (
  formId: "prostate-biopsy-transrectal" | "prostate-biopsy-transperineal",
  rows: Row[],
  score: Score,
  language: Language,
) => {
  const valuePart = reportBoolean({
    label: "Tissu extra-prostatique",
    value: score.tumorTep ?? false,
    language,
  });

  const locations = formatLocations(
    formId,
    language,
    rows.filter((row) => !!row.tumorTep),
  );
  const locationPart = score.tumorTep ? ` (${locations})` : "";

  return `${valuePart}${locationPart}`;
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
      return [
        `Absence de foyer tumoral sur l'ensemble des ${score.biopsyCount} biopsies étudiées (${score.biopsySize} mm).`,
        "Adénomyome prostatique.",
      ];
    }

    if (language === "EN") {
      return [
        `No tumor seen among the ${score.biopsyCount} studied biopsies (${score.biopsySize} mm).`,
        "Prostate adenomyoma.",
      ];
    }
  }

  // Tumor presence

  const { label: tumorTypeLabel } = getTumorTypeOption(tumorType);
  const maxGleasonItem = score.tumorGleason ?? DEFAULT_GLEASON_ITEM;
  const lineGleason = `${t("Score de Gleason")}${colon} ${getGleasonConclusion(maxGleasonItem, language)}`;
  const locationSection = getLocationSection(formId, rows, language);

  return [
    `${item("Type de tumeur", tumorTypeLabel, language)}.`,
    lineGleason,
    ...(isExpertMode ? locationSection : []),
    "", // Empty line
    reportEpn(score.tumorEpn ?? false, language),
    reportTep(formId, rows, score, language),
  ].filter(filterNullish);
};

const getConclusionSection = (
  params: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string[] => {
  return reportSection(
    "Conclusion",
    language,
    getConclusionContent(params, language, isExpertMode),
    true,
  );
};

export const generateReport = (
  form: ReportParams,
  language: Language,
  isExpertMode: boolean,
): string => {
  return joinSections([
    getFormTitle(form.formId, language),
    joinLines(getClinicalInformationSection(form, language, isExpertMode)),
    joinLines(reportImmunohistochemistry(form.ihc, language, true)),
    joinLines(reportAdditionalRemarks(form, language)),
    joinLines(getConclusionSection(form, language, isExpertMode)),
  ]);
};

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
