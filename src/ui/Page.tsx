import { PropsWithChildren } from "react";

import "./page.css";
import { Title } from "./Title";
import { join } from "./helpers/helpers";

type Props = PropsWithChildren<{
  title?: string;
  paddingTop?: "md" | "lg";
}>;

export const Page = ({ title, paddingTop = "md", children }: Props) => {
  return (
    <div className={join("page", `page--padding-top-${paddingTop}`)}>
      {title ? <Title title={title} size="lg" /> : undefined}
      {children}
    </div>
  );
};
