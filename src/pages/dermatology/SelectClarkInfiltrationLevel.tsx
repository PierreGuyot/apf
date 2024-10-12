import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { CLARK_INFILTRATION_LEVELS, ClarkInfiltrationLevel } from "./helpers";

type Props = {
  value: ClarkInfiltrationLevel;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: ClarkInfiltrationLevel) => void;
};

export const SelectClarkInfiltrationLevel = ({ value, onChange }: Props) => (
  <Line>
    <Select
      name="Niveau d'infiltration selon Clark"
      label="Niveau d'infiltration selon Clark"
      options={CLARK_INFILTRATION_LEVELS}
      value={value}
      onChange={onChange}
    />
  </Line>
);
