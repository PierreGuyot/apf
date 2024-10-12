import { PropsWithChildren } from "react";

import { join } from "./helpers/helpers";
import css from "./item.module.css";

type Props = PropsWithChildren<{
  size?: "sm" | "md";
  hasMaxWidth?: boolean;
}>;

export const Item = ({ size = "md", hasMaxWidth = true, children }: Props) => (
  <div
    className={join(
      css.main,
      css[size],
      hasMaxWidth ? css.hasMaxWidth : undefined,
    )}
  >
    {children}
  </div>
);
