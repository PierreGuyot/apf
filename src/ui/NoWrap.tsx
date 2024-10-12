import { ReactNode } from "react";
import css from "./no-wrap.module.css";

type Props = { children: ReactNode };

export const NoWrap = ({ children }: Props) => {
  return <span className={css.main}>{children}</span>;
};
