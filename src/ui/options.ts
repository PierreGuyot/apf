export type Option<T extends string | number | boolean> = {
  value: T;
  label: string;
};

export const YES_NO_OPTIONS: Option<boolean>[] = [
  { value: true, label: "Oui" },
  { value: false, label: "Non" },
];
