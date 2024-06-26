import { PropsWithChildren } from "react";

import { join, px } from "./helpers/helpers";
import "./nested-item.css";
import { Item } from "./Item";

type Props = PropsWithChildren<{
  depth?: number;
}>;

const BASE_NESTING = 25;

export const NestedItem = ({ depth = 0, children }: Props) => (
  <Item size="sm">
    <div
      className={join(
        "nested-item",
        depth ? "nested-item--is-nested" : undefined,
      )}
      style={{ paddingLeft: px(depth * BASE_NESTING) }}
    >
      {children}
    </div>
  </Item>
);
