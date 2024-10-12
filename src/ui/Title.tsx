import { join } from "./helpers/helpers";
import css from "./title.module.css";

type Props = {
  title: string;
  index?: number;
  // TODO clean: remap sizes to "md" | "lg" | "xl"
  size?: "sm" | "md" | "lg";
  hasMarginBottom?: boolean;
};

const COMPONENTS_BY_SIZE = {
  sm: "h3",
  md: "h2",
  lg: "h1",
} as const;

export const Title = ({
  title,
  index,
  size = "md",
  hasMarginBottom = true,
}: Props) => {
  const Component = COMPONENTS_BY_SIZE[size];

  return (
    <Component
      className={join(
        css.main,
        css[size],
        hasMarginBottom ? undefined : css.noMarginBottom,
      )}
    >
      {index ? `${index}. ` : undefined}
      {title}
    </Component>
  );
};
