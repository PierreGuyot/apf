import { useMemo } from "react";
import { Language } from "../../../ui";
import { CellChoice } from "./cells";
import { getLocationOptions, Location, ProstateBiopsyFormId } from "./helpers";

type Props = {
  formId: ProstateBiopsyFormId;
  language?: Language;
  value: Location;
  isReadOnly?: boolean;
  onChange: (value: Location) => void;
};

export const SelectLocation = ({ formId, ...props }: Props) => {
  const options = useMemo(() => getLocationOptions(formId), [formId]);

  return <CellChoice options={options} {...props} />;
};
