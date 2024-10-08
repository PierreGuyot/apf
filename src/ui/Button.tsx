import "./button.css";
import { join } from "./helpers/helpers";

type Props = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: Props) => {
  return (
    <button className={join("button")} onClick={onClick}>
      {label}
    </button>
  );
};
