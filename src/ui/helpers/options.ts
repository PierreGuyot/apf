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

export const toYesNo = (value: boolean) => {
  const option = YES_NO_OPTIONS.find((item) => item.value === value);

  if (!option) {
    throw new Error("Invalid value");
  }

  return option.label;
};
