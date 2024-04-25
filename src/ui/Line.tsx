import { PropsWithChildren } from "react";

import { Item } from "./Item";
import "./line.css";

type LineProps = PropsWithChildren<{}>;

export const Line = ({ children }: LineProps) => (
  <Item>
    <div className="line">{children}</div>
  </Item>
);
