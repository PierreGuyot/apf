import { PropsWithChildren } from "react";
import "./disclaimer.css";

type Props = PropsWithChildren<{}>;

export const Disclaimer = ({ children }: Props) => {
  return <div className="disclaimer">{children}</div>;
};
