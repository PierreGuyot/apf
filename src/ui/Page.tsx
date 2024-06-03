import { PropsWithChildren } from "react";

import "./page.css";
import { Title } from "./Title";

type Props = PropsWithChildren<{
  title?: string;
}>;

export const Page = ({ title, children }: Props) => {
  return (
    <div className="page">
      {title ? <Title title={title} size="lg" /> : undefined}
      {children}
    </div>
  );
};
