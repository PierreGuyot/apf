import { Select } from "./Select";
import { range, toOption } from "./helpers/helpers";
import { FieldProps } from "./helpers/helpers.types";

type SelectNumberProps = FieldProps<number> & {
  min?: number;
  max: number;
  name: string;
  label?: string;
};

export const SelectNumber = ({
  min = 0,
  max,
  ...selectProps
}: SelectNumberProps) => {
  const options = range(min, max).map(toOption);
  return <Select options={options} {...selectProps} />;
};
