import {
  Option,
  OptionOrGroup,
  OTHER_ITEM,
  SPECIFIED_ITEM,
  toOption,
  UNSPECIFIED_ITEM,
} from "../../../ui";

export const IS_SPECIFIED_OPTIONS = [UNSPECIFIED_ITEM, SPECIFIED_ITEM];

const INTENTS = [
  "Excisional/complete diagnostic biopsy",
  "Incisional/incomplete (partial) diagnostic biopsy",
  "Wide excision",
] as const;
export const INTENT_OPTIONS = [UNSPECIFIED_ITEM, ...INTENTS.map(toOption)];
export type Intent = (typeof INTENT_OPTIONS)[number]["value"];

export const LATERALITY_OPTIONS = [
  UNSPECIFIED_ITEM,
  { value: "left", label: "Left" },
  { value: "midline", label: "Midline" },
  { value: "right", label: "Right" },
] as const;
export type Laterality = (typeof LATERALITY_OPTIONS)[number]["value"];

const TECHNIQUES = [
  "Punch technique",
  "Shave technique (superficial)",
  "Saucerization/scoop/deep shave technique",
  "Curette",
  "Fusiform/elliptical/disc (full-thickness)",
] as const;
export const TECHNIQUE_OPTIONS = [
  UNSPECIFIED_ITEM,
  ...TECHNIQUES.map(toOption),
  OTHER_ITEM,
];
export type TechniqueOption = (typeof TECHNIQUE_OPTIONS)[number]["value"];

export const LYMPH_NODE_OPTIONS = [
  { value: "not-submitted", label: "Not submitted" },
  { value: "submitted", label: "Submitted" },
] as const;
export type LymphNodeOption = (typeof LYMPH_NODE_OPTIONS)[number]["value"];

export const ORIENTATION_OPTIONS = [UNSPECIFIED_ITEM, SPECIFIED_ITEM] as const;
export type Orientation = (typeof ORIENTATION_OPTIONS)[number]["value"];

export const DIMENSIONS_OPTIONS = [
  UNSPECIFIED_ITEM,
  { value: "specified-with-depth", label: "Précisé (avec profondeur)" },
  { value: "specified-without-depth", label: "Précisé (sans profondeur)" },
] as const;
export type DimensionsType = (typeof DIMENSIONS_OPTIONS)[number]["value"];

export const PRESENCE_OPTIONS = [
  { value: "not-identified", label: "Non identifié" },
  { value: "present", label: "Présent" },
] as const;
export type Presence = (typeof PRESENCE_OPTIONS)[number]["value"];

export const BRESLOW_THICKNESS_OPTIONS = [
  UNSPECIFIED_ITEM,
  SPECIFIED_ITEM,
  { value: "minimum", label: "At least" },
] as const;
export type ThicknessOption =
  (typeof BRESLOW_THICKNESS_OPTIONS)[number]["value"];

const MARGINS = ["Cannot be assessed", "Not involved", "Involved"] as const;
export const MARGIN_OPTIONS = MARGINS.map(toOption);
export type Margin = (typeof MARGIN_OPTIONS)[number]["value"];

// FIXME: align with DermatologyForm
export type ClarkInfiltrationLevel = 1 | 2 | 3 | 4 | 5;
export const CLARK_INFILTRATION_LEVELS: Option<ClarkInfiltrationLevel>[] = [
  { value: 1, label: "I (épiderme)" },
  { value: 2, label: "II (derme papillaire)" },
  { value: 3, label: "III (réticulaire)" },
  { value: 4, label: "IV (profond)" },
  { value: 5, label: "V (hypoderme)" },
];

export const LYMPHOCITE_OPTIONS = [
  { value: "not-identified", label: "Not identified" },
  { value: "brisk", label: "Brisk" },
  { value: "non-brisk", label: "Non brisk" },
] as const;
export type LymphociteOption = (typeof LYMPHOCITE_OPTIONS)[number]["value"];

export const DESMOPLASTIC_MELANOMA_OPTIONS = [
  { value: "pure", label: "Pure (>90% desmoplastic melanoma)" },
  { value: "mixed", label: "Mixed" },
];
export type DesmoplasticMelanomaOption =
  (typeof DESMOPLASTIC_MELANOMA_OPTIONS)[number]["value"];

const METASTASIS_LOCATIONS = [
  "Subcapsular",
  "Intraparenchymal",
  "Both subcapsular and intraparenchymal",
] as const;
export const METASTASIS_LOCATION_OPTIONS = METASTASIS_LOCATIONS.map(toOption);
export type MetastasisLocation =
  (typeof METASTASIS_LOCATION_OPTIONS)[number]["value"];

const SURGICAL_MARGINS = [
  "Cannot be assessed",
  "Not involved by melanoma in situ or invasive melanoma",
  "Involved by melanoma in situ",
  "Involved by invasive melanoma",
] as const;
export const SURGICAL_MARGIN_OPTIONS = SURGICAL_MARGINS.map(toOption);
export type SurgicalMargin = (typeof SURGICAL_MARGIN_OPTIONS)[number]["value"];

export const DISTANCE_OPTIONS = [
  { value: "<= 1mm", label: "<= 1mm" },
  { value: "> 1mm", label: "> 1mm" },
];
export type DistanceOption = (typeof DISTANCE_OPTIONS)[number]["value"];

const SUBTYPES = [
  "Low-CSD melanoma (superficial spreading melanoma)",
  "Lentigo maligna melanoma (high-CSD melanoma)",
  "Desmoplastic melanoma",
  "Malignant Spitz tumor (Spitz melanoma)",
  "Acral melanoma",
  "Mucosal melanomas (genital, oral, sinonasal)",
  "Melanoma arising in blue naevus",
  "Melanoma arising in giant congenital naevus",
  "Nodular melanoma",
  "Naevoid melanoma",
  "Melanoma, not otherwise classified",
] as const;

export const SUBTYPE_OPTIONS = [...SUBTYPES.map(toOption), OTHER_ITEM];

export type Subtype = (typeof SUBTYPE_OPTIONS)[number]["value"];

export const TNM_DESCRIPTOR_OPTIONS = [
  { value: "m", label: "Multiple primary tumors" },
  { value: "r", label: "Recurrent" },
  { value: "y", label: "Post-therapy" },
  { value: "sn", label: "Sentinel node biopsy" },
] as const;
export type TnmDescriptor = (typeof TNM_DESCRIPTOR_OPTIONS)[number]["value"];

// FIXME: rework API as options = Array<Option | {title: string, options: Option[]}>
// FIXME: align with PTNM_OPTIONS (bladder-resection)
export const PT_GROUPS: OptionOrGroup<Pt>[] = [
  { value: "TX", label: "TX (primary tumor cannot be assessed)" },
  {
    value: "T0",
    label: "T0 (no evidence of primary tumor or regressed melanomas)",
  },
  { value: "Tis", label: "Tis (melanoma in situ, Clark level I)" },
  {
    title: "T1 (tumor 1mm or less in thickness)",
    options: [
      {
        value: "T1a",
        label: "T1a (less than 0.8mm in thickness without ulceration)",
      },
      {
        value: "T1b",
        label:
          "T1b (less than 0.8mm in thickness with ulceration or 0.8 mm or more but no more than 1mm in thickness, with or without ulceration)",
      },
    ],
  },
  {
    title: "T2 (tumor more than 1mm but not more than 2mm in thickness)",
    options: [
      { value: "T2a", label: "T2a (without ulceration)" },
      { value: "T2b", label: "T2b (with ulceration)" },
    ],
  },
  {
    title: "T3 (tumor more than 2mm but not more than 4mm in thickness)",
    options: [
      { value: "T3a", label: "T3a (without ulceration)" },
      { value: "T3b", label: "T3a (with ulceration)" },
    ],
  },
  {
    title: "T4 (tumor more than 4mm in thickness)",
    options: [
      { value: "T4a", label: "T4a (without ulceration)" },
      { value: "T4b", label: "T4a (with ulceration)" },
    ],
  },
];
export type Pt =
  | "TX"
  | "T0"
  | "Tis"
  | "T1a"
  | "T1b"
  | "T2a"
  | "T2b"
  | "T3a"
  | "T3b"
  | "T4a"
  | "T4b";

export const PN_GROUPS: OptionOrGroup<Pn>[] = [
  { value: "none", label: "No nodes submitted or found" },
  { value: "NX", label: "NX (regional nodes not assessed)" },
  { value: "N0", label: "N0 (no regional lymph node metastases)" },
  {
    title:
      "N1 (metastasis in one regional lymph node or intralymphatic regional metastasis without nodal metastases)",
    options: [
      {
        value: "N1a",
        label: "N1a (only microscopic metastasis, clinically occult)",
      },
      {
        value: "N1b",
        label: "N1b (macroscopic metastasis, clinically apparent)",
      },
      {
        value: "N1c",
        label:
          "N1c (satellite or in-transit metastasis without regional nodal metastasis)",
      },
    ],
  },
  {
    title:
      "N2 (metastasis in two or three regional lymph nodes or intralymphatic regional metastases)",
    options: [
      { value: "N2a", label: "N2a (only microscopic nodal metastasis)" },
      { value: "N2b", label: "N2b (macroscopic nodal metastasis)" },
      {
        value: "N2c",
        label:
          "N2c (satellite or in-transit metastasis with only one regional nodal metastasis)",
      },
    ],
  },
  {
    title:
      "N3 (metastasis in four or more regional lymph nodes, or matted metastatic regional lymph nodes, or satellite(s) or in-transit metastasis with metastasis in two or more regional lymph node(s))",
    options: [
      { value: "N3a", label: "N3a (only microscopic nodal metastasis)" },
      { value: "N3b", label: "N3b (macroscopic nodal metastasis)" },
      {
        value: "N3c",
        label:
          "N3c (satellite or in-transit metastasis with two or more regional nodal metastasis)",
      },
    ],
  },
];
export type Pn =
  | "none"
  | "NX"
  | "N0"
  | "N1a"
  | "N1b"
  | "N1c"
  | "N2a"
  | "N2b"
  | "N2c"
  | "N3a"
  | "N3b"
  | "N3c";
