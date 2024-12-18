import { count, sum } from "../../../ui";
import { ERROR_MANDATORY_FIELD } from "../../../validation";
import { TumorType, getTumorTypeOption } from "../helpers";
import { PiradsItem, RowWithMetadata, SEXTANT_COUNT } from "./helpers";

// CAUTION: only count visible inputs for size (not the hidden ones)
const validateRow = (row: RowWithMetadata) => {
  const biopsySizes = row.biopsySize.slice(0, row.biopsySizeInputCount);
  const tumorSizes = row.tumorSize.slice(0, row.tumorSizeInputCount);

  return {
    biopsySizes: {
      fields: biopsySizes.map((size) =>
        size > 0 ? undefined : ERROR_MANDATORY_FIELD,
      ),
    },
    tumorSizes: {
      fields: tumorSizes.map((size) =>
        size > 0 ? undefined : ERROR_MANDATORY_FIELD,
      ),
      total:
        sum(tumorSizes) > sum(biopsySizes)
          ? "La taille totale de tumeur ne peut pas excéder la taille totale de biopsie."
          : undefined,
    },
    tumorCount:
      row.tumorCount > row.biopsyCount
        ? `Le nombre de biopsies positives ne peut excéder le nombre de biopsies.`
        : undefined,
  };
};

export type RowErrors = ReturnType<typeof validateRow>;

// TODO clean: test extensively
export const validateBiopsyTable = ({
  sextantName,
  rows,
  containerCount,
  piradsItems,
  tumorType,
}: {
  sextantName: string;
  rows: RowWithMetadata[];
  containerCount: number;
  piradsItems: PiradsItem[];
  tumorType: TumorType;
}) => {
  const errors: string[] = [];

  const sextants = rows.filter((row) => row.type === "sextant");
  const sextantCount = sextants.length;
  const targets = rows.filter((row) => row.type === "target");
  const targetCount = targets.length;
  const expectedTargetCount = containerCount - SEXTANT_COUNT;

  // List of locations

  if (targetCount !== expectedTargetCount) {
    errors.push(
      `Le tableau devrait contenir ${count(expectedTargetCount, "cible")} et non ${targetCount}.`,
    );
    errors.push(
      `Le tableau devrait contenir ${count(SEXTANT_COUNT, sextantName)} et non ${sextantCount}.`,
    );
  }

  const locations = new Set(sextants.map((sextant) => sextant.location));
  if (locations.size !== SEXTANT_COUNT) {
    errors.push(
      `Le tableau devrait contenir un et un seul sextant à chacune des six positions.`,
    );
  }

  // PIRADS

  // There can be more targets in the table than PIRADS items
  // But the PIRADS items must match the targets declared in the table
  const tableTargets = new Set(
    rows.filter((row) => row.type === "target").map((item) => item.location),
  );
  piradsItems.forEach((item, index) => {
    const match = tableTargets.has(item.location);
    if (!match) {
      errors.push(
        `La position du PIRADS numéro ${index + 1} ne correspond pas à aucune cible indiquée dans le tableau.`,
      );
    }
  });

  // Gleason score

  const tumorTypeOption = getTumorTypeOption(tumorType);
  const targetScore = tumorTypeOption.score;
  if (targetScore) {
    const matchingScore = rows.find(
      (row) =>
        row.tumorGleason.a === targetScore ||
        row.tumorGleason.b === targetScore,
    );
    if (!matchingScore) {
      errors.push(
        `Il n'y a aucun score de Gleason dans le tableau qui corresponde à une tumeur de type histologique ${tumorTypeOption.label}.`,
      );
    }
  }

  return { errors, rows: rows.map(validateRow) };
};
