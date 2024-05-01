// TODO: check naming in English with Louis
// TODO: extract a dedicated valueOf helper

import { Pair, sum } from "../../ui/helpers";
import { Option } from "../../ui/options";

// TODO:
// - create base `Range` type
// - create typed `range` helper
// - type `InputNumber` base on `min` and `max` props

export const GLEASON_SCORES = [3, 4, 5] as const;
export type GleasonScore = (typeof GLEASON_SCORES)[number];
export type GleasonPair = Pair<GleasonScore>;

export const BIOPSY_COUNT = [1, 2, 3, 4] as const;
export type BiopsyCount = (typeof BIOPSY_COUNT)[number];

export const SEXTAN_COUNT = 6;

export type Location =
  | "base-right"
  | "medium-right"
  | "apex-right"
  | "base-left"
  | "medium-left"
  | "apex-left";

export const LOCATIONS: Option<Location>[] = [
  { value: "base-right", label: "Base droite" },
  { value: "medium-right", label: "Milieu droit" },
  { value: "apex-right", label: "Apex droit" },
  { value: "base-left", label: "Base gauche" },
  { value: "medium-left", label: "Milieu gauche" },
  { value: "apex-left", label: "Apex gauche" },
];

export type PotType = "sextan" | "target";

export const POT_TYPES: Option<PotType>[] = [
  { value: "sextan", label: "Sextant" },
  { value: "target", label: "Cible" },
] as const;

export type Row = {
  index: number;
  type: PotType;
  location: Location;
  biopsyCount: BiopsyCount;
  biopsySize: Pair;
  tumorCount: number;
  tumorSize: Pair;
  tumorGleason: GleasonPair;
  tumorEpn: boolean;
  tumorTep: boolean;
  tumorPin: boolean;
  otherLesions: string;
};

export const anEmptyRow = (index: number): Row => ({
  index,
  type: "sextan",
  location: "base-right",
  biopsyCount: 2,
  biopsySize: [0, 0],
  tumorCount: 0,
  tumorSize: [0, 0],
  tumorGleason: [3, 3],

  // TODO: check naming with Louis
  tumorEpn: false,
  tumorTep: false,
  tumorPin: false,
  otherLesions: "",
});

const EMPTY_LINE = "";

// TODO: test thoroughly
export const generateReport = ({
  score,
  rows,
  comment,
}: {
  score: Score;
  rows: Row[];
  comment: string;
}): string => {
  return [
    // TODO: un-mock
    JSON.stringify(score, null, 2),
    JSON.stringify(rows),
    EMPTY_LINE,
    comment,
  ].join("\n");
};

const byGleasonScore = (a: Pair, b: Pair) =>
  // By sum
  sum(b) - sum(a) ||
  // By left value in case of equality
  b[0] - a[0];

const DEFAULT_GLEASON_PAIR: GleasonPair = [3, 3];
export const getMaximumByGleasonScore = (pairs: GleasonPair[]) =>
  pairs.sort(byGleasonScore)[0] ?? DEFAULT_GLEASON_PAIR;

// TODO: what about lesions? Do we need to save the table too?
// CAUTION: keys must match the ones in Row
export type Score = {
  biopsyCount: number;
  biopsySize: number;
  tumorCount: number;
  tumorSize: number;
  tumorGleason: GleasonPair;
  tumorEpn: boolean;
  tumorTep: boolean;
  tumorPin: boolean;
};

// PIRADS: Prostate Imaging Reporting & Data System

export type PiradsItem = {
  score: number; // Malignancy score
  location: Location;
};

export const anEmptyPiradsItem = (): PiradsItem => ({
  score: 0,
  location: "base-right",
});
