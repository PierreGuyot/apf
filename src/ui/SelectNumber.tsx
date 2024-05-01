import { Select } from "./Select";
import { FieldProps, range, toOption } from "./helpers";

type SelectNumberProps = FieldProps<number> & {
  min?: number;
  max: number;
  name: string;
  label?: string;
};

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
