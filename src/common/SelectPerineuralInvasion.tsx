import { Line } from "../ui/Line";
import { Select } from "../ui/Select";
import { YES_NO_OPTIONS } from "../ui/helpers/options";

type Props = {
  value: boolean;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: boolean) => void;
};

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
