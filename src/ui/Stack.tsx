import { PropsWithChildren } from "react";
import { size, Size } from "./sizes";
import css from "./stack.module.css";
import { join } from "./helpers";

// TODO clean: add marginX/marginY/paddingX/paddingY props

type Props = PropsWithChildren<{
  direction?: "row" | "column";
  isInline?: boolean;

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

  // Free strings
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;

  // Callbacks
  onClick?: () => void;
}>;

export const Stack = ({
  direction = "column",
  isInline = false,

  // Spacing props
  spacing,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,

  alignItems,
  justifyContent,
  wrap = "nowrap",

  // Free strings
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,

  onClick,
  children,
}: Props) => (
  <div
    className={join(css.main, isInline ? css.isInline : undefined)}
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

      // Free strings
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,

      cursor: onClick ? "pointer" : undefined,
    }}
    onClick={onClick}
  >
    {children}
  </div>
);
