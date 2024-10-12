import { PropsWithChildren } from "react";
import css from "./disclaimer.module.css";
import { Text } from "./Text";

type Props = PropsWithChildren<{}>;

export const Disclaimer = ({ children }: Props) => {
  return (
    <div className={css.main}>
      <Text color="warning">{children}</Text>
    </div>
  );
};
