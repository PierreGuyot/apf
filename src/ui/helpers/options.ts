// Standardized items

import { GrammaticalForm } from "./grammar";

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
export const SPECIFIED_ITEM = {
  value: "specified",
  label: "Précisé",
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

export type OptionOrGroup<T extends OptionValue> = Option<T> | OptionGroup<T>;

export const YES_NO_OPTIONS = [YES_ITEM, NO_ITEM] as const;

const PRESENCES = ["not-identified", "present"] as const;

export type Presence = (typeof PRESENCES)[number];

// TODO clean: consider grouping with translation.ts
const getLabels = (grammaticalForm: GrammaticalForm) => {
  if (grammaticalForm.gender === "feminine") {
    if (grammaticalForm.number === "singular") {
      return { present: "Présente", "not-identified": "Non-identifiée" };
    } else {
      return { present: "Présentes", "not-identified": "Non-identifiées" };
    }
  } else {
    if (grammaticalForm.number === "singular") {
      return { present: "Présent", "not-identified": "Non-identifié" };
    } else {
      return { present: "Présents", "not-identified": "Non-identifiés" };
    }
  }
};

export const getPresenceOptions = (grammaticalForm: GrammaticalForm) => {
  const labels = getLabels(grammaticalForm);
  return PRESENCES.map((value) => ({ value, label: labels[value] }));
};
