import { FieldProps } from "../../ui/helpers/helpers.types";
import { CellChoice } from "./cells";
import { LOCATION_OPTIONS, Location } from "./helpers";

type Props = FieldProps<Location>;

export const SelectLocation = (props: Props) => (
  <CellChoice name="Location" options={LOCATION_OPTIONS} {...props} />
);
