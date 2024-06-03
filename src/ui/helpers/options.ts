import { DEFAULT_LANGUAGE, Language, translate } from "../language";
import { findOption } from "./helpers";

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

const getYesNoOption = findOption(YES_NO_OPTIONS);
export const toYesNo = (
  value: boolean,
  language: Language = DEFAULT_LANGUAGE,
) => {
  const { label } = getYesNoOption(value);
  return translate(label, language);
};
