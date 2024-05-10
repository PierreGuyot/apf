import { Fragment } from "react/jsx-runtime";
import { InputNumber } from "../../ui/InputNumber";
import { InputText } from "../../ui/InputText";
import { Select } from "../../ui/Select";
import { range, toOption } from "../../ui/helpers";
import { FieldProps } from "../../ui/helpers.types";
import { Option, YES_NO_OPTIONS } from "../../ui/options";
import "./cells.css";
import { GLEASON_SCORES, GleasonPair, GleasonScore } from "./helpers";

export const CellTextField = ({ value, onChange }: FieldProps<string>) => (
  <InputText placeholder=" ..." isFullWidth value={value} onChange={onChange} />
);
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellNumberField = InputNumber;
export const CellChoice = Select;

export const CellYesNo = ({
  value,
  name,
  onChange,
}: FieldProps<boolean> & {
  name: string;
}) => (
  <Select
    value={value}
    name={name}
    options={YES_NO_OPTIONS}
    onChange={onChange}
  />
);

const Plus = () => <span className="cell-plus">+</span>;

export const CellNumberSum = ({
  value,
  onChange,
  inputCount,
}: FieldProps<number[]> & { inputCount: number }) => (
  <div className="cell">
    {range(inputCount).map((_, i) => (
      <Fragment key={i}>
        <InputNumber
          value={value[i]}
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
const SelectGleason = ({ value, onChange }: FieldProps<GleasonScore>) => (
  <Select
    name="Gleason score"
    value={value}
    options={GLEASON_OPTIONS}
    onChange={onChange}
  />
);

export const CellGleason = ({ value, onChange }: FieldProps<GleasonPair>) => (
  <div className="cell">
    <div className="cell-sum">{value[0] + value[1]}</div>(
    <span className="cell-parentheses">
      <SelectGleason
        value={value[0]}
        onChange={(a) => onChange([a, value[1]])}
      />
      <Plus />
      <SelectGleason
        value={value[1]}
        onChange={(b) => onChange([value[0], b])}
      />
    </span>
    )
  </div>
);
