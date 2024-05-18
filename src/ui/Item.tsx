import { PropsWithChildren } from "react";

import "./item.css";
import { join, px } from "./helpers/helpers";

type ItemProps = PropsWithChildren<{
  depth?: number;
}>;

const BASE_NESTING = 25;
export const Item = ({ children, depth = 0 }: ItemProps) => (
  <div
    className={join("item", depth ? "item--is-nested" : undefined)}
    style={{ paddingLeft: px(depth * BASE_NESTING) }}
  >
    {children}
  </div>
);
