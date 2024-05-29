import "./checkbox.css";
import { noop } from "./helpers/helpers";

type Props = {
  label: string;
  isChecked: boolean;
  onChange: () => void;
};

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  return (
    <div className="checkbox" onClick={onChange}>
      <input type="checkbox" checked={isChecked} onChange={noop} />
      <span className="checkbox-label">{label}</span>
    </div>
  );
};
