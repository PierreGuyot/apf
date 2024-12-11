import { SelectPresence } from "../../ui";

type Props = {
  value: boolean;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: boolean) => void;
};

// Perineural invasion
export const HasEpn = ({ value, onChange }: Props) => (
  <SelectPresence
    value={value}
    grammaticalForm={{ gender: "masculine", number: "plural" }}
    label="Engainements périnerveux"
    onChange={onChange}
  />
);
