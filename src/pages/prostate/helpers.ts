import { filterEmpty } from "../../ui/helpers/helpers";
import { Option, SelectValue } from "../../ui/helpers/options";
import { getPercentageValues, percent } from "../../ui/helpers/percent";
import { Language, translate } from "../../ui/language";

export const GLEASON_SCORES = [3, 4, 5] as const;
export type GleasonScore = (typeof GLEASON_SCORES)[number];
export type GleasonItem = {
  a: GleasonScore;
  b: GleasonScore;
  percentage: number;
  cribriformPercentage: number;
};

export const DEFAULT_GLEASON_ITEM: GleasonItem = {
  a: 3,
  b: 3,
  percentage: 95,
  cribriformPercentage: 0,
};

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
    label: "Adénomyome prostatique",
    shortLabel: "Adénomyome prostatique",
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
  { title: "Glandulaire", items: TUMOR_TYPES_GLANDULAR },
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

export const getCribriformPercentageOptions = (language: Language) => [
  { value: 0, label: translate("non cribriforme", language) },
  ...getPercentageValues({ min: 10, max: 100, step: 10 }).map((value) => ({
    value,

    // Note: inline translation
    label:
      language === "FR"
        ? `dont ${value}% cribriformes`
        : `including cribriform ${value}%`,
  })),
];

export const getGleasonSummary = (
  { a, b, percentage, cribriformPercentage }: GleasonItem,
  language: Language,
) => {
  const match = getCribriformPercentageOptions(language).find(
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
