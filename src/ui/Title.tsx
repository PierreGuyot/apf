import { join } from "./helpers/helpers";
import "./title.css";

type Props = {
  title: string;
  index?: number;
  size?: "sm" | "md" | "lg";
};

export const Title = ({ title, index, size = "md" }: Props) => (
  <h1 className={join("title", `title--margin-${size}`)}>
    {index ? `${index}. ` : undefined}
    {title}
  </h1>
);
