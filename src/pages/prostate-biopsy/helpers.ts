// TODO with Louis: check naming in both French and English
import { filterEmpty } from "../../ui/helpers/helpers";
import { Option, SelectValue } from "../../ui/helpers/options";
import { getPercentageValues, percent } from "../../ui/helpers/percent";

export const GLEASON_SCORES = [3, 4, 5] as const;
export type GleasonScore = (typeof GLEASON_SCORES)[number];
export type GleasonItem = {
  a: GleasonScore;
  b: GleasonScore;
  percentage: number;
  cribriformPercentage: number;
};

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

export type OtherLesionType =
  | "adenosis"
  | "ASAP"
  | "atrophy"
  | "base-cell-hyperplasia"
  | "inflammation"
  | "invasive-ductal-carcinoma"
  | "partial-atrophy"
  | "PINHG"
  | "post-atrophic-hyperplasia"
  | "prostate-adenomyoma";

const OTHER_LESION_TYPES_PRECANCEROUS: Array<
  Option<OtherLesionType> & { shortLabel: string }
> = [
  {
    value: "invasive-ductal-carcinoma",
    label: "Carcinome intra-ductal",
    shortLabel: "Carcinome intra-ductal",
  },
  {
    value: "PINHG",
    label: "Néoplasie intra-épithéliale de haut grade",
    shortLabel: "PINHG",
  },
  {
    value: "ASAP",
    label: "Prolifération acinaire atypique",
    shortLabel: "ASAP",
  },
];

// Ordered according to label alphabetical order
const OTHER_LESION_TYPES_BENIGN: Array<
  Option<OtherLesionType> & { shortLabel: string }
> = [
  {
    value: "prostate-adenomyoma",
    label: "Adénomyome de la prostate",
    shortLabel: "Adénomyome de la prostate",
  },
  {
    value: "adenosis",
    label: "Adénose",
    shortLabel: "Adénose",
  },
  {
    value: "atrophy",
    label: "Atrophie",
    shortLabel: "Atrophie",
  },
  {
    value: "partial-atrophy",
    label: "Atrophie partielle",
    shortLabel: "Atrophie partielle",
  },
  {
    value: "base-cell-hyperplasia",
    label: "Hyperplasie des cellules basales",
    shortLabel: "Hyperplasie des cellules basales",
  },
  {
    value: "post-atrophic-hyperplasia",
    label: "Hyperplasie post-atrophique",
    shortLabel: "Hyperplasie post-atrophique",
  },
  {
    value: "inflammation",
    label: "Inflammation",
    shortLabel: "Inflammation",
  },
];

export const OTHER_LESION_GROUPS = [
  {
    title: "Lésions tumorales précancéreuses",
    items: OTHER_LESION_TYPES_PRECANCEROUS,
  },
  {
    title: "Lésions tumorales bégnines",
    items: OTHER_LESION_TYPES_BENIGN,
  },
];

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

export const DEFAULT_GLEASON_ITEM: GleasonItem = {
  a: 3,
  b: 3,
  percentage: 95,
  cribriformPercentage: 0,
};

export const anEmptyRow = (partial: Partial<Row> & { index: number }): Row => ({
  type: "sextan",
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

type TumorTypeGlandular =
  | "acinar-adenocarcinoma-conventional"
  | "acinar-adenocarcinoma-signet-ring-like-cell"
  | "acinar-adenocarcinoma-pleomorphic-giant-cell"
  | "acinar-adenocarcinoma-sarcomatoid"
  | "acinar-adenocarcinoma-prostatic-intraepithelial-neoplasia-like"
  | "adenocarcinoma-intraductal";

type OptionWithGleasonScore<T extends SelectValue> = Option<T> & {
  score?: GleasonScore;
};

const TUMOR_TYPES_GLANDULAR: OptionWithGleasonScore<TumorTypeGlandular>[] = [
  {
    value: "acinar-adenocarcinoma-conventional" as const,
    label: "Adénocarcinome acinaire de type prostatique",
  },
  {
    value: "acinar-adenocarcinoma-signet-ring-like-cell" as const,
    label: "Adénocarcinome acinaire à cellules indépendantes",
    score: 5 as const,
  },
  {
    value: "acinar-adenocarcinoma-pleomorphic-giant-cell" as const,
    label: "Adénocarcinome acinaire à cellules pléomorphes",
    score: 5 as const,
  },
  {
    value: "acinar-adenocarcinoma-sarcomatoid" as const,
    label: "Adénocarcinome acinaire sarcomatoïde",
    score: 5 as const,
  },
  {
    value:
      "acinar-adenocarcinoma-prostatic-intraepithelial-neoplasia-like" as const,
    label: "Adénocarcinome acinaire de type néoplasie intra-épithéliale",
    score: 3 as const,
  },
  {
    value: "adenocarcinoma-intraductal" as const,
    label: "Adénocarcinome ductal",
    score: 4 as const,
  },
].map((item) =>
  item.score ? { ...item, label: `${item.label} (score ${item.score})` } : item,
);

type TumorTypeEpidermoid =
  | "carcinoma-adenosquamous"
  | "carcinoma-squamous-cell"
  | "carcinoma-basal-cell";

const TUMOR_TYPES_EPIDERMOID: Option<TumorTypeEpidermoid>[] = [
  {
    value: "carcinoma-adenosquamous",
    label: "Carcinome adénosquameux",
  },
  {
    value: "carcinoma-squamous-cell",
    label: "Carcinome épidermoïde",
  },
  {
    value: "carcinoma-basal-cell",
    label: "Carcinome adénoïde kystique de sous-type basal",
  },
];

type TumorTypeNeuroendocrine =
  | "adenocarcinoma-with-neuroendocrine-differentiation"
  | "well-differentiated-neuroendocrine-tumor"
  | "neuroendocrine-carcinoma-small-cell"
  | "neuroendocrine-carcinoma-large-cell";

const TUMOR_TYPES_NEUROENDOCRINE: Option<TumorTypeNeuroendocrine>[] = [
  {
    value: "adenocarcinoma-with-neuroendocrine-differentiation",
    label: "Adénocarcinome avec différenciation neuroendocrine",
  },
  {
    value: "well-differentiated-neuroendocrine-tumor",
    label: "Tumeur neuroendocrine bien différenciée",
  },
  {
    value: "neuroendocrine-carcinoma-small-cell",
    label: "Carcinome neuroendocrine à petites cellules",
  },
  {
    value: "neuroendocrine-carcinoma-large-cell",
    label: "Carcinome neuroendocrine à grandes cellules",
  },
];

export type TumorType =
  | TumorTypeGlandular
  | TumorTypeEpidermoid
  | TumorTypeNeuroendocrine;

export const TUMOR_TYPES: Array<{
  title: string;
  items: OptionWithGleasonScore<TumorType>[];
}> = [
  { title: "Glandulaires", items: TUMOR_TYPES_GLANDULAR },
  { title: "Épidermoïde", items: TUMOR_TYPES_EPIDERMOID },
  { title: "Neuroendocrine", items: TUMOR_TYPES_NEUROENDOCRINE },
];

const flatTumorTypes = Object.fromEntries(
  TUMOR_TYPES.flatMap((group) => group.items).map((item) => [item.value, item]),
);
export const getTumorTypeOption = (tumorType: TumorType) => {
  const match = flatTumorTypes[tumorType];
  if (!match) {
    throw new Error("Invalid value");
  }

  return match;
};

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

export const CRIBRIFORM_PERCENTAGE_OPTIONS = [
  { value: 0, label: "non cribriforme" },
  ...getPercentageValues({ min: 10, max: 100, step: 10 }).map((value) => ({
    value,
    label: `dont ${value}% cribriformes`,
  })),
];

export const getGleasonSummary = ({
  a,
  b,
  percentage,
  cribriformPercentage,
}: GleasonItem) => {
  const match = CRIBRIFORM_PERCENTAGE_OPTIONS.find(
    (item) => item.value === cribriformPercentage,
  );
  if (!match) {
    throw new Error("Invalid value");
  }

  // CAUTION: this should be aligned on the non-readonly case
  const items = [
    a,
    a === b ? undefined : `à ${percent(percentage)}`,
    a === 4 && b !== 4 ? match.label : undefined,
    "+",
    b,
    a === b ? undefined : `à ${percent(100 - percentage)}`,
    b === 4 ? match.label : undefined,
  ]
    .filter(filterEmpty)
    .join(" ");

  return `${a + b} (${items})`;
};
