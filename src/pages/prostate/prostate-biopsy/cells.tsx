import { Fragment } from "react";
import { InputNumber } from "../../../ui/InputNumber";
import { Select } from "../../../ui/Select";
import { SelectList } from "../../../ui/SelectList";
import { join, range } from "../../../ui/helpers/helpers";
import { YES_NO_OPTIONS } from "../../../ui/helpers/options";
import { Language } from "../../../ui/language";
import { SelectGleason } from "../SelectGleason";
import { GleasonItem, OTHER_LESION_GROUPS, OtherLesionType } from "../helpers";
import css from "./cells.module.css";

export const CellSelectList = (props: {
  values: OtherLesionType[];
  onChange: (value: OtherLesionType[]) => void;
  isReadOnly: boolean;
  language?: Language;
}) => <SelectList groups={OTHER_LESION_GROUPS} {...props} />;
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: {
  name: string;
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
  <div className={join(css.main, css.size)}>
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
    <div className={css.main}>
      <div className={css.sum}>{a + b}</div>(
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
