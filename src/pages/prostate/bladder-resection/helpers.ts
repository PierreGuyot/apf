import {
  findOption,
  Option,
  OTHER_ITEM,
  toOption,
  UNSPECIFIED_ITEM,
  ValueOf,
  Flatten,
} from "../../../ui";

export type BladderResectionFormId = "bladder-transurethral-resection";

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

/** Other results */

export const TUMORAL_RESULT_GROUPS = [
  {
    title: "", // TODO clean: fix API
    options: [
      "Carcinome urothélial in situ (focal)",
      "Carcinome urothélial in situ (multifocal)",
      "Papillome urothélial",
      "Papillome urothélial, type inversé",
      "Néoplasme urothélial papillaire à faible potentiel de malignité",
      "Dysplasie urothéliale",
    ].map(toOption),
  },
];

export const NON_TUMORAL_RESULT_GROUPS = [
  {
    title: "", // TODO clean: fix API
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
