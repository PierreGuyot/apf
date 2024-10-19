import { ReactNode } from "react";
import css from "./banner.module.css";
import { join } from "./helpers/helpers";
import { Stack } from "./Stack";

type Props = {
  left: ReactNode;
  right: ReactNode;
  isWarning?: boolean;
};

export const Banner = ({ left, right, isWarning = false }: Props) => {
  return (
    <div className={join(css.main, isWarning ? css.warning : undefined)}>
      <Stack direction="row" justifyContent="space-between" spacing="md">
        <div>{left}</div>
        <Stack direction="row" spacing="sm">
          {right}
        </Stack>
      </Stack>
    </div>
  );
};
