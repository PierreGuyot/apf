import { ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import css from "./help-icon.module.css";
import { join } from "./helpers";
import { Text } from "./Text";

type Props = {
  size?: "xs" | "sm" | "md";
  content: ReactNode;
  variant?: "info" | "error";
};

export const HelpIcon = ({ variant = "info", size = "md", content }: Props) => (
  <Tooltip
    variant={variant}
    content={<div className={css.content}>{content}</div>}
  >
    <div className={join(css.main, css[size], css[variant])}>
      <Text size={size} variant="bold">
        {variant === "info" ? "?" : "!"}
      </Text>
    </div>
  </Tooltip>
);
