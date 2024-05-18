export type Unit = "mm" | "ng-per-mL";

const UNIT_LABELS: Record<Unit, string> = {
  mm: "mm",
  "ng-per-mL": "ng.mL⁻¹",
};

export const getUnitLabel = (unit: Unit) => UNIT_LABELS[unit];
export const formatWithUnit = (value: number, unit: Unit) => {
  const label = getUnitLabel(unit);
  return `${value} ${label}`;
};
