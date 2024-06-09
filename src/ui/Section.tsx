import { PropsWithChildren } from "react";

import { Item } from "./Item";
import { NestedItem } from "./NestedItem";
import { Title } from "./Title";

type Props = PropsWithChildren<{
  index?: number;
  title?: string;
}>;

const size = "md";

// TODO clean: use role `section`
export const Section = ({ title, index, children }: Props) => (
  <Item size={size}>
    {title ? <Title title={title} size={size} index={index} /> : undefined}
    <NestedItem depth={0}>{children}</NestedItem>
  </Item>
);
