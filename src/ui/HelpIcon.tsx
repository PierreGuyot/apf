import { ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import css from "./help-icon.module.css";
import { join } from "./helpers";
import { Text } from "./Text";

// TODO CLEAN: add size variants on design page
type Props = {
  size?: "sm" | "md";
  content: ReactNode;
};

export const HelpIcon = ({ size = "md", content }: Props) => (
  <Tooltip content={<div className={css.content}>{content}</div>}>
    <div className={join(css.main, css[size])}>
      <Text size={size}>?</Text>
    </div>
  </Tooltip>
);
