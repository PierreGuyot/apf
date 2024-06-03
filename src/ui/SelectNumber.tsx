import { Select } from "./Select";
import { FieldProps } from "./helpers/fields";
import { range, toOption } from "./helpers/helpers";

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
