// TODO: check naming in English with Louis
// TODO: extract a dedicated valueOf helper

import { Pair, sum } from "../../ui/helpers";
import { Option } from "../../ui/options";

// PIRADS: Prostate Imaging Reporting & Data System

export type PiradsItem = {
  count: number;
  location: string;
};

export const anEmptyPiradsItem = (): PiradsItem => ({
  count: 0,
  location: "",
});

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

// TODO: flatten type to simplify Table access and update
export type Row = {
  index: number;
  type: PotType;
  location: Location;
  biopsy: {
    count: number;
    size: Pair;
  };
  tumor: {
    count: number;
    size: Pair;
    gleason: Pair;
    epn: boolean;
    tep: boolean;
    pin: boolean;
  };
  otherLesions: string;
};

export const anEmptyRow = (index: number): Row => ({
  index,
  type: "sextan",
  location: "base-right",
  biopsy: { count: 2, size: [0, 0] },
  tumor: {
    count: 0,
    size: [0, 0],
    gleason: [0, 0],
    epn: false,
    tep: false,
    pin: false,
  },
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

const DEFAULT_PAIR: Pair = [0, 0];
export const getMaximumByGleasonScore = (pairs: Pair[]) =>
  pairs.sort(byGleasonScore)[0] ?? DEFAULT_PAIR;

export type Score = {
  "biopsy-count": number;
  "biopsy-size": number;
  "tumor-count": number;
  "tumor-size": number;
  gleason: Pair;
};
