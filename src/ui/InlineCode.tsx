import { PropsWithChildren } from "react";

import css from "./inline-code.module.css";

type Props = PropsWithChildren<{}>;

export const InlineCode = ({ children }: Props) => (
  <span className={css.main}>{children}</span>
);
