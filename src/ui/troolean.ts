import {
  findOption,
  NO_ITEM,
  Option,
  UNSPECIFIED_ITEM,
  YES_ITEM,
} from "./helpers";

const TROOLEANS = ["yes", "no", "unspecified"] as const;

export type Troolean = (typeof TROOLEANS)[number];

export const TROOLEAN_OPTIONS: Option<Troolean>[] = [
  YES_ITEM,
  NO_ITEM,
  UNSPECIFIED_ITEM,
];

export const getTrooleanOption = findOption(TROOLEAN_OPTIONS);
