import "./button.css";
import { join } from "./helpers/helpers";

type Props = {
  className?: string;
  label: string;
  onClick: () => void;
};

export const Button = ({ className, label, onClick }: Props) => {
  return (
    <button className={join("button", className)} onClick={onClick}>
      {label}
    </button>
  );
};
