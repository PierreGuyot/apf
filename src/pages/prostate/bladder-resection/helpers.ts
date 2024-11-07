import {
  findOption,
  Option,
  OTHER_ITEM,
  toOption,
  UNSPECIFIED_ITEM,
} from "../../../ui";

export type BladderResectionFormId = "bladder-transurethral-resection";

// TODO: add translations

// TODO CLEAN: extract type helpers
type ValueOf<T> = T[keyof T];
type Flatten<T> = {
  [K in keyof T]: T[K] extends readonly (infer Item)[] ? Item : never;
};

/** Tumor type */

const TUMOR_SUBTYPES = {
  "Carcinome urothélial papillaire, non invasif": [],
  "Carcinome urothélial in situ": [
    // FIXME: complete
    "TODO",
  ],
  "Carcinome urothélial invasif (conventionnel)": [
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
    "Carcinome urothélial à différenciation malpighienne ",
    "Carcinome urothélial à différenciation glandulaire",
    "Carcinome urothélial avec différenciation trophoblastique",
    "Carcinome urothélial à différenciation müllérienne ",
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
    "Adénocarcinome à cellules indépendante ",
    "Adénocarcinome in situ (pas de carcinome invasif identifié)",
  ],
  Mullérien: ["Adénocarcinome à cellules claires", "Carcinome endométrioïde"],
  Neuroendocrine: [
    "Carcinome neuroendocrine à petites cellules",
    "Carcinome neuroendocrine à grandes cellules",
    "Tumeur neuroendocrine bien différenciée",
  ],
} as const;
const TUMOR_SUBTYPE_OPTIONS = Object.fromEntries(
  Object.entries(TUMOR_SUBTYPES).map(([type, subtypes]) => [
    type,
    subtypes.map(toOption),
  ]),
) as Record<TumorType, Option<TumorSubtype>[]>;

export type TumorType = keyof typeof TUMOR_SUBTYPES | "other";
const TUMOR_TYPES = Object.keys(TUMOR_SUBTYPES) as TumorType[];
export const TUMOR_TYPE_OPTIONS: Option<TumorType>[] = [
  ...TUMOR_TYPES.map(toOption),
  OTHER_ITEM,
];
export const getTumorTypeOption = findOption(TUMOR_TYPE_OPTIONS);
type TumorSubtype = ValueOf<Flatten<typeof TUMOR_SUBTYPES>>;
export type Tumor = {
  type: TumorType;
  subtype: TumorSubtype;
  otherSubtype: string;
  grade: string;
  extension: TumoralExtension;
};
export const DEFAULT_TUMOR: Tumor = {
  type: "Carcinome urothélial papillaire, non invasif",
  subtype: "Carcinome urothélial conventionnel",
  otherSubtype: "",
  grade: "",
  extension: {},
};
export const getTumorSubtypeOptions = (
  type: TumorType,
): readonly Option<TumorSubtype>[] => {
  if (type === "other") {
    return [];
  }

  return TUMOR_SUBTYPE_OPTIONS[type];
};

/** Location */

const SUBLOCATIONS = {
  "Urètre masculin": [
    "Urètre pénien",
    "Urètre bulbomembraneux",
    "Urètre prostatique",
  ],
  "Urètre féminin": ["Urètre antérieur", "Urètre postérieur"],
  Vessie: [
    "Trigone",
    "Paroi latérale droite",
    "Paroi latérale gauche",
    "Paroi antérieure",
    "Paroi postérieure",
    "Dôme",
  ],
  Uretère: [
    "Droit (préciser tiers proximal, médian, distal)",
    "Gauche (préciser tiers proximal, médian, distal)",
  ],
  "Calice rénal": ["Droit", "Gauche"],
} as const;
const SUBLOCATION_OPTIONS = Object.fromEntries(
  Object.entries(SUBLOCATIONS).map(([type, subtypes]) => [
    type,
    subtypes.map(toOption),
  ]),
) as Record<Location, Option<Sublocation>[]>;
export type Location = keyof typeof SUBLOCATIONS | "unspecified";
const LOCATIONS = Object.keys(SUBLOCATIONS) as Location[];
export const LOCATION_OPTIONS: Option<Location>[] = [
  ...LOCATIONS.map(toOption),
  UNSPECIFIED_ITEM,
];
export const getLocationOption = findOption(LOCATION_OPTIONS);
type Sublocation = ValueOf<Flatten<typeof SUBLOCATIONS>>;
export type FullLocation = {
  location: Location;
  sublocation: Sublocation;
};
export const DEFAULT_FULL_LOCATION: FullLocation = {
  location: "Urètre masculin",
  sublocation: "Urètre pénien",
};
export const getSublocationOptions = (
  type: Location,
): readonly Option<Sublocation>[] => {
  if (type === "unspecified") {
    return [];
  }

  return SUBLOCATION_OPTIONS[type];
};

/** Treatment */

const TREATMENTS = [
  "Résection transurétrale de vessie",
  "BCG thérapie",
  // FIXME: complete list
] as const;
export type Treatment = (typeof TREATMENTS)[number];
export const TREATMENT_OPTIONS: Option<Treatment>[] = TREATMENTS.map(toOption);
export const getTreatmentOption = findOption(TREATMENT_OPTIONS);

/** Lesion aspect */

const LESION_ASPECTS = [
  "Polypoïde",
  "Papillaire",
  "Plage érythémateuse",
  "Normal",
] as const;
export type LesionAspect =
  | (typeof LESION_ASPECTS)[number]
  | "other"
  | "unspecified";
export const LESION_ASPECT_OPTIONS: Option<LesionAspect>[] = [
  ...LESION_ASPECTS.map(toOption),
  OTHER_ITEM,
  UNSPECIFIED_ITEM,
];
export const getLesionAspectOption = findOption(LESION_ASPECT_OPTIONS);

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
const GRADE_OPTIONS_G = ["g1", "g2", "g3"].map(getGradeOption);
const GRADE_OPTIONS_NEUROENDOCRINE = ["TODO"].map(getGradeOption);
const GRADE_OPTIONS_OTHER: Option<string>[] = [];
export const getGradeOptions = (tumorType: TumorType): Option<string>[] => {
  switch (tumorType) {
    case "Carcinome urothélial papillaire, non invasif":
    case "Carcinome urothélial in situ":
    case "Carcinome urothélial invasif (conventionnel)": {
      return GRADE_UROTHELIAL_CARCINOMA;
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
  {
    value: "other",
    label: "Impossible à déterminer",
    tooltip: "",
  },
] as const;
// TODO clean: resolve naming conflict between type and component
export type PtnmOptionType = (typeof PTNM_OPTIONS)[number]["value"];
export type PtnmOption = {
  value: PtnmOptionType;
  label: string;
  tooltip: string;
};
export type TumoralExtension = Partial<Record<PtnmOptionType, number>>;

export const getPtnmOption = findOption(PTNM_OPTIONS);

export const hasTumoralExtensionSection = (type: TumorType) =>
  type !== "Carcinome urothélial papillaire, non invasif" &&
  type !== "Carcinome urothélial in situ";

/** Other results */

export const TUMORAL_RESULT_GROUPS = [
  {
    title: "",
    options: [
      // FIXME: discuss this item
      "Carcinome urothélial in situ (préciser focal / multifocal)",
      "Papillome urothélial",
      "Papillome urothélial, type inversé",
      "Néoplasme urothélial papillaire à faible potentiel de malignité",
      "Dysplasie urothéliale",
    ].map(toOption),
  },
];

export const NON_TUMORAL_RESULT_GROUPS = [
  {
    title: "",
    options: [
      "Inflammation / changements régénératifs",
      "Changements liés à la thérapie",
      "Artéfact de cautérisation",
      "Cystite cystique et glandulaire",
      "Métaplasie malpighienne kératinisante",
      "Métaplasie intestinale",
      "Bilharziose",
    ].map(toOption),
  },
];
