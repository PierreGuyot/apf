export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof SIZES)[number];

export const size = (
  value: Size | "none" | undefined,
): string | number | undefined => {
  if (typeof value === "undefined") {
    return undefined;
  }

  if (value === "none") {
    return 0;
  }

  // CAUTION: this must match spacing constants in constants.css
  return `var(--spacing-${value})`;
};
