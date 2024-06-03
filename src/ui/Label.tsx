import { join } from "./helpers/helpers";
import "./label.css";

type Props = {
  label: string;
  placement?: "above" | "inline";
};

export const Label = ({ label, placement = "inline" }: Props) => (
  <label
    className={join(
      "label",
      placement === "inline" ? "label--is-inline" : "label--is-above",
    )}
  >
    {label}
  </label>
);
