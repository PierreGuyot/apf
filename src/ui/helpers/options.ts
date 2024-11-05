import { DEFAULT_LANGUAGE, Language, translate } from "../translation";
import { Troolean } from "../troolean";
import { findOption } from "./helpers";

// Standardized items

export const YES_ITEM = { value: "yes", label: "Oui" } as const;
export const NO_ITEM = { value: "no", label: "Non" } as const;
export const OTHER_ITEM = {
  value: "other",
  label: "Autre (précisez)",
} as const;
export const UNSPECIFIED_ITEM = {
  value: "unspecified",
  label: "Non-précisé",
} as const;

export type OptionValue = string | number | boolean;

export type Option<T extends OptionValue> = {
  readonly value: T;
  readonly label: string;
};

export type OptionGroup<T extends OptionValue> = {
  readonly title: string;
  readonly options: Option<T>[];
};

export const YES_NO_OPTIONS = [YES_ITEM, NO_ITEM] as const;

const getBooleanOption = findOption(YES_NO_OPTIONS);
export const toYesNo = (
  value: boolean,
  // TODO clean: remove translation at this level
  language: Language = DEFAULT_LANGUAGE,
) => {
  const { label } = getBooleanOption(value ? "yes" : "no");
  return translate(label, language);
};

const getTrooleanOption = findOption([...YES_NO_OPTIONS, UNSPECIFIED_ITEM]);
export const toOptionalYesNo = (
  value: Troolean,
  // TODO clean: remove translation at this level
  language: Language = DEFAULT_LANGUAGE,
) => {
  const { label } = getTrooleanOption(value);
  return translate(label, language);
};
