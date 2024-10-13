import { SelectNumber, Stack } from "../../../ui";
import { SelectLocation } from "./SelectLocation";
import {
  Location,
  PiradsItem,
  PiradsScore,
  ProstateBiopsyFormId,
} from "./helpers";

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
    <Stack direction="row" alignItems="center" spacing="sm">
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
    </Stack>
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
  <Stack spacing="sm">
    {items.slice(0, visibleRowCount).map((item, i) => (
      <PiradsLine
        key={i}
        formId={formId}
        value={item}
        onChange={(value) => onChange(value, i)}
      />
    ))}
  </Stack>
);
