import { Line, SelectBoolean } from "../../ui";

type Props = {
  value: boolean;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: boolean) => void;
};

// Perineural invasion
export const HasEpn = ({ value, onChange }: Props) => (
  <Line>
    <SelectBoolean
      value={value}
      label="Engainements périnerveux"
      onChange={onChange}
    />
  </Line>
);
