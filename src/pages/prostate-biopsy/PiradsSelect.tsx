import { SelectNumber } from "../../ui/SelectNumber";
import { FieldProps } from "../../ui/helpers.types";
import { SelectLocation } from "./SelectLocation";
import { Location, PiradsItem } from "./helpers";
import "./pirads-select.css";

// PIRADS: Prostate Imaging Reporting & Data System

const PiradsLine = ({ value, onChange }: FieldProps<PiradsItem>) => {
  const onChangeCount = (score: number) => onChange({ ...value, score: score });
  const onChangeLocation = (location: Location) =>
    onChange({ ...value, location });

  return (
    <div className="pirads-item">
      <SelectNumber
        name="PIRADS score"
        label="PIRADS"
        min={2}
        max={5}
        value={value.score}
        onChange={onChangeCount}
      />{" "}
      située à{" "}
      <SelectLocation value={value.location} onChange={onChangeLocation} />
    </div>
  );
};

export const PiradsSelect = ({
  items,
  onChange,
}: {
  items: PiradsItem[];
  onChange: (value: PiradsItem, index: number) => void;
}) => (
  <>
    {items.map((item, i) => (
      <PiradsLine
        key={i}
        value={item}
        onChange={(value) => onChange(value, i)}
      />
    ))}
  </>
);
