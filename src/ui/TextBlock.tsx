import { PropsWithChildren } from "react";
import css from "./text-block.module.css";

type Props = PropsWithChildren<{}>;

export const TextBlock = ({ children }: Props) => (
  <pre className={css.main}>{children}</pre>
);
