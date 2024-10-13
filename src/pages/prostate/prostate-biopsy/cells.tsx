import { Fragment } from "react";
import {
  InputNumber,
  Language,
  range,
  Select,
  SelectList,
  Stack,
  YES_NO_OPTIONS,
} from "../../../ui";
import { SelectGleason } from "../SelectGleason";
import { GleasonItem, OTHER_LESION_GROUPS, OtherLesionType } from "../helpers";

export const CellSelectList = (props: {
  values: OtherLesionType[];
  onChange: (value: OtherLesionType[]) => void;
  isReadOnly: boolean;
  language?: Language;
}) => <SelectList groups={OTHER_LESION_GROUPS} {...props} />;
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: {
  language?: Language;
  value: boolean;
  isReadOnly?: boolean;
  onChange: (value: boolean) => void;
}) => <Select options={YES_NO_OPTIONS} {...props} />;

const Plus = () => <span>+</span>;

export const CellSize = ({
  values,
  onChange,
  inputCount,
  isReadOnly,
}: {
  values: number[];
  isReadOnly?: boolean;
  onChange: (value: number[]) => void;
  inputCount: number;
}) => (
  <Stack direction="row" alignItems="center" spacing="xs">
    {range(inputCount).map((_, i) => (
      <Fragment key={i}>
        <InputNumber
          value={values[i]}
          isReadOnly={isReadOnly}
          onChange={(updatedNumber) => {
            const updatedArray = [...values];
            updatedArray[i] = updatedNumber;
            onChange(updatedArray);
          }}
        />
        {i === inputCount - 1 ? undefined : <Plus />}
      </Fragment>
    ))}
  </Stack>
);

export const CellGleason = ({
  language,
  value,
  isReadOnly,
  onChange,
}: {
  language: Language;
  value: GleasonItem;
  onChange: (value: GleasonItem) => void;
  isReadOnly?: boolean;
}) => {
  const { a, b } = value;

  return (
    <Stack direction="row" alignItems="center" spacing="xs">
      <div>{a + b}</div>
      {"("}
      <SelectGleason
        language={language}
        value={value}
        isReadOnly={isReadOnly}
        onChange={onChange}
      />
      {")"}
    </Stack>
  );
};
