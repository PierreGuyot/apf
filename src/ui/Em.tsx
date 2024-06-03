import "./em.css";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const Em = ({ children }: Props) => {
  return <em className="em">{children}</em>;
};
