export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof SIZES)[number];

export const size = (value: Size | "none"): string | undefined => {
  if (value === "none") {
    return undefined;
  }

  // CAUTION: this must match spacing constants in constants.css
  return `var(--spacing-${value})`;
};
