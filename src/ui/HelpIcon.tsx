import { ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import css from "./help-icon.module.css";

type Props = {
  content: ReactNode;
};

export const HelpIcon = ({ content }: Props) => (
  <Tooltip content={content}>
    <div className={css.main}>?</div>
  </Tooltip>
);
