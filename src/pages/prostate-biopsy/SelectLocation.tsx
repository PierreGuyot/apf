import { FieldProps } from "../../ui/helpers/fields";
import { Language } from "../../ui/language";
import { CellChoice } from "./cells";
import { LOCATION_OPTIONS, Location } from "./helpers";

type Props = FieldProps<Location> & {
  language?: Language;
};

export const SelectLocation = (props: Props) => (
  <CellChoice name="Location" options={LOCATION_OPTIONS} {...props} />
);
