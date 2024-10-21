import {
  AntibodyData,
  Block,
} from "../../../common/immunohistochemistry/helpers";
import { getFormTitle } from "../../../ui/helpers/forms";
import { filterEmpty, sum, sumOnField } from "../../../ui/helpers/helpers";
import { toYesNo } from "../../../ui/helpers/options";
import { pluralize } from "../../../ui/helpers/plural";
import {
  joinLines,
  joinSections,
  naturalJoin,
  nest,
  pad,
  padSection,
} from "../../../ui/helpers/text";
import { formatWithUnit } from "../../../ui/helpers/units";
import { COLON_CHARACTER, Language, translate } from "../../../ui/translation";
import {
  DEFAULT_GLEASON_ITEM,
  getGleasonConclusion,
  getResultOption,
  getTumorTypeOption,
} from "../helpers";
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
  comment: string;
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
    .map(({ index }) => index);
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

const renderAntibody = (antibody: AntibodyData, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  if (antibody.type === "others") {
    return joinLines(
      [
        `${t("Autres")}${colon}`,
        ...antibody.values
          .map(
            (value) =>
              `${value.name} (clone ${value.clone})${colon} ${t(value.result)}`,
          )
          .map(pad),
      ].map(nest(2)),
    );
  }

  const { label } = getResultOption(antibody.result);

  return joinLines(
    [
      `${t(antibody.type)} (${t("clone")} ${antibody.clone})${colon} ${t(label).toLocaleLowerCase()}`,
    ].map(nest(2)),
  );
};

const renderBlock = (block: Block, language: Language, isLast: boolean) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return joinLines([
    `${t("Bloc")} ${block.index}${colon}`,
    ...block.antibodies.map((antibody) => renderAntibody(antibody, language)),
    ...(isLast ? [] : [""]), // Empty line
  ]);
};

const getImmunohistochemistrySection = (
  form: ReportParams,
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  if (!form.ihc.hasIhc) {
    return undefined;
  }

  return joinLines([
    `${t("Immunohistochimie")}${colon}`,
    "", // Empty line
    ...form.ihc.blocks.map((block, index) =>
      renderBlock(block, language, index === form.ihc.blocks.length - 1),
    ),
  ]);
};

const getCommentSection = (form: { comment: string }, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const comment = form.comment.trim();

  return comment
    ? joinLines([
        `${t("Remarques particulières")}${colon}`,
        padSection(comment),
      ])
    : undefined;
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

const getLocationSection = (rows: Row[], language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const sextants = rows.filter((row) => row.type === "sextant");
  const targets = rows.filter((row) => row.type === "target");
  const tumorSize = sum(rows.map((item) => sum(item.tumorSize)));
  const totalSize = sum(rows.map((item) => sum(item.biopsySize)));

  return joinLines([
    `${t("Localisation")}${colon}`,
    ...[
      `${t("Biopsies systématiques")}${colon} ${getTumorLocation(sextants, language)}`, // Systematic biopsies are mandatory
      targets.length
        ? `${t("Biopsies ciblées")}${colon} ${getTumorLocation(targets, language)}`
        : undefined, // Targets are optional
      language === "FR"
        ? `${t("Total")}${colon} ${tumorSize}mm sur ${totalSize}mm examinés`
        : `${t("Total")}${colon} ${tumorSize}mm out of ${totalSize}mm examined`,
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

  const locations = Array.from(
    new Set(
      rows
        .filter((row) => !!row.tumorTep)
        .map((row) =>
          getLocationLabel(formId, row.location, language).toLocaleLowerCase(),
        ),
    ),
  );

  const locationPart = score.tumorTep
    ? ` (${pluralize(locations.length, t("pot"))} ${naturalJoin(locations, language)})`
    : "";
  return `${t("Tissu extra-prostatique")}${colon} ${toYesNo(score.tumorTep ?? false, language)}${locationPart}`;
};

const getConclusionContent = (
  { formId, rows, score, tumorType }: ReportParams,
  language: Language,
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

  const { label: tumorTypeLabel } = getTumorTypeOption(tumorType);
  const maxGleasonItem = score.tumorGleason ?? DEFAULT_GLEASON_ITEM;
  const lineGleason = `${t("Score de Gleason")}${colon} ${getGleasonConclusion(maxGleasonItem, language)}`;
  const locationSection = getLocationSection(rows, language);

  const partEpn = `${t("Engainements périnerveux")}${colon} ${toYesNo(score.tumorEpn ?? false, language)}`;

  const partTep = getPartTep(formId, rows, score, language);
  return joinLines([
    `${t("Type de tumeur")}${colon} ${t(tumorTypeLabel.toLocaleLowerCase())}.`,
    "", // Empty line
    lineGleason,
    "", // Empty line
    locationSection,
    "", // Empty line
    partEpn,
    partTep,
  ]);
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
    getConclusionContent(params, language),
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
    getImmunohistochemistrySection(form, language),
    getCommentSection(form, language),
    getConclusionSection(form, language, isExpertMode),
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
