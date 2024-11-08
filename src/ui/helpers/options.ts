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
