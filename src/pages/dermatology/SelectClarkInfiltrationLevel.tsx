import { Line, Select } from "../../ui";
import { CLARK_INFILTRATION_LEVELS, ClarkInfiltrationLevel } from "./helpers";

type Props = {
  value: ClarkInfiltrationLevel;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: ClarkInfiltrationLevel) => void;
};

export const SelectClarkInfiltrationLevel = ({ value, onChange }: Props) => (
  <Line>
    <Select
      label="Niveau d'infiltration selon Clark"
      options={CLARK_INFILTRATION_LEVELS}
      value={value}
      onChange={onChange}
    />
  </Line>
);
