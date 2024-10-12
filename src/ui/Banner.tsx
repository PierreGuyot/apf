import { ReactNode } from "react";
import css from "./banner.module.css";
import { join } from "./helpers/helpers";

type Props = {
  left: ReactNode;
  right: ReactNode;
  isWarning?: boolean;
};

export const Banner = ({ left, right, isWarning = false }: Props) => {
  return (
    <div className={join(css.main, isWarning ? css.warning : undefined)}>
      <div>{left}</div>
      <div className={css.actions}>{right}</div>
    </div>
  );
};
