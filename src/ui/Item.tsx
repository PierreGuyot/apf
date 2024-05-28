import { PropsWithChildren } from "react";

import { join } from "./helpers/helpers";
import "./item.css";

type ItemProps = PropsWithChildren<{
  size?: "sm" | "md";
  hasMaxWidth?: boolean;
}>;

export const Item = ({
  size = "md",
  hasMaxWidth = true,
  children,
}: ItemProps) => (
  <div
    className={join(
      "item",
      `item--${size}`,
      hasMaxWidth ? "item--has-max-width" : undefined,
    )}
  >
    {children}
  </div>
);
