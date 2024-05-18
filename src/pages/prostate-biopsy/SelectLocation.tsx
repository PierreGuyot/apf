import { FieldProps } from "../../ui/helpers/helpers.types";
import { CellChoice } from "./cells";
import { LOCATION_OPTIONS, Location } from "./helpers";

type Props = FieldProps<Location>;

export const SelectLocation = ({ value, onChange }: Props) => (
  <CellChoice
    name="Location"
    options={LOCATION_OPTIONS}
    value={value}
    onChange={onChange}
  />
);
