import { PropsWithChildren } from "react";

import { NestedItem } from "./NestedItem";
import { Title } from "./Title";

type Props = PropsWithChildren<{
  title?: string;
}>;

// TODO clean: use role `section`?
export const SubSection = ({ title, children }: Props) => (
  <div>
    {title ? <Title title={title} /> : undefined}
    <NestedItem depth={1}>{children}</NestedItem>
  </div>
);
