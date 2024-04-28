import { InputText } from "../../ui/InputText";
import { Line } from "../../ui/Line";
import { SelectNumber } from "../../ui/SelectNumber";
import { PiradsItem } from "./helpers";

// PIRADS: Prostate Imaging Reporting & Data System

export const PiradsSelect = ({
  value,
  onChange,
}: {
  value: PiradsItem;
  onChange: (value: PiradsItem) => void;
}) => {
  const onChangeCount = (count: number) => onChange({ ...value, count });
  const onChangeLocation = (location: string) =>
    onChange({ ...value, location });

  return (
    <Line>
      <SelectNumber
        name="PIRADS count" // TODO: check this with Louis
        label="PIRADS"
        min={2}
        max={5}
        value={value.count}
        onChange={onChangeCount}
      />{" "}
      située à <InputText value={value.location} onChange={onChangeLocation} />
    </Line>
  );
};
