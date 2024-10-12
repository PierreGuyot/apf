import { PropsWithChildren } from "react";
import css from "./stack.module.css";
import { Size } from "./sizes";
import { join } from "./helpers/helpers";

type Props = PropsWithChildren<{
  direction?: "row" | "column";
  spacing?: Size | "none";
}>;

export const Stack = ({
  spacing = "none",
  direction = "column",
  children,
}: Props) => (
  <div className={join(css.main, css[spacing], css[direction])}>{children}</div>
);
