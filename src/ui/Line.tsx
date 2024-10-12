import { PropsWithChildren } from "react";

import { Item } from "./Item";
import css from "./line.module.css";

type Props = PropsWithChildren<{}>;

export const Line = ({ children }: Props) => (
  <Item size="sm">
    <div className={css.main}>{children}</div>
  </Item>
);
