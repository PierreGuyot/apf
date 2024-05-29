import { PropsWithChildren } from "react";
import "./disclaimer.css";

export const Disclaimer = ({ children }: PropsWithChildren<{}>) => {
  return <div className="disclaimer">{children}</div>;
};
