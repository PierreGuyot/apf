import { Select } from "./Select";
import { range, toOption } from "./helpers/helpers";

type Props = {
  min?: number;
  max: number;
  name: string;
  label?: string;
  value: number;
  isReadOnly?: boolean;
  onChange: (value: number) => void;
};

export const SelectNumber = ({ min = 0, max, ...selectProps }: Props) => {
  const options = range(min, max).map(toOption);
  return <Select options={options} {...selectProps} />;
};
