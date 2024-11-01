import { PropsWithChildren } from "react";

import { Stack } from "./Stack";

type Props = PropsWithChildren<{}>;

export const Line = ({ children }: Props) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing="sm"
    minHeight={"var(--height-md)"}
  >
    {children}
  </Stack>
);
