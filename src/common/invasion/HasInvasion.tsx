import { SelectBoolean } from "../../ui";

type Props = {
  value: boolean;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: boolean) => void;
};

// Lymphatic or vascular invasion
export const HasInvasion = ({ value, onChange }: Props) => (
  <SelectBoolean
    value={value}
    label="Emboles vasculaires ou lymphatiques"
    onChange={onChange}
  />
);
