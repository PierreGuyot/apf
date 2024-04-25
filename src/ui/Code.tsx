import { PropsWithChildren } from "react";

import "./code.css";

export const Code = ({ children }: PropsWithChildren<{}>) => (
  <code className="code">{children}</code>
);
