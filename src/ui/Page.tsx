import { PropsWithChildren } from "react";

import css from "./page.module.css";
import { Title } from "./Title";
import { join } from "./helpers/helpers";

type Props = PropsWithChildren<{
  title?: string;
  paddingTop?: "md" | "lg";
}>;

export const Page = ({ title, paddingTop = "md", children }: Props) => {
  return (
    <div className={join(css.main, css[paddingTop])}>
      {title ? <Title title={title} size="lg" /> : undefined}
      {children}
    </div>
  );
};
