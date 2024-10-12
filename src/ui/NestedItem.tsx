import { PropsWithChildren } from "react";

import { join, px } from "./helpers/helpers";
import css from "./nested-item.module.css";
import { Item } from "./Item";

type Props = PropsWithChildren<{
  depth?: number;
}>;

const BASE_NESTING = 25;

export const NestedItem = ({ depth = 0, children }: Props) => (
  <Item size="sm">
    <div
      className={join(css.main, depth ? css.isNested : undefined)}
      style={{ paddingLeft: px(depth * BASE_NESTING) }}
    >
      {children}
    </div>
  </Item>
);
