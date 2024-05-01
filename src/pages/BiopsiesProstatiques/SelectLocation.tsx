import { FieldProps } from "../../ui/helpers";
import { CellChoice } from "./cells";
import { LOCATIONS, Location } from "./helpers";

type Props = FieldProps<Location>;

export const SelectLocation = ({ value, onChange }: Props) => (
  <CellChoice
    name="Location"
    options={LOCATIONS}
    value={value}
    onChange={onChange}
  />
);
