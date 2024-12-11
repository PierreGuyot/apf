import { GrammaticalForm, getPresenceOptions } from "./helpers";
import { Select } from "./Select";

type Props = {
  label?: string;
  grammaticalForm: GrammaticalForm;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const SelectPresence = ({
  label,
  grammaticalForm,
  value,
  onChange,
}: Props) => {
  const options = getPresenceOptions(grammaticalForm);

  return (
    <Select
      label={label}
      value={value ? "present" : "not-identified"}
      options={options}
      onChange={(value) => onChange(value === "present")}
    />
  );
};
