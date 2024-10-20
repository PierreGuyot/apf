// FIXME: check naming in both French and English
import { Option } from "../../../ui/helpers/options";
import { DEFAULT_LANGUAGE, Language, translate } from "../../../ui/translation";
import { DEFAULT_GLEASON_ITEM, GleasonItem, OtherLesionType } from "../helpers";

export type ProstateBiopsyFormId =
  | "prostate-biopsy-transrectal"
  | "prostate-biopsy-transperineal";

export const SEXTANT_COUNT = 6;
export const MAX_TARGET_COUNT = 3;

// FIXME: rename to be agnostic from transrectal/transperineal
export const LOCATIONS = [
  "base-right",
  "medium-right",
  "apex-right",
  "base-left",
  "medium-left",
  "apex-left",
];

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
  "base-right": "Zone périphérique latérale droite",
  "medium-right": "Zone périphérique para-médiane droite",
  "apex-right": "Zone périphérique médiane droite",
  "base-left": "Zone périphérique latérale gauche",
  "medium-left": "Zone périphérique para-médiane gauche",
  "apex-left": "Zone périphérique médiane gauche",
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

const toOption = (
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
  LOCATIONS.map((location) => toOption(formId, location, DEFAULT_LANGUAGE));

// FIXME: rename to "systematic" | "targeted"
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

// ISUP score: International Society of Urological Pathology score
// See https://www.prostate.org.au/testing-and-diagnosis/grading-genetics/your-gleason-score-isup-grade
export const getIsupScore = ({
  a,
  b,
}: Pick<GleasonItem, "a" | "b">): number => {
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
