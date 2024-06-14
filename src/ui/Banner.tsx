import { ReactNode } from "react";
import "./banner.css";
import { join } from "./helpers/helpers";

type Props = {
  left: ReactNode;
  right: ReactNode;
  isWarning?: boolean;
};

export const Banner = ({ left, right, isWarning = false }: Props) => {
  return (
    <div className={join("banner", isWarning ? "banner--warning" : undefined)}>
      <div>{left}</div>
      <div className="banner-actions">{right}</div>
    </div>
  );
};
