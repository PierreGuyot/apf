import "./em.css";
import { PropsWithChildren } from "react";

export const Em = ({ children }: PropsWithChildren<{}>) => {
  return <em className="em">{children}</em>;
};
