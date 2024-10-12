import css from "./checkbox.module.css";
import { noop } from "./helpers/helpers";
import { NoWrap } from "./NoWrap";

type Props = {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  // TODO clean: handle isReadOnly prop
};

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  return (
    <div className={css.main} onClick={onChange}>
      <input type="checkbox" checked={isChecked} onChange={noop} />
      <NoWrap>{label}</NoWrap>
    </div>
  );
};
