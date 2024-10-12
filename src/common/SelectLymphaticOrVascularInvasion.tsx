import { Line } from "../ui/Line";
import { Select } from "../ui/Select";
import { YES_NO_OPTIONS } from "../ui/helpers/options";

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
      name="Emboles vasculaires ou lymphatiques"
      label="Emboles vasculaires ou lymphatiques"
      onChange={onChange}
    />
  </Line>
);
