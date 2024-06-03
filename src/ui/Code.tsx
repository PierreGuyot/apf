import { PropsWithChildren } from "react";

import "./code.css";

type Props = PropsWithChildren<{}>;

export const Code = ({ children }: Props) => (
  <code className="code">{children}</code>
);
