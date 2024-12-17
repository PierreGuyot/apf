import { findOption, Option } from "../../ui";
import { ERROR_MANDATORY_FIELD } from "../../validation";

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

export const validateResectionMacroscopy = ({
  chipWeight,
  blockCount,
}: {
  chipWeight: number;
  blockCount: number;
}) => ({
  chipWeight: chipWeight ? undefined : ERROR_MANDATORY_FIELD,
  blockCount: blockCount ? undefined : ERROR_MANDATORY_FIELD,
});
