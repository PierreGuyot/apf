import { PropsWithChildren } from "react";

import { Item } from "./Item";
import "./line.css";

type LineProps = PropsWithChildren<{}>;

export const Line = ({ children }: LineProps) => (
  <Item size="sm">
    <div className="line">{children}</div>
  </Item>
);
