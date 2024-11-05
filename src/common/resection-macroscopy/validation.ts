import { findOption, Option } from "../../ui";

export type SamplingType = "full" | "partial";
export const SAMPLING_TYPES: Option<SamplingType>[] = [
  { value: "full", label: "Inclusion en totalité" },
  { value: "partial", label: "Échantillonnage" },
];

export const getSamplingTypeOption = findOption(SAMPLING_TYPES);

export type ColorationType = "HES" | "HE";
export const COLORATION_OPTIONS: Option<ColorationType>[] = [
  { value: "HES", label: "HES" },
  { value: "HE", label: "HE" },
];

// TODO clean: add tests
export const validateMacroscopy = ({
  chipWeight,
  blockCount,
}: {
  chipWeight: number;
  blockCount: number;
}) => {
  const errors: string[] = [];

  if (!chipWeight) {
    errors.push("Le poids des copeaux est égal à 0.");
  }

  if (!blockCount) {
    errors.push("Le nombre de blocs est égal à 0.");
  }

  return errors;
};
