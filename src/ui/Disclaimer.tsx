import { PropsWithChildren } from "react";
import css from "./disclaimer.module.css";

type Props = PropsWithChildren<{}>;

export const Disclaimer = ({ children }: Props) => {
  return <div className={css.main}>{children}</div>;
};
