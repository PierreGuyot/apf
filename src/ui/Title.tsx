import { join } from "./helpers/helpers";
import { NoWrap } from "./NoWrap";
import css from "./title.module.css";

type Props = {
  title: string;
  index?: number;
  size?: "md" | "lg" | "xl";
  hasMarginBottom?: boolean;
};

const COMPONENTS_BY_SIZE = {
  md: "h3",
  lg: "h2",
  xl: "h1",
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
      <NoWrap>
        {index ? `${index}. ` : undefined}
        {title}
      </NoWrap>
    </Component>
  );
};
