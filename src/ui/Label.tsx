import { join } from "./helpers/helpers";
import css from "./label.module.css";

type Props = {
  label: string;
  placement?: "above" | "inline";
};

export const Label = ({ label, placement = "inline" }: Props) => (
  <label
    className={join(css.main, placement === "inline" ? undefined : css.isAbove)}
  >
    {label}
  </label>
);
