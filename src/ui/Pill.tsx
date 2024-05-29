import { Tooltip } from "./Tooltip";
import "./pill.css";

type Props = {
  label: string;
};

export const Pill = ({ label }: Props) => (
  <Tooltip content={label}>
    <div className="pill"> {label} </div>
  </Tooltip>
);
