import { join } from "./helpers";
import "./title.css";

type TitleProps = {
  title: string;
  marginBottom?: "sm" | "md";
};

export const Title = ({ title, marginBottom = "md" }: TitleProps) => (
  <h1 className={join("title", `title--margin-bottom-${marginBottom}`)}>
    {title}
  </h1>
);
