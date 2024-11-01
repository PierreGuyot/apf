export type Unit = "g" | "mm" | "ng-per-mL" | "percent";

const UNIT_LABELS: Record<Unit, string> = {
  g: "g",
  mm: "mm",
  "ng-per-mL": "ng.mL⁻¹",
  percent: "%",
};

export const getUnitLabel = (unit: Unit) => UNIT_LABELS[unit];
export const formatWithUnit = (value: number, unit: Unit) => {
  const label = getUnitLabel(unit);
  return `${value} ${label}`;
};
