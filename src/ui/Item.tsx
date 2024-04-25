import { PropsWithChildren } from "react";

import "./item.css";

type ItemProps = PropsWithChildren<{}>;

export const Item = ({ children }: ItemProps) => (
  <div className="item">{children}</div>
);
