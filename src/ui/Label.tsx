import { join } from "./helpers";
import "./label.css";

type LabelProps = { label: string; placement?: "above" | "inline" };

export const Label = ({ label, placement = "inline" }: LabelProps) => (
  <label
    className={join(
      "label",
      placement === "inline" ? "label--is-inline" : "label--is-above",
    )}
  >
    {label}
  </label>
);
