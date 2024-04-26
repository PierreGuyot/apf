import { Select } from "./Select";
import { range } from "./helpers";

type SelectNumberProps = {
  value: number;
  min?: number;
  max: number;
  name: string;
  label?: string;
  onChange: (value: number) => void;
};
const toOption = (value: number) => ({ value, label: String(value) });

export const SelectNumber = ({
  value,
  min = 0,
  max,
  name,
  label,
  onChange,
}: SelectNumberProps) => {
  const options = range(min, max).map(toOption);

  return (
    <Select
      value={value}
      options={options}
      name={name}
      label={label}
      onChange={onChange}
    />
  );
};
