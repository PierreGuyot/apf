import { findOption } from "../../ui/helpers/helpers";
import { Option } from "../../ui/helpers/options";

// TODO with Louis: translate everything below

export type InkingColor =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "black";
export const INKING_COLORS_OPTIONS: Option<InkingColor>[] = [
  { value: "blue", label: "Bleu" },
  { value: "green", label: "Vert" },
  { value: "yellow", label: "Jaune" },
  { value: "red", label: "Rouge" },
  { value: "purple", label: "Violet" },
  { value: "black", label: "Noir" },
];
export const INKING_COLOR_GROUPS = [
  {
    title: "", // TODO: fix API
    items: INKING_COLORS_OPTIONS,
  },
];
export const getInkingColorOption = findOption(INKING_COLORS_OPTIONS);

// TODO with Louis: check wording
export type InkingLimit =
  | "all"
  | "superior"
  | "inferior"
  | "median"
  | "lateral"
  | "anterior"
  | "posterior";
export const LIMIT_OPTIONS: Option<InkingLimit>[] = [
  { value: "all", label: "Toutes les limites" },
  { value: "superior", label: "Supérieure" },
  { value: "inferior", label: "Inférieure" },
  { value: "median", label: "Médiane" },
  { value: "lateral", label: "Latérale" },
  { value: "anterior", label: "Antérieure" },
  { value: "posterior", label: "Postérieure" },
];
