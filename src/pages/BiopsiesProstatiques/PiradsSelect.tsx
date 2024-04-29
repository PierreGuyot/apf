import { InputText } from "../../ui/InputText";
import { SelectNumber } from "../../ui/SelectNumber";
import { PiradsItem } from "./helpers";
import "./pirads-select.css";

// PIRADS: Prostate Imaging Reporting & Data System

const PiradsLine = ({
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
    <div className="pirads-item">
      <SelectNumber
        name="PIRADS count" // TODO: check this with Louis
        label="PIRADS"
        min={2}
        max={5}
        value={value.count}
        onChange={onChangeCount}
      />{" "}
      située à <InputText value={value.location} onChange={onChangeLocation} />
    </div>
  );
};

export const PiradsSelect = ({
  items,
  onChange,
}: {
  items: PiradsItem[];
  onChange: (value: PiradsItem, index: number) => void;
}) => {
  return (
    <div className="pirads-select">
      {items.map((item, i) => (
        <PiradsLine
          key={i}
          value={item}
          onChange={(value) => onChange(value, i)}
        />
      ))}
    </div>
  );
};
