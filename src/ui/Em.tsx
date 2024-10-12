import css from "./em.module.css";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

// TODO clean: extract proper Text component with props `variant`, `color`, and `shouldWrap`
export const Em = ({ children }: Props) => {
  return <em className={css.main}>{children}</em>;
};
