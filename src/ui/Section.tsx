import { PropsWithChildren } from "react";

import { Item } from "./Item";
import { Title } from "./Title";
import { NestedItem } from "./NestedItem";

type Props = PropsWithChildren<{
  title?: string;
}>;

const size = "md";

// TODO clean: use role `section`
export const Section = ({ title, children }: Props) => (
  <Item size={size}>
    {title ? <Title title={title} size={size} /> : undefined}
    <NestedItem depth={0}>{children}</NestedItem>
  </Item>
);
