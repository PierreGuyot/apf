import { PropsWithChildren } from "react";

import css from "./nested-item.module.css";
import { size } from "./sizes";
import { Stack } from "./Stack";

type Props = PropsWithChildren<{
  depth?: number;
}>;

export const NestedItem = ({ depth = 0, children }: Props) => (
  <div
    className={depth ? css.isNested : undefined}
    style={{ paddingLeft: `calc(${depth} * ${size("lg")})` }}
  >
    <Stack spacing="md">{children}</Stack>
  </div>
);
