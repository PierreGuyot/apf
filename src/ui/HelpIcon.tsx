import { ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import "./help-icon.css";

type Props = {
  content: ReactNode;
};

export const HelpIcon = ({ content }: Props) => (
  <Tooltip content={content}>
    <div className="help-icon">?</div>
  </Tooltip>
);
