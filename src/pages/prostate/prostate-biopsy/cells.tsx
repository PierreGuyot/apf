import { Fragment } from "react";
import { InputNumber } from "../../../ui/InputNumber";
import { Select } from "../../../ui/Select";
import { SelectList } from "../../../ui/SelectList";
import { FieldProps } from "../../../ui/helpers/fields";
import { range } from "../../../ui/helpers/helpers";
import { YES_NO_OPTIONS } from "../../../ui/helpers/options";
import { Language } from "../../../ui/language";
import { SelectGleason } from "../SelectGleason";
import { GleasonItem, OTHER_LESION_GROUPS, OtherLesionType } from "../helpers";
import "./cells.css";

export const CellSelectList = (
  props: FieldProps<OtherLesionType[]> & { language?: Language },
) => <SelectList groups={OTHER_LESION_GROUPS} {...props} />;
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (
  props: FieldProps<boolean> & { name: string; language?: Language },
) => <Select options={YES_NO_OPTIONS} {...props} />;

const Plus = () => <span>+</span>;

export const CellSize = ({
  value,
  onChange,
  inputCount,
  isReadOnly,
}: FieldProps<number[]> & { inputCount: number }) => (
  <div className="cell cell-size">
    {range(inputCount).map((_, i) => (
      <Fragment key={i}>
        <InputNumber
          value={value[i]}
          isReadOnly={isReadOnly}
          onChange={(updatedNumber) => {
            const updatedArray = [...value];
            updatedArray[i] = updatedNumber;
            onChange(updatedArray);
          }}
        />
        {i === inputCount - 1 ? undefined : <Plus />}
      </Fragment>
    ))}
  </div>
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
    <div className="cell">
      <div className="cell-sum">{a + b}</div>(
      <SelectGleason
        language={language}
        value={value}
        isReadOnly={isReadOnly}
        onChange={onChange}
      />
      )
    </div>
  );
};
