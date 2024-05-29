import { Language } from "../../ui/helpers/helpers.types";
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
import { FormState } from "./ProstateBiopsyForm";
import {
  DEFAULT_GLEASON_PAIR,
  PiradsItem,
  Score,
  getIsupScore,
  getLocationLabel
} from "./helpers";

type ReportParams = FormState & {
  score: Score;
  comment: string;
  language: Language;
};

// TODO with Louis: un-mock
const mockGetContent = (form: ReportParams) =>
  JSON.stringify(form.score, null, 2);

// TODO: test extensively
export const generateReport = (form: ReportParams): string => {
  const { language, score, rows, comment } = form;

  switch (language) {
    case "FR": {
      // TODO: add table (how?)

      // Conclusion

      let conclusionSection: string;

      // Tumor absence
      if (score.tumorCount === 0) {
        conclusionSection = joinLines([
          `Absence de foyer tumoral sur l'ensemble des ${score.biopsyCount} biopsies étudiées (${score.biopsySize} mm).`,
          "Adénomyome prostatique.",
        ]);
      }

      // Tumor presence
      else {
        const [a, b] = score.tumorGleason ?? DEFAULT_GLEASON_PAIR;
        const sextans = rows.filter((row) => row.type === "sextan");
        const sextansWithTumor = sextans.filter((row) => row.tumorCount > 0);
        const targets = rows.filter((row) => row.type === "target");
        const targetsWithTumor = targets.filter((row) => row.tumorCount > 0);
        const isupScore = getIsupScore([a, b]);

        conclusionSection = joinLines([
          `Adénocarcinome acinaire de type prostatique.\n`, // We add an empty line for aesthetic purposes
          `Il présente un score de Gleason ${a + b} (${a} + ${b}), soit un score ISUP de ${isupScore}.`,
          `Il est localisé sur ${sextansWithTumor.length} des ${sextans.length} biopsies systématiques et sur ${targetsWithTumor.length} des ${targets.length} biopsies ciblées.`,
          `Il mesure ${score.tumorSize} mm sur ${score.biopsySize} mm examinés sur les biopsies standards.\n`, // We add an empty line for aesthetic purposes,
          `Engainements périnerveux : ${toYesNo(score.tumorEpn ?? false)}`,
          `Tissu extra-prostatique : ${toYesNo(score.tumorTep ?? false)}`,
          `Envahissement tissu extra-prostatique : ${toYesNo(score.tumorPin ?? false)}`,
        ]);
      }

      // Clinical information

      const renderPiradsItem = (item: PiradsItem) => {
        const matches = rows
          .filter(
            (row) => row.type === "target" && row.location === item.location,
          )
          .map(({ index }) => index);
        const containerCount = matches.length
          ? ` (${pluralize(matches.length, "pot")} ${naturalJoin(matches)})`
          : undefined;

        return pad(
          `PIRADS ${item.score}, ${getLocationLabel(item.location)}${containerCount}`,
        );
      };

      const clinicalInformationSection = joinLines([
        "Renseignements cliniques:",
        pad(`PSA: ${formatWithUnit(form.psaRate, "ng-per-mL")}`),
        pad(`IRM: ${form.hasMri ? "oui" : "non"}`),
        ...(form.piradsItems.length
          ? [`Cibles:`, ...form.piradsItems.map(renderPiradsItem)].map(pad)
          : []),
      ]);

      // Comment

      const commentSection = comment
        ? joinLines([`Remarques particulières:`, padSection(comment)])
        : undefined;

      return joinSections([
        conclusionSection,
        form.hasInfo ? clinicalInformationSection : undefined,
        commentSection,
      ]);
    }

    case "EN": {
      return mockGetContent(form);
    }
  }
};
