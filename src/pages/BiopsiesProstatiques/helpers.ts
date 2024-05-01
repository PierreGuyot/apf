// TODO: check naming in English with Louis
import { sum } from "../../ui/helpers";
import { Pair } from "../../ui/helpers.types";
import { Option } from "../../ui/options";

// TODO clean:
// - create base `Range` type
// - create typed `range` helper
// - type `InputNumber` based on `min` and `max` props

export const GLEASON_SCORES = [3, 4, 5] as const;
export type GleasonScore = (typeof GLEASON_SCORES)[number];
export type GleasonPair = Pair<GleasonScore>;

export const BIOPSY_COUNT = [1, 2, 3, 4] as const;
export type BiopsyCount = (typeof BIOPSY_COUNT)[number];

export const CONTAINER_COUNT = [6, 7, 8, 9] as const;
export type ContainerCount = (typeof CONTAINER_COUNT)[number];

export const SEXTAN_COUNT = 6;
export const MAX_TARGET_COUNT = 3;
export const MAX_CONTAINER_COUNT = 9;

export const LOCATIONS = [
  "base-right",
  "medium-right",
  "apex-right",
  "base-left",
  "medium-left",
  "apex-left",
];
export type Location = (typeof LOCATIONS)[number];
export const LOCATION_OPTIONS: Option<Location>[] = [
  { value: "base-right", label: "Base droite" },
  { value: "medium-right", label: "Milieu droit" },
  { value: "apex-right", label: "Apex droit" },
  { value: "base-left", label: "Base gauche" },
  { value: "medium-left", label: "Milieu gauche" },
  { value: "apex-left", label: "Apex gauche" },
];

export type ContainerType = "sextan" | "target";

export const CONTAINER_TYPES: Option<ContainerType>[] = [
  { value: "sextan", label: "Sextant" },
  { value: "target", label: "Cible" },
] as const;

export type Row = {
  index: number;
  type: ContainerType;
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

export const anEmptyRow = (partial: Partial<Row> & { index: number }): Row => ({
  type: "sextan",
  location: "base-right",
  biopsyCount: 2,
  biopsySize: [0, 0],
  tumorCount: 0,
  tumorSize: [0, 0],
  tumorGleason: [3, 3],
  tumorEpn: false,
  tumorTep: false,
  tumorPin: false,
  otherLesions: "",
  ...partial,
});

const byGleasonScore = (a: Pair, b: Pair) =>
  // By sum
  sum(b) - sum(a) ||
  // By left value in case of equality
  b[0] - a[0];

const DEFAULT_GLEASON_PAIR: GleasonPair = [3, 3];
export const getMaximumByGleasonScore = (pairs: GleasonPair[]) =>
  pairs.sort(byGleasonScore)[0] ?? DEFAULT_GLEASON_PAIR;

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
