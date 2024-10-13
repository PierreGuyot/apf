import { PropsWithChildren } from "react";

import { join } from "./helpers/helpers";
import { Item } from "./Item";
import css from "./nested-item.module.css";
import { size } from "./sizes";

type Props = PropsWithChildren<{
  depth?: number;
}>;

export const NestedItem = ({ depth = 0, children }: Props) => (
  <Item size="sm">
    <div
      className={join(css.main, depth ? css.isNested : undefined)}
      style={{ paddingLeft: `calc(${depth} * ${size("lg")})` }}
    >
      {children}
    </div>
  </Item>
);
