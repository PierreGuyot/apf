import { join } from "./helpers/helpers";
import "./title.css";

type TitleProps = {
  title: string;
  index?: number;
  size?: "sm" | "md" | "lg";
};

export const Title = ({ title, index, size = "md" }: TitleProps) => (
  <h1 className={join("title", `title--margin-${size}`)}>
    {index ? `${index}. ` : undefined}
    {title}
  </h1>
);
