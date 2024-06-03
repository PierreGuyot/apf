import { PropsWithChildren } from "react";
import "./text-block.css";

type Props = PropsWithChildren<{}>;

export const TextBlock = ({ children }: Props) => (
  <pre className="text-block">{children}</pre>
);
