import { PropsWithChildren } from "react";

import "./inline-code.css";

type Props = PropsWithChildren<{}>;

export const InlineCode = ({ children }: Props) => (
  <code className="inline-code">{children}</code>
);
