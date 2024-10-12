export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof SIZES)[number];
