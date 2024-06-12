import { findOption } from "../../ui/helpers/helpers";
import { Option } from "../../ui/helpers/options";
import { LIMIT_OPTIONS, Limit } from "./helpers";

// TODO with Louis: translate everything below

// TODO with Louis: translate
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
// TODO with Louis: translate
export type InkingLimitType = "all" | "other" | Limit;

export const INKING_LIMIT_TYPE_OPTIONS: Option<InkingLimitType>[] = [
  { value: "all", label: "Toutes les limites" },
  ...LIMIT_OPTIONS,
  { value: "other", label: "Autre (description en heures)" },
];
