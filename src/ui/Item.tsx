import { PropsWithChildren } from "react";

import "./item.css";
import { join, px } from "./helpers/helpers";

type ItemProps = PropsWithChildren<{
  depth?: number;
  hasMaxWidth?: boolean;
}>;

const BASE_NESTING = 25;

export const Item = ({
  children,
  depth = 0,
  hasMaxWidth = true,
}: ItemProps) => (
  <div
    className={join(
      "item",
      depth ? "item--is-nested" : undefined,
      hasMaxWidth ? "item--has-max-width" : undefined,
    )}
    style={{ paddingLeft: px(depth * BASE_NESTING) }}
  >
    {children}
  </div>
);
