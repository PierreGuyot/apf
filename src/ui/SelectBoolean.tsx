import { YES_NO_OPTIONS } from "./helpers";
import { Select } from "./Select";

type Props = {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

// TODO CLEAN: add example to design documentation
export const SelectBoolean = ({ label, value, onChange }: Props) => {
  return (
    <Select
      label={label}
      value={value ? "yes" : "no"}
      options={YES_NO_OPTIONS}
      onChange={(value) => onChange(value === "yes")}
    />
  );
};
