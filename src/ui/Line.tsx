import { PropsWithChildren } from "react";

import { Item } from "./Item";
import "./line.css";

type Props = PropsWithChildren<{}>;

export const Line = ({ children }: Props) => (
  <Item size="sm">
    <div className="line">{children}</div>
  </Item>
);
