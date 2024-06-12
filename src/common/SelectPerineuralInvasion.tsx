import { Line } from "../ui/Line";
import { Select } from "../ui/Select";
import { FieldProps } from "../ui/helpers/fields";
import { YES_NO_OPTIONS } from "../ui/helpers/options";

type Props = FieldProps<boolean>;

export const SelectPerineuralInvasion = ({ value, onChange }: Props) => (
  <Line>
    <Select
      value={value}
      options={YES_NO_OPTIONS}
      name="Engainements périnerveux"
      label="Engainements périnerveux"
      onChange={onChange}
    />
  </Line>
);
