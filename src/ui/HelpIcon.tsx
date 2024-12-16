import { ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import css from "./help-icon.module.css";
import { join } from "./helpers";
import { Text } from "./Text";

type Props = {
  variant?: "info" | "error";
  size?: "xs" | "sm" | "md";
  isInline?: boolean;
  content: ReactNode;
};

export const HelpIcon = ({
  variant = "info",
  size = "md",
  isInline,
  content,
}: Props) => (
  <Tooltip
    variant={variant}
    content={<div className={css.content}>{content}</div>}
  >
    <div
      className={join(
        css.main,
        css[size],
        css[variant],
        isInline ? css.isInline : undefined,
      )}
    >
      <Text size={size} variant="bold">
        {variant === "info" ? "?" : "!"}
      </Text>
    </div>
  </Tooltip>
);
