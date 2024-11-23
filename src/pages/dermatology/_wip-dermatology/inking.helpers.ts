import { Option, findOption } from "../../../ui";
import { LIMIT_OPTIONS, Limit } from "./helpers";

// FIXME: translate everything below

// FIXME: translate
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
    title: "", // TODO clean: fix API
    options: INKING_COLORS_OPTIONS,
  },
];
export const getInkingColorOption = findOption(INKING_COLORS_OPTIONS);

// FIXME: check wording
// FIXME: translate
export type InkingLimitType = "all" | "other" | Limit;

export const INKING_LIMIT_TYPE_OPTIONS: Option<InkingLimitType>[] = [
  { value: "all", label: "Toutes les limites" },
  ...LIMIT_OPTIONS,
  { value: "other", label: "Autre (description en heures)" },
];
