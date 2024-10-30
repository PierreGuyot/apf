import { Option, toOption } from "../../../ui";

export type BladderResectionFormId = "bladder-transurethral-resection";

// TODO: add translations

const OTHER_ITEM = {
  value: "other",
  label: "Autre (précisez)",
} as const;
const UNSPECIFIED_ITEM = {
  value: "unspecified",
  label: "Non-précisé",
} as const;

// TODO: rename and move to ui, on the model of YesOrNo (current naming is ugly but functional)
const TROOLEANS = ["yes", "no", "unspecified"] as const;
export type Troolean = (typeof TROOLEANS)[number];
export const TROOLEAN_OPTIONS: Option<Troolean>[] = [
  { value: "yes", label: "Oui" },
  { value: "no", label: "Non" },
  UNSPECIFIED_ITEM,
];

// TODO: handle subtypes
const TUMOR_TYPES = [
  "Carcinome urothélial papillaire, non invasif",
  "Carcinome urothélial in situ",
  "Carcinome urothélial invasif (conventionnel) ",
  "Malpighien",
  "Glandulaire",
  "Mullérien",
  "Neuroendocrine",
] as const;
export type TumorType = (typeof TUMOR_TYPES)[number] | "other";
export const TUMOR_TYPE_OPTIONS: Option<TumorType>[] = [
  ...TUMOR_TYPES.map(toOption),
  OTHER_ITEM,
];

// TODO: handle sub-locations
const LOCATIONS = ["Uretère", "Vessie", "Urètre", "Calice rénal"] as const;
export type Location = (typeof LOCATIONS)[number] | "unspecified";
export const LOCATION_OPTIONS: Option<Location>[] = [
  ...LOCATIONS.map(toOption),
  UNSPECIFIED_ITEM,
];
const TREATMENTS = [
  "Résection transurétrale de vessie",
  "BCG thérapie",
  // TODO: complete list
] as const;
export type Treatment = (typeof TREATMENTS)[number];
export const TREATMENT_OPTIONS: Option<Treatment>[] = TREATMENTS.map(toOption);

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

export const TUMORAL_RESULT_GROUPS = [
  {
    title: "",
    options: [
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

const GRADE_UROTHELIAL_CARCINOMA = [
  { value: "high-grade", label: "Haut grade" },
  { value: "low-grade", label: "Bas grade" },
];
const GRADE_OPTIONS_G = [
  { value: "g1", label: "G1 (bien différencié)" },
  { value: "g2", label: "G2 (modérément différencié)" },
  { value: "g3", label: "G3 (peu différencié)" },
];
const GRADE_OPTIONS_NEUROENDOCRINE = [{ value: "TODO", label: "TODO" }];
const GRADE_OPTIONS_OTHER: Option<string>[] = [];

export const getGradeOptions = (tumorType: TumorType): Option<string>[] => {
  switch (tumorType) {
    case "Carcinome urothélial papillaire, non invasif":
    case "Carcinome urothélial in situ":
    case "Carcinome urothélial invasif (conventionnel) ": {
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
