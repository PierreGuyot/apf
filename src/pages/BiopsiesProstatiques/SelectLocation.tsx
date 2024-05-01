import { CellChoice } from "./cells";
import { LOCATIONS, Location } from "./helpers";

type Props = {
  value: Location;
  onChange: (value: Location) => void;
};

export const SelectLocation = ({ value, onChange }: Props) => (
  <CellChoice
    name="Location"
    options={LOCATIONS}
    value={value}
    onChange={onChange}
  />
);
