import { Tooltip } from "./Tooltip";
import css from "./pill.module.css";

type Props = {
  label: string;
};

export const Pill = ({ label }: Props) => (
  <Tooltip content={label}>
    <div className={css.main}>{label}</div>
  </Tooltip>
);
