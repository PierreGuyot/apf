import { DEFAULT_LANGUAGE, Language, translate } from "../language";

export type SelectValue = string | number | boolean;

export type Option<T extends SelectValue> = {
  value: T;
  label: string;
};

export type OptionGroup<T extends SelectValue> = {
  title: string;
  items: Option<T>[];
};

export const YES_NO_OPTIONS: Option<boolean>[] = [
  { value: true, label: "Oui" },
  { value: false, label: "Non" },
];

// TODO: extract findOption helper
export const toYesNo = (
  value: boolean,
  language: Language = DEFAULT_LANGUAGE,
) => {
  const option = YES_NO_OPTIONS.find((item) => item.value === value);

  if (!option) {
    throw new Error("Invalid value");
  }

  return translate(option.label, language);
};
