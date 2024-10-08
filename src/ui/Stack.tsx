import { PropsWithChildren } from "react";
import "./stack.css";

type Props = PropsWithChildren<{}>;

// TODO design-system: replace with a Spacing component
export const Stack = ({ children }: Props) => (
  <div className="stack">{children}</div>
);
