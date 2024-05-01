import { InputNumber } from "../../ui/InputNumber";
import { InputText } from "../../ui/InputText";
import { Select } from "../../ui/Select";
import { FieldProps, Pair, toOption } from "../../ui/helpers";
import { Option, YES_NO_OPTIONS } from "../../ui/options";
import "./cells.css";
import { GLEASON_SCORES, GleasonPair, GleasonScore } from "./helpers";

// TODO: separate GleasonField vs Gleason, SizeField vs Size (for footer)

export const CellTextField = InputText;
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellNumberField = InputNumber;
export const CellChoice = Select;
export const CellYesNo = ({
  value,
  name,
  onChange,
}: {
  value: boolean;
  name: string;
  onChange: (value: boolean) => void;
}) => (
  <Select
    value={value}
    name={name}
    options={YES_NO_OPTIONS}
    onChange={onChange}
  />
);

const BaseCellSum = ({
  value,
  onChange,
}: {
  value: Pair;
  onChange: (value: Pair) => void;
}) => (
  <>
    <InputNumber value={value[0]} onChange={(a) => onChange([a, value[1]])} />
    <span className="cell-plus">+</span>
    <InputNumber value={value[1]} onChange={(b) => onChange([value[0], b])} />
  </>
);

export const CellSize = ({
  value,
  onChange,
}: {
  value: Pair;
  onChange: (value: Pair) => void;
}) => (
  <div className="cell">
    <BaseCellSum value={value} onChange={onChange} />
  </div>
);

export const CellGleason = ({
  value,
  onChange,
}: {
  value: GleasonPair;
  onChange: (value: GleasonPair) => void;
}) => (
  <div className="cell">
    <div className="cell-sum">{value[0] + value[1]}</div>(
    <span className="cell-parentheses">
      <SelectGleason
        value={value[0]}
        onChange={(a) => onChange([a, value[1]])}
      />
      <span className="cell-plus">+</span>
      <SelectGleason
        value={value[1]}
        onChange={(b) => onChange([value[0], b])}
      />
    </span>
    )
  </div>
);

const GLEASON_OPTIONS: Option<GleasonScore>[] = GLEASON_SCORES.map(toOption);
export const SelectGleason = ({
  value,
  onChange,
}: FieldProps<GleasonScore>) => (
  <Select
    name="Gleason score"
    value={value}
    options={GLEASON_OPTIONS}
    onChange={onChange}
  />
);
