import { ReactNode } from "react";
import { join } from "./helpers";
import css from "./text.module.css";

type Props = {
  as?: "span" | "div";
  size?: "sm" | "md" | "inherit";
  color?: "default" | "warning" | "inherit";
  variant?: "thin" | "bold";
  shouldWrap?: boolean;
  children: ReactNode;
};

export const Text = ({
  as = "span",
  size = "inherit",
  color = "inherit",
  variant = "thin",
  shouldWrap = true,
  children,
}: Props) => {
  const Component = as;

  return (
    <Component
      className={join(
        css.main,
        css[`color--${color}`],
        css[`variant--${variant}`],
        css[`size--${size}`],
        shouldWrap ? undefined : css.noWrap,
      )}
    >
      {children}
    </Component>
  );
};
