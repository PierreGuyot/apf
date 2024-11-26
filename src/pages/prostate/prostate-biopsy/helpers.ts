import {
  DEFAULT_LANGUAGE,
  Language,
  Option,
  range,
  toOption,
  translate,
} from "../../../ui";
import { DEFAULT_GLEASON_ITEM, GleasonItem, OtherLesionType } from "../helpers";

export type ProstateBiopsyFormId =
  | "prostate-biopsy-transrectal"
  | "prostate-biopsy-transperineal";

export const SEXTANT_COUNT = 6;
export const MAX_TARGET_COUNT = 9;
export const CONTAINER_COUNT = range(
  SEXTANT_COUNT,
  SEXTANT_COUNT + MAX_TARGET_COUNT,
);
export const CONTAINER_COUNT_OPTIONS: Option<number>[] =
  CONTAINER_COUNT.map(toOption);

// FIXME: rename to be agnostic from transrectal/transperineal
export const LOCATIONS = [
  "base-right",
  "medium-right",
  "apex-right",
  "base-left",
  "medium-left",
  "apex-left",
] as const;

export type Location = (typeof LOCATIONS)[number];

const LOCATION_LABELS_TRANSRECTAL: Record<Location, string> = {
  "base-right": "Base droite",
  "medium-right": "Milieu droit",
  "apex-right": "Apex droit",
  "base-left": "Base gauche",
  "medium-left": "Milieu gauche",
  "apex-left": "Apex gauche",
};

const LOCATION_LABELS_TRANSPERINEAL: Record<Location, string> = {
  "base-right": "Latérale droite",
  "medium-right": "Para-médiane droite",
  "apex-right": "Médiane droite",
  "base-left": "Latérale gauche",
  "medium-left": "Para-médiane gauche",
  "apex-left": "Médiane gauche",
};

const getLocations = (formId: ProstateBiopsyFormId) => {
  return formId === "prostate-biopsy-transrectal"
    ? LOCATION_LABELS_TRANSRECTAL
    : LOCATION_LABELS_TRANSPERINEAL;
};

export const getLocationLabel = (
  formId: ProstateBiopsyFormId,
  location: Location,
  language: Language,
) => translate(getLocations(formId)[location], language);

const toLocationOption = (
  formId: ProstateBiopsyFormId,
  location: Location,
  language: Language,
) => ({
  value: location,
  label: getLocationLabel(formId, location, language),
});

export const getLocationOptions = (
  formId: ProstateBiopsyFormId,
): Option<Location>[] =>
  LOCATIONS.map((location) =>
    toLocationOption(formId, location, DEFAULT_LANGUAGE),
  );

// TODO clean: rename to "systematic" | "targeted"
export type ContainerType = "sextant" | "target";
export const getContainerTypes = (
  formId: ProstateBiopsyFormId,
): Option<ContainerType>[] => {
  switch (formId) {
    case "prostate-biopsy-transrectal": {
      return [
        { value: "sextant", label: "Sextant" },
        { value: "target", label: "Cible" },
      ];
    }
    case "prostate-biopsy-transperineal": {
      return [
        { value: "sextant", label: "Biopsie systématique" },
        { value: "target", label: "Biopsie ciblée" },
      ];
    }
  }
};

export type Row = {
  index: number;
  type: ContainerType;
  location: Location;
  biopsyCount: number;
  biopsySize: number[];
  tumorCount: number;
  tumorSize: number[];
  tumorGleason: GleasonItem;
  tumorEpn: boolean;
  tumorTep: boolean;
  otherLesions: OtherLesionType[];
};

export type RowWithMetadata = Row & {
  biopsySizeInputCount: number;
  tumorSizeInputCount: number;
};

export const anEmptyRow = (partial: Partial<Row> & { index: number }): Row => ({
  type: "sextant",
  location: "base-right",
  biopsyCount: 2,
  biopsySize: [0, 0, 0, 0],
  tumorCount: 0,
  tumorSize: [0, 0, 0, 0],
  tumorGleason: DEFAULT_GLEASON_ITEM,
  tumorEpn: false,
  tumorTep: false,
  otherLesions: [],
  ...partial,
});

const totalScore = (item: GleasonItem) => item.a + item.b;

const byGleasonScore = (item2: GleasonItem, item1: GleasonItem) =>
  // By total
  totalScore(item1) - totalScore(item2) ||
  // By left value in case of equality
  item1.a - item2.a;

export const getMaximumByGleasonScore = (items: GleasonItem[]) =>
  items.sort(byGleasonScore)[0] ?? DEFAULT_GLEASON_ITEM;

// CAUTION: keys must match the ones in Row
export type Score = {
  biopsyCount: number;
  biopsySize: number;
  tumorCount: number;
  // Only computed if tumorCount is not zero
  tumorSize?: number;
  tumorGleason?: GleasonItem;
  tumorEpn?: boolean;
  tumorTep?: boolean;
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
