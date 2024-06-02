import { range } from "./helpers";

export const percent = (value: number) => `${value}%`;

export const getPercentageValues = ({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step: number;
}) => range(min / step, max / step).map((_value) => _value * step);

export const getPercentageOptions = (params: {
  min: number;
  max: number;
  step: number;
}) =>
  getPercentageValues(params).map((value) => ({
    value,
    label: percent(value),
  }));
