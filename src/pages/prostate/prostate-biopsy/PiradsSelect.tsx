import { SelectNumber } from "../../../ui";
import { SelectLocation } from "./SelectLocation";
import {
  Location,
  PiradsItem,
  PiradsScore,
  ProstateBiopsyFormId,
} from "./helpers";
import css from "./pirads-select.module.css";

// PIRADS: Prostate Imaging Reporting and Data System

const PiradsLine = ({
  formId,
  value,
  onChange,
}: {
  formId: ProstateBiopsyFormId;
  value: PiradsItem;
  onChange: (item: PiradsItem) => void;
}) => {
  // CAUTION: this cast is type-unsafe
  const onChangeCount = (score: number) =>
    onChange({ ...value, score: score as PiradsScore });
  const onChangeLocation = (location: Location) =>
    onChange({ ...value, location });

  return (
    <div className={css.main}>
      <SelectNumber
        label="PIRADS"
        min={2}
        max={5}
        value={value.score}
        onChange={onChangeCount}
      />{" "}
      située à{" "}
      <SelectLocation
        formId={formId}
        value={value.location}
        onChange={onChangeLocation}
      />
    </div>
  );
};

type Props = {
  items: PiradsItem[];
  visibleRowCount: number;
  formId: ProstateBiopsyFormId;
  onChange: (value: PiradsItem, index: number) => void;
};

export const PiradsSelect = ({
  items,
  visibleRowCount,
  formId,
  onChange,
}: Props) => (
  <>
    {items.slice(0, visibleRowCount).map((item, i) => (
      <PiradsLine
        key={i}
        formId={formId}
        value={item}
        onChange={(value) => onChange(value, i)}
      />
    ))}
  </>
);
