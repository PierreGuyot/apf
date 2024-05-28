import { Fragment } from "react/jsx-runtime";
import { InputNumber } from "../../ui/InputNumber";
import { Select } from "../../ui/Select";
import { range, toOption } from "../../ui/helpers/helpers";
import { FieldProps } from "../../ui/helpers/helpers.types";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { SelectList } from "../../ui/SelectList";
import "./cells.css";
import {
  GLEASON_SCORES,
  GleasonPair,
  GleasonScore,
  OTHER_LESION_TYPES,
  OtherLesionType,
} from "./helpers";

export const CellSelectList = (props: FieldProps<OtherLesionType[]>) => (
  <SelectList items={OTHER_LESION_TYPES} {...props} />
);
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: FieldProps<boolean> & { name: string }) => (
  <Select options={YES_NO_OPTIONS} {...props} />
);

const Plus = () => <span className="cell-plus">+</span>;

export const CellNumberSum = ({
  value,
  onChange,
  inputCount,
  isReadOnly,
}: FieldProps<number[]> & { inputCount: number }) => (
  <div className="cell">
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

const GLEASON_OPTIONS: Option<GleasonScore>[] = GLEASON_SCORES.map(toOption);
const SelectGleason = (props: FieldProps<GleasonScore>) => (
  <Select name="Gleason score" options={GLEASON_OPTIONS} {...props} />
);

export const CellGleason = ({
  value: [a, b],
  isReadOnly,
  onChange,
}: FieldProps<GleasonPair>) => {
  if (isReadOnly) {
    return (
      <span>
        {a + b} ({a} + {b})
      </span>
    );
  }

  return (
    <div className="cell">
      <div className="cell-sum">{a + b}</div>(
      <span className="cell-parentheses">
        <SelectGleason
          value={a}
          isReadOnly={isReadOnly}
          onChange={(_a) => onChange([_a, b])}
        />
        <Plus />
        <SelectGleason
          value={b}
          isReadOnly={isReadOnly}
          onChange={(_b) => onChange([a, _b])}
        />
      </span>
      )
    </div>
  );
};
