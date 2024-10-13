import { Line, Select, YES_NO_OPTIONS } from "../ui";

type Props = {
  value: boolean;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: boolean) => void;
};

export const SelectLymphaticOrVascularInvasion = ({
  value,
  onChange,
}: Props) => (
  <Line>
    <Select
      value={value}
      options={YES_NO_OPTIONS}
      label="Emboles vasculaires ou lymphatiques"
      onChange={onChange}
    />
  </Line>
);
