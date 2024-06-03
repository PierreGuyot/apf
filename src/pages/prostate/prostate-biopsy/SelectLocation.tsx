import { useMemo } from "react";
import { FieldProps } from "../../../ui/helpers/fields";
import { Language } from "../../../ui/language";
import { CellChoice } from "./cells";
import { getLocationOptions, Location, ProstateBiopsyFormId } from "./helpers";

type Props = FieldProps<Location> & {
  formId: ProstateBiopsyFormId;
  language?: Language;
};

export const SelectLocation = ({ formId, ...props }: Props) => {
  const options = useMemo(() => getLocationOptions(formId), [formId]);

  return <CellChoice name="Location" options={options} {...props} />;
};
