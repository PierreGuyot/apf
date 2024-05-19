import { SelectNumber } from "../../ui/SelectNumber";
import { SelectLocation } from "./SelectLocation";
import { Location, PiradsItem, PiradsScore } from "./helpers";
import "./pirads-select.css";

// PIRADS: Prostate Imaging Reporting and Data System

const PiradsLine = ({
  value,
  onChange,
}: {
  value: PiradsItem;
  onChange: (item: PiradsItem) => void;
}) => {
  // CAUTION: this cast is type-unsafe
  const onChangeCount = (score: number) =>
    onChange({ ...value, score: score as PiradsScore });
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
