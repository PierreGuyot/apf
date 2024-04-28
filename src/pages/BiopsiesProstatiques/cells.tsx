import { InputNumber } from "../../ui/InputNumber";
import { InputText } from "../../ui/InputText";
import { Select } from "../../ui/Select";
import { Option, YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { Pair } from "./constants";
import "./cells.css";

// TODO: pass value/setter as props
// TODO NOW: extract to a separate cells.tsx file
// TODO NOW: adjust style
// TODO NOW: separate GleasonField vs Gleason, SizeField vs Size

export const CellTextField = ({ _value }: { _value: string }) => {
  const [value, setValue] = useString();
  return <InputText value={value} onChange={setValue} />;
};

export const CellNumberField = ({ _value }: { _value: number }) => {
  const [value, setValue] = useNumber();
  return <InputNumber value={value} onChange={setValue} />;
};

export function CellChoice<T extends string>({
  _value,
  name,
  options,
}: {
  _value: T;
  name: string;
  options: Option<T>[];
}) {
  const [value, setValue] = useString();
  return (
    <Select value={value} name={name} options={options} onChange={setValue} />
  );
}

export const CellYesNo = ({
  _value,
  name,
}: {
  _value: boolean;
  name: string;
}) => {
  const [value, setValue] = useBoolean();
  return (
    <Select
      value={value}
      name={name}
      options={YES_NO_OPTIONS}
      onChange={setValue}
    />
  );
};

export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;

export const CellSize = ({ _value }: { _value: Pair }) => {
  const [a, setA] = useNumber();
  const [b, setB] = useNumber();

  return (
    <div className="cell">
      <InputNumber value={a} onChange={setA} />{" "}
      <span className="cell-plus">+</span>
      <InputNumber value={b} onChange={setB} />
    </div>
  );
};

export const CellGleason = ({ _value }: { _value: Pair }) => {
  const [a, setA] = useNumber();
  const [b, setB] = useNumber();

  return (
    <div className="cell">
      <div className="cell-sum">{a + b}</div>
      (<InputNumber value={a} onChange={setA} />{" "}
      <span className="cell-plus">+</span>
      <InputNumber value={b} onChange={setB} />)
    </div>
  );
};
