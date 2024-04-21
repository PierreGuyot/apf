import { PropsWithChildren } from "react";

import "./line.css";

type LineProps = PropsWithChildren<{}>;

export const Line = ({ children }: LineProps) => {
  return <div className="line">{children}</div>;
};
