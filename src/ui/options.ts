export type Option<T extends string | number | boolean> = {
  value: T;
  label: string;
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
