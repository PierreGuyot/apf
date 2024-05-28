// TODO with Louis: check English naming
import { sum } from "../../ui/helpers/helpers";
import { Pair } from "../../ui/helpers/helpers.types";
import { Option } from "../../ui/helpers/options";

export const GLEASON_SCORES = [3, 4, 5] as const;
export type GleasonScore = (typeof GLEASON_SCORES)[number];
export type GleasonPair = Pair<GleasonScore>;

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

const LOCATION_LABELS: Record<Location, string> = {
  "base-right": "Base droite",
  "medium-right": "Milieu droit",
  "apex-right": "Apex droit",
  "base-left": "Base gauche",
  "medium-left": "Milieu gauche",
  "apex-left": "Apex gauche",
};

export const getLocationLabel = (location: Location) =>
  LOCATION_LABELS[location];

const toOption = (location: Location) => ({
  value: location,
  label: getLocationLabel(location),
});

export const LOCATION_OPTIONS: Option<Location>[] = LOCATIONS.map(toOption);

export type ContainerType = "sextan" | "target";
export const CONTAINER_TYPES: Option<ContainerType>[] = [
  { value: "sextan", label: "Sextant" },
  { value: "target", label: "Cible" },
];

// TODO with Louis: complete
export type OtherLesionType = "inflammation" | "atrophy";
export const OTHER_LESION_TYPES: Option<OtherLesionType>[] = [
  { value: "inflammation", label: "Inflammation" },
  { value: "atrophy", label: "Atrophie" },
];

export type Row = {
  index: number;
  type: ContainerType;
  location: Location;
  biopsyCount: number;
  biopsySize: number[];
  tumorCount: number;
  tumorSize: number[];
  tumorGleason: GleasonPair;
  tumorEpn: boolean;
  tumorTep: boolean;
  tumorPin: boolean;
  otherLesions: OtherLesionType[];
};

export const anEmptyRow = (partial: Partial<Row> & { index: number }): Row => ({
  type: "sextan",
  location: "base-right",
  biopsyCount: 2,
  biopsySize: [0, 0, 0, 0],
  tumorCount: 0,
  tumorSize: [0, 0, 0, 0],
  tumorGleason: [3, 3],
  tumorEpn: false,
  tumorTep: false,
  tumorPin: false,
  otherLesions: [],
  ...partial,
});

const byGleasonScore = (a: GleasonPair, b: GleasonPair) =>
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
  // Only computed if tumorCount is not zero
  tumorSize?: number;
  tumorGleason?: GleasonPair;
  tumorEpn?: boolean;
  tumorTep?: boolean;
  tumorPin?: boolean;
};

// PIRADS: Prostate Imaging Reporting & Data System

export type PiradsScore = 2 | 3 | 4 | 5;

export type PiradsItem = {
  score: PiradsScore; // Malignancy score
  location: Location;
};

export const anEmptyPiradsItem = (): PiradsItem => ({
  score: 2,
  location: "base-right",
});

// ISUP score: International Society of Urological Pathology score
// See https://www.prostate.org.au/testing-and-diagnosis/grading-genetics/your-gleason-score-isup-grade
export const getIsupScore = ([a, b]: GleasonPair): number => {
  if (a + b === 6) {
    return 1;
  }

  if (a + b === 7) {
    if (a === 3) {
      return 2;
    }

    return 4;
  }

  if (a + b === 8) {
    return 4;
  }

  return 5;
};
