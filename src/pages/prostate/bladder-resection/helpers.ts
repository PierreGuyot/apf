import {
  AntibodyGroup,
  PropertiesByAntibody,
} from "../../../common/immunohistochemistry/helpers";
import {
  findOption,
  Flatten,
  Option,
  OTHER_ITEM,
  toOption,
  UNSPECIFIED_ITEM,
  ValueOf,
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
  location: "Vessie",
  sublocation: "Trigone",
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
  "Radiothérapie",
  "Chimiothérapie",
  "Hormonothérapie",
] as const;
export type Treatment = (typeof TREATMENTS)[number];
export const TREATMENT_OPTIONS: Option<Treatment>[] = TREATMENTS.map(toOption);
export const getTreatmentOption = findOption(TREATMENT_OPTIONS);
export const TREATMENT_GROUPS = [
  {
    title: "", // TODO clean: fix API
    options: TREATMENT_OPTIONS,
  },
];

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

/** Other lesions */

export const OTHER_LESION_GROUPS = [
  {
    title: "Tumoral",
    options: [
      {
        value: "Carcinome urothélial in situ (focal)",
        label: "Carcinome urothélial in situ (focal)",
      },
      {
        value: "Carcinome urothélial in situ (multifocal)",
        label: "Carcinome urothélial in situ (multifocal)",
      },
      { value: "Papillome urothélial", label: "Papillome urothélial" },
      {
        value: "Papillome urothélial, type inversé",
        label: "Papillome urothélial, type inversé",
      },
      {
        value:
          "Néoplasme urothélial papillaire à faible potentiel de malignité",
        label:
          "Néoplasme urothélial papillaire à faible potentiel de malignité",
      },
      { value: "Dysplasie urothéliale", label: "Dysplasie urothéliale" },
    ],
  },
  {
    title: "Non-tumoral",
    options: [
      { value: "Inflammation", label: "Inflammation" },
      {
        value: "Dystrophie d'aspect régénératifs",
        label: "Dystrophie d'aspect régénératifs",
      },
      {
        value: "Altérations morphologiques liées à la thérapie",
        label: "Altérations morphologiques liées à la thérapie",
      },
      {
        value: "Artéfact de cautérisation",
        label: "Artéfact de cautérisation",
      },
      {
        value: "Cystite cystique et glandulaire",
        label: "Cystite cystique et glandulaire",
      },
      {
        value: "Métaplasie malpighienne kératinisante",
        label: "Métaplasie malpighienne kératinisante",
      },
      { value: "Métaplasie intestinale", label: "Métaplasie intestinale" },
      { value: "Bilharziose", label: "Bilharziose" },
    ],
  },
] as const;
export type OtherLesion =
  (typeof OTHER_LESION_GROUPS)[number]["options"][number]["value"];

/** Antibodies */

// FIXME: un-mock
export const BLADDER_RESECTION_ANTIBODY_GROUPS = [
  {
    title: "TODO",
    options: [{ value: "TODO" as const, label: "TODO" }],
  },
] satisfies AntibodyGroup[];
export const BLADDER_RESECTION_ANTIBODY_PROPERTIES: PropertiesByAntibody = {
  TODO: {},
};

/** Urothelial invasive carcinoma */

export const CARCINOMA_SUBTYPES = [
  { value: "Conventionnel", label: "Conventionnel" },
  { value: "Micropapillaire", label: "Micropapillaire" },
  { value: "En nid", label: "En nid" },
  { value: "Tubulaire et microkystique", label: "Tubulaire et microkystique" },
  { value: "De type lymphoépithélial", label: "De type lymphoépithélial" },
  { value: "De type plasmacytoïde", label: "De type plasmacytoïde" },
  { value: "Sarcomatoïde", label: "Sarcomatoïde" },
  { value: "À cellules géantes", label: "À cellules géantes" },
  { value: "Peu différencié", label: "Peu différencié" },
  { value: "Riche en lipides", label: "Riche en lipides" },
  {
    value: "À cellules claires (riche en glycogène)",
    label: "À cellules claires (riche en glycogène)",
  },
  {
    value: "À différenciation malpighienne",
    label: "À différenciation malpighienne",
  },
  {
    value: "À différenciation glandulaire",
    label: "À différenciation glandulaire",
  },
  {
    value: "Avec différenciation trophoblastique à différenciation müllérienne",
    label: "Avec différenciation trophoblastique à différenciation müllérienne",
  },
] as const;
type CarcinomaSubtype = (typeof CARCINOMA_SUBTYPES)[number]["value"];
export type CarcinomaSubtypes = Partial<Record<CarcinomaSubtype, number>>;
