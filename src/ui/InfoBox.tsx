import css from "./info-box.module.css";

type Props = {
  children: React.ReactNode;
};

export const InfoBox = ({ children }: Props) => {
  return <div className={css.main}>{children}</div>;
};
