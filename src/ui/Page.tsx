import { PropsWithChildren } from "react";

import "./page.css";
import { Title } from "./Title";

export const Page = ({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) => {
  return (
    <div className="page">
      {title ? <Title title={title} /> : undefined}
      {children}
    </div>
  );
};
