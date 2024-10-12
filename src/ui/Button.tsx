import css from "./button.module.css";
import { join } from "./helpers/helpers";

type Props = {
  _className?: string;
  label: string;
  onClick: () => void;
};

export const Button = ({ _className, label, onClick }: Props) => {
  return (
    <button className={join(css.main, _className)} onClick={onClick}>
      {label}
    </button>
  );
};
