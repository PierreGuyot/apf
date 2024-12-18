export type Unit =
  | "g"
  | "mm"
  | "mm-2"
  | "cm"
  | "ng-per-mL"
  | "percent"
  | "mitoses-per-mm-2";

const UNIT_LABELS: Record<Unit, string> = {
  g: "g",
  mm: "mm",
  "mm-2": "mm⁻²",
  cm: "cm",
  "ng-per-mL": "ng.mL⁻¹",
  percent: "%",
  "mitoses-per-mm-2": "mitose(s) par mm²",
};

// TODO clean: handle plural
export const getUnitLabel = (unit: Unit) => UNIT_LABELS[unit];
export const formatWithUnit = (value: number, unit: Unit) => {
  const label = getUnitLabel(unit);
  return `${value} ${label}`;
};
