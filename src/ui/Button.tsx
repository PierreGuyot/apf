import "./button.css";
import { join } from "./helpers/helpers";

type ButtonProps = { className?: string; label: string; onClick: () => void };

export const Button = ({ className, label, onClick }: ButtonProps) => {
  return (
    <button className={join("button", className)} onClick={onClick}>
      {label}
    </button>
  );
};
