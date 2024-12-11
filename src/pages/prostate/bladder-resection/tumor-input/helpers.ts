import {
  findOption,
  Option,
  OptionOrGroup,
  OTHER_ITEM,
  toOption,
} from "../../../../ui";
import { CarcinomaSubtypes as CarcinomaComposition } from "../helpers";

export type BladderResectionFormId = "bladder-transurethral-resection";

/** Tumor type */

export const TUMOR_TYPES_BY_CATEGORY = {
  "Carcinome urothélial papillaire, non invasif": [
    "Carcinome urothélial papillaire, non invasif",
  ],
  "Papillome urothélial": ["Papillome urothélial"],
  "Tumeur urothéliale papillaire vésicale de bas potentiel de malignité": [
    "Tumeur urothéliale papillaire vésicale de bas potentiel de malignité",
  ],
  "Papillome inversé urothélial": ["Papillome inversé urothélial"],
  "Carcinome urothélial in situ": ["Carcinome urothélial in situ"],
  "Carcinome urothélial invasif": [
    "Carcinome urothélial conventionnel",
    "Carcinome urothélial micropapillaire",
    "Carcinome urothélial en nid",
    "Carcinome urothélial, tubulaire et microkystique",
    "Carcinome urothélial, de type lymphoépithélial",
    "Carcinome urothélial de type plasmacytoïde",
    "Carcinome urothélial sarcomatoïde",
    "Carcinome urothélial à cellules géantes",
    "Carcinome urothélial peu différencié",
    "Carcinome urothélial riche en lipides",
    "Carcinome urothélial à cellules claires (riche en glycogène)",
    "Carcinome urothélial à différenciation malpighienne",
    "Carcinome urothélial à différenciation glandulaire",
    "Carcinome urothélial avec différenciation trophoblastique",
    "Carcinome urothélial à différenciation müllérienne",
  ],
  Malpighien: [
    "Carcinome épidermoïde",
    "Carcinome verruqueux",
    "Carcinome épidermoïde in situ (pas de carcinome invasif identifié)",
  ],
  Glandulaire: [
    "Adénocarcinome, NOS",
    "Adénocarcinome de type digestif",
    "Adénocarcinome mucineux",
    "Adénocarcinome mixte",
    "Adénocarcinome à cellules indépendante",
    "Adénocarcinome in situ (pas de carcinome invasif identifié)",
  ],
  Mullérien: ["Adénocarcinome à cellules claires", "Carcinome endométrioïde"],
  Neuroendocrine: [
    "Carcinome neuroendocrine à petites cellules",
    "Carcinome neuroendocrine à grandes cellules",
    "Tumeur neuroendocrine bien différenciée",
  ],
  other: ["other"],
} as const;

type TumorCategory = keyof typeof TUMOR_TYPES_BY_CATEGORY;
export type TumorType = (typeof TUMOR_TYPES_BY_CATEGORY)[TumorCategory][number];

// CAUTION: this cast is type-unsafe
const TUMOR_CATEGORY_BY_TYPE = Object.fromEntries(
  Object.entries(TUMOR_TYPES_BY_CATEGORY)
    .map(([category, items]): [TumorType, TumorCategory][] =>
      items.map((item) => [
        // CAUTION: this cast is type-unsafe
        item,
        category as TumorCategory,
      ]),
    )
    .flat(),
) as Record<TumorType, TumorCategory>;
export const getTumorCategory = (type: TumorType): TumorCategory =>
  TUMOR_CATEGORY_BY_TYPE[type];

export const TUMOR_TYPE_GROUPS = Object.entries(TUMOR_TYPES_BY_CATEGORY).map(
  ([category, items]): OptionOrGroup<TumorType> => {
    const options: Option<TumorType>[] = items.map((value) =>
      value === "other" ? OTHER_ITEM : { value, label: value },
    );

    if (items.length === 1) {
      return options[0];
    }

    return {
      // CAUTION: this cast is type-unsafe
      title: category as TumorCategory,
      options,
    };
  },
);

const TUMOR_TYPE_OPTIONS = Object.values(TUMOR_TYPES_BY_CATEGORY)
  .flat()
  .map(toOption);
export const getTumorTypeOption = findOption(TUMOR_TYPE_OPTIONS);

export type Tumor = {
  type: TumorType;
  typeOther: string;
  carcinomaComposition: CarcinomaComposition;
  grade: string;
  extension: Ptnm;
};
export const DEFAULT_TUMOR: Tumor = {
  type: "Carcinome urothélial papillaire, non invasif",
  typeOther: "",
  carcinomaComposition: { Conventionnel: 100 },
  grade: "",
  extension: "pT1",
};

/** Tumor grade */

const GRADE_OPTIONS = [
  { value: "high-grade", label: "Haut grade" },
  { value: "low-grade", label: "Bas grade" },
  { value: "g1", label: "G1 (bien différencié)" },
  { value: "g2", label: "G2 (modérément différencié)" },
  { value: "g3", label: "G3 (peu différencié)" },
  { value: "TODO", label: "TODO" },
];
export const getGradeOption = findOption(GRADE_OPTIONS);
const GRADE_UROTHELIAL_CARCINOMA = ["high-grade", "low-grade"].map(
  getGradeOption,
);

// FIXME: update list
const MOCK_GRADE_OPTIONS = ["TODO"].map(toOption);

const GRADE_OPTIONS_G = ["g1", "g2", "g3"].map(getGradeOption);
const GRADE_OPTIONS_NEUROENDOCRINE = ["TODO"].map(getGradeOption);
const GRADE_OPTIONS_OTHER: Option<string>[] = [];
export const getGradeOptions = (type: TumorType): Option<string>[] => {
  switch (getTumorCategory(type)) {
    case "Carcinome urothélial papillaire, non invasif":
    case "Carcinome urothélial in situ":
    case "Carcinome urothélial invasif": {
      return GRADE_UROTHELIAL_CARCINOMA;
    }

    case "Papillome urothélial":
    case "Tumeur urothéliale papillaire vésicale de bas potentiel de malignit\u00E9":
    case "Papillome inversé urothélial": {
      return MOCK_GRADE_OPTIONS;
    }

    case "Malpighien":
    case "Glandulaire":
    case "Mullérien": {
      return GRADE_OPTIONS_G;
    }

    case "Neuroendocrine": {
      return GRADE_OPTIONS_NEUROENDOCRINE;
    }

    case "other":
      return GRADE_OPTIONS_OTHER;
  }
};

/** Tumoral extension */

// pTNM (with this case) classification describes tumoral extension
export const PTNM_OPTIONS = [
  {
    value: "pT1a",
    label: "pT1a",
    tooltip: "invasion du chorion sans dépassement de la musculaire muqueuse.",
  },
  {
    value: "pT1b",
    label: "pT1b",
    tooltip: "invasion du chorion avec dépassement de la musculaire muqueuse.",
  },
  {
    value: "pT1",
    label: "pT1",
    tooltip: "invasion du chorion sans autre précision.",
  },
  {
    value: "pT2",
    label: "pT2",
    tooltip: "invasion de la musculeuse.",
  },
  {
    value: "pT3a",
    label: "pT3a",
    tooltip:
      "invasion de l'urètre, les canaux ou des acini prostatiques sans invasion stromale.",
  },
  {
    value: "pT3b",
    label: "pT3b",
    tooltip: "invasion du tissu conjonctif sous-épithélial prostatique.",
  },
  {
    value: "pT4",
    label: "pT4",
    tooltip: "invasion du stroma prostatique.",
  },
] as const;
export type Ptnm = (typeof PTNM_OPTIONS)[number]["value"];
export const getPtnmOption = findOption(PTNM_OPTIONS);

export const hasTumoralExtension = (type: TumorType) =>
  type !== "Carcinome urothélial papillaire, non invasif" &&
  type !== "Carcinome urothélial in situ";
