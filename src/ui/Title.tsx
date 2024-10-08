import { join } from "./helpers/helpers";
import "./title.css";

type Props = {
  title: string;
  index?: number;
  size?: "sm" | "md" | "lg";
  hasMarginBottom?: boolean;
};

export const Title = ({
  title,
  index,
  size = "md",
  hasMarginBottom = true,
}: Props) => (
  <h1
    className={join(
      "title",
      `title--margin-${size}`,
      hasMarginBottom ? undefined : "title--no-margin-bottom",
    )}
  >
    {index ? `${index}. ` : undefined}
    {title}
  </h1>
);
