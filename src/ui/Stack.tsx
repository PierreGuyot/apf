import { PropsWithChildren } from "react";
import "./stack.css";

type Props = PropsWithChildren<{}>;

export const Stack = ({ children }: Props) => (
  <div className="stack">{children}</div>
);
