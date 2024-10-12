import { join } from "./helpers/helpers";
import css from "./title.module.css";

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
      css.main,
      css[size],
      hasMarginBottom ? undefined : css.noMarginBottom,
    )}
  >
    {index ? `${index}. ` : undefined}
    {title}
  </h1>
);
