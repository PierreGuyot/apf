import { PropsWithChildren } from "react";

import { NestedItem } from "./NestedItem";
import { Title } from "./Title";
import { Stack } from "./Stack";
import { FORM_MAX_WIDTH } from "./helpers";

type Props = PropsWithChildren<{
  index?: number;
  title?: string;
  hasMaxWidth?: boolean;
}>;

// TODO clean: use role `section`
export const Section = ({
  title,
  index,
  hasMaxWidth = true,
  children,
}: Props) => (
  <Stack maxWidth={hasMaxWidth ? FORM_MAX_WIDTH : undefined}>
    {title ? <Title title={title} size="lg" index={index} /> : undefined}
    <NestedItem depth={0}>{children}</NestedItem>
  </Stack>
);
