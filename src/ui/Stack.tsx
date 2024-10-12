import { PropsWithChildren } from "react";
import css from "./stack.module.css";

type Props = PropsWithChildren<{}>;

// TODO clean: replace with a Spacing component
export const Stack = ({ children }: Props) => (
  <div className={css.main}>{children}</div>
);
