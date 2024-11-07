import { Select } from "./Select";
import { Troolean, TROOLEAN_OPTIONS } from "./troolean";

type Props = {
  label?: string;
  value: Troolean;
  onChange: (value: Troolean) => void;
};

// TODO CLEAN: add example to design documentation
export const SelectTroolean = ({ label, value, onChange }: Props) => {
  return (
    <Select
      label={label}
      value={value}
      options={TROOLEAN_OPTIONS}
      onChange={onChange}
    />
  );
};