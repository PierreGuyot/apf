import { PropsWithChildren } from "react";
import { size, Size } from "./sizes";
import css from "./stack.module.css";

type Props = PropsWithChildren<{
  direction?: "row" | "column";

  // Spacing props
  spacing?: Size | "none";
  margin?: Size | "none";
  marginTop?: Size | "none";
  marginRight?: Size | "none";
  marginBottom?: Size | "none";
  marginLeft?: Size | "none";
  padding?: Size | "none";
  paddingTop?: Size | "none";
  paddingRight?: Size | "none";
  paddingBottom?: Size | "none";
  paddingLeft?: Size | "none";

  alignItems?: "start" | "center" | "end";
  justifyContent?: "start" | "center" | "space-between";
  wrap?: "wrap" | "nowrap";
  maxWidth?: string; // Free string
}>;

export const Stack = ({
  direction = "column",

  // Spacing props
  spacing = "none",
  margin = "none",
  marginTop = "none",
  marginRight = "none",
  marginBottom = "none",
  marginLeft = "none",
  padding = "none",
  paddingTop = "none",
  paddingRight = "none",
  paddingBottom = "none",
  paddingLeft = "none",

  alignItems,
  justifyContent,
  wrap = "nowrap",
  maxWidth,
  children,
}: Props) => (
  <div
    className={css.main}
    style={{
      flexDirection: direction,

      // Spacing props
      gap: size(spacing),
      margin: size(margin),
      marginTop: size(marginTop),
      marginRight: size(marginRight),
      marginBottom: size(marginBottom),
      marginLeft: size(marginLeft),
      padding: size(padding),
      paddingTop: size(paddingTop),
      paddingRight: size(paddingRight),
      paddingBottom: size(paddingBottom),
      paddingLeft: size(paddingLeft),

      alignItems,
      justifyContent,
      flexWrap: wrap,
      maxWidth,
    }}
  >
    {children}
  </div>
);
