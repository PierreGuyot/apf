import {
  AntibodyGroup,
  PropertiesByAntibody,
} from "../../../common/immunohistochemistry/helpers";
import {
  findOption,
  NO_ITEM,
  Option,
  OTHER_ITEM,
  UNSPECIFIED_ITEM,
} from "../../../ui";

// FIXME: add translations

export const SAMPLING_TYPE_OPTIONS = [
  { value: "exeresis", label: "Exérèse" },
  { value: "shaving", label: "Shaving" },
  { value: "biopsy", label: "Biopsie" },
  OTHER_ITEM,
] as const;
export type SamplingType = (typeof SAMPLING_TYPE_OPTIONS)[number]["value"];

export const LYMPH_NODE_EXERESIS_OPTIONS = [
  { value: "Ganglion sentinelle", label: "Ganglion sentinelle" },
  { value: "Curage ganglionnaire", label: "Curage ganglionnaire" },
  NO_ITEM,
] as const;
export type LymphNodeExeresis =
  (typeof LYMPH_NODE_EXERESIS_OPTIONS)[number]["value"];

export const ORIENTATION_METHOD_OPTIONS = [
  { value: "Fil", label: "Fil" },
  { value: "Agrafe", label: "Agrafe" },
  { value: "Encoche", label: "Encoche" },
  { value: "Épingle", label: "Épingle" },
  { value: "Liège", label: "Liège" },
  OTHER_ITEM,
] as const;
export type OrientationMethod =
  (typeof ORIENTATION_METHOD_OPTIONS)[number]["value"];

export const DIMENSION_3D_OPTIONS = [
  UNSPECIFIED_ITEM,
  { value: "specified-with-depth", label: "Précisé (avec profondeur)" },
  { value: "specified-without-depth", label: "Précisé (sans profondeur)" },
] as const;
export type Dimension3d = (typeof DIMENSION_3D_OPTIONS)[number]["value"];

export const DIMENSION_2D_OPTIONS = [
  UNSPECIFIED_ITEM,
  { value: "specified-without-depth", label: "Précisé (sans profondeur)" },
] as const;
export type Dimension2d = (typeof DIMENSION_2D_OPTIONS)[number]["value"];

export const ASPECT_OPTIONS = [
  { value: "Pigmentée", label: "Pigmentée" },
  { value: "Plan", label: "Plan" },
  { value: "Nodulaire", label: "Nodulaire" },
  { value: "En relief", label: "En relief" },
  { value: "Achromique", label: "Achromique" },
  { value: "Ulcérée", label: "Ulcérée" },
  OTHER_ITEM,
  UNSPECIFIED_ITEM,
] as const;
export type Aspect = (typeof ASPECT_OPTIONS)[number]["value"];

export const INKING_COLORS_OPTIONS = [
  { value: "blue", label: "Bleu" },
  { value: "green", label: "Vert" },
  { value: "yellow", label: "Jaune" },
  { value: "red", label: "Rouge" },
  { value: "purple", label: "Violet" },
  { value: "black", label: "Noir" },
] as const;
type InkingColor = (typeof INKING_COLORS_OPTIONS)[number]["value"];
export const getInkingColorOption = findOption(INKING_COLORS_OPTIONS);
export type Inking = {
  hasInking: boolean;
  color: InkingColor;
  orientation: Orientation | "other";
  orientationOther: string;
};

export const BLOCK_SAMPLING_OPTIONS_SINGLE = [
  { value: "Après section en deux", label: "Après section en deux" },
  { value: "Tel quel", label: "Tel quel" },
] as const;
export const BLOCK_SAMPLING_OPTIONS_MULTIPLE = [
  { value: "En croix", label: "En croix" },
  { value: "En tranches transversales", label: "En tranches transversales" },
] as const;
export type BlockSampling =
  | (typeof BLOCK_SAMPLING_OPTIONS_SINGLE)[number]["value"]
  | (typeof BLOCK_SAMPLING_OPTIONS_MULTIPLE)[number]["value"];

export const SUBTYPE_OPTIONS = [
  {
    value: "Mélanome à extension superficielle (SSM)",
    label: "Mélanome à extension superficielle (SSM)",
  },
  {
    value: "Mélanome de Dubreuilh (LM)",
    label: "Mélanome de Dubreuilh (LM)",
  },
  {
    value: "Mélanome desmoplastique",
    label: "Mélanome desmoplastique",
  },
  {
    value: "Tumeur maligne de Spitz (mélanome de Spitz)",
    label: "Tumeur maligne de Spitz (mélanome de Spitz)",
  },
  {
    value: "Mélanome acro-lentigineux",
    label: "Mélanome acro-lentigineux",
  },
  {
    value: "Mélanomes des muqueuses (génital, buccal, nasosinusien)",
    label: "Mélanomes des muqueuses (génital, buccal, nasosinusien)",
  },
  {
    value: "Mélanome développé sur naevus bleu",
    label: "Mélanome développé sur naevus bleu",
  },
  {
    value: "Mélanome développé sur naevus congénital géant",
    label: "Mélanome développé sur naevus congénital géant",
  },
  {
    value: "Mélanome nodulaire",
    label: "Mélanome nodulaire",
  },
  {
    value: "Mélanome naevoïde",
    label: "Mélanome naevoïde",
  },
  {
    value: "Mélanome, sans autre spécificité",
    label: "Mélanome, sans autre spécificité",
  },
  OTHER_ITEM,
] as const;
export type Subtype = (typeof SUBTYPE_OPTIONS)[number]["value"];

export const GROWTH_PHASE_OPTIONS = [
  { value: "horizontal", label: "Horizontale" },
  { value: "vertical", label: "Verticale" },
] as const;
export type GrowthPhase = (typeof GROWTH_PHASE_OPTIONS)[number]["value"];

export type ClarkLevel = 1 | 2 | 3 | 4 | 5;
export const CLARK_LEVELS: Option<ClarkLevel>[] = [
  { value: 1, label: "Intra-épidermique/confiné à l'épiderme (niveau 1)" },
  { value: 2, label: "Infiltration débutante du derme papillaire (niveau 2)" },
  { value: 3, label: "Infiltration de tout le derme papillaire (niveau 3)" },
  { value: 4, label: "Infiltration du derme réticulaire (niveau 4)" },
  { value: 5, label: "Infiltration de l'hypoderme (niveau 5)" },
];

export const BRESLOW_THICKNESS_TYPE_OPTIONS = [
  { value: "precised", label: "Précisé" },
  { value: "at-least", label: "Au moins" },
] as const;

export type BreslowThicknessType =
  (typeof BRESLOW_THICKNESS_TYPE_OPTIONS)[number]["value"];

export const MORPHOLOGY_OPTIONS = [
  { value: "Épithélioïde", label: "Épithélioïde" },
  { value: "Fusiforme", label: "Fusiforme" },
  { value: "Ballonisante", label: "Ballonisante" },
  { value: "Naevocytoïde", label: "Naevocytoïde" },
] as const;
export type Morphology = (typeof MORPHOLOGY_OPTIONS)[number]["value"];

export const LYMPHOCYTE_OPTIONS = [
  { value: "none", label: "Absence d'infiltrat lymphocytaire" },
  { value: "non-brisk", label: "Infiltrat lymphocytaire de type non-Brisk" },
  { value: "brisk", label: "Infiltrat lymphocytaire de type Brisk" },
] as const;
export type LymphocyteOption = (typeof LYMPHOCYTE_OPTIONS)[number]["value"];

export const LYMPHOCYTE_INFILTRATION_SEVERITY_OPTIONS = [
  { value: "Léger", label: "Léger" },
  { value: "Modéré", label: "Modéré" },
  { value: "Intense", label: "Intense" },
] as const;
export type LymphocyteInfiltrationSeverity =
  (typeof LYMPHOCYTE_INFILTRATION_SEVERITY_OPTIONS)[number]["value"];

export const MARGIN_STATE_OPTIONS = [
  { value: "Saines", label: "Saines" },
  { value: "Atteintes", label: "Atteintes" },
  UNSPECIFIED_ITEM,
] as const;
export type MarginState = (typeof MARGIN_STATE_OPTIONS)[number]["value"];

export const MELANOCYTIC_LESION_GROUPS = [
  {
    title: "", // TODO clean: fix API
    options: [
      {
        value: "Naevus jonctionnel, composé ou dermique",
        label: "Naevus jonctionnel, composé ou dermique",
      },
      {
        value: "Mélanocytome avec activation de la voie WNT",
        label: "Mélanocytome avec activation de la voie WNT",
      },
      {
        value: "Mélanocytome épithélioïde pigmenté",
        label: "Mélanocytome épithélioïde pigmenté",
      },
      {
        value: "Mélanocytome avec inactivation de BAP1",
        label: "Mélanocytome avec inactivation de BAP1",
      },
      {
        value: "Tumeurs mélanocytaires activées par la voie MITF",
        label: "Tumeurs mélanocytaires activées par la voie MITF",
      },
      {
        value: "Naevus de Spitz",
        label: "Naevus de Spitz",
      },
      {
        value: "Naevus pigmenté à cellules fusiformes (naevus de Reed)",
        label: "Naevus pigmenté à cellules fusiformes (naevus de Reed)",
      },
      {
        value: "Naevus acral",
        label: "Naevus acral",
      },
      {
        value: "Naevus muqueux et génital",
        label: "Naevus muqueux et génital",
      },
      {
        value: "Naevus bleu",
        label: "Naevus bleu",
      },
      {
        value: "Naevus congénital",
        label: "Naevus congénital",
      },
    ],
  },
] as const;
export type MelanocyticLesion =
  (typeof MELANOCYTIC_LESION_GROUPS)[number]["options"][number]["value"];

const EXERIS_TYPE_OPTIONS_NOT_ASSESSABLE = [
  {
    value: "non-assessable-specimen",
    label: "Non-évaluable à cause de la nature du prélèvement",
  },
  {
    value: "non-assessable-specimen-inclusion",
    label: "Non-évaluable à cause de l'inclusion du prélèvement",
  },
] as const;

export const EXERIS_TYPE_OPTIONS_ORIENTED = [
  {
    value: "oriented-complete-with-margins",
    label: "Exérèse orientée complète avec marges",
  },
  {
    value: "oriented-incomplete-laterally",
    label: "Exérèse orientée  incomplète latéralement",
  },
  ...EXERIS_TYPE_OPTIONS_NOT_ASSESSABLE,
] as const;

export const EXERIS_TYPE_OPTIONS_NOT_ORIENTED = [
  {
    value: "simple-complete",
    label: "Exérèse simple complète",
  },
  {
    value: "simple-complete-with-margins",
    label: "Exérèse simple complète avec marges",
  },
  {
    value: "simple-incomplete-laterally",
    label: "Exérèse simple incomplète latéralement",
  },
  {
    value: "simple-incomplete-depth",
    label: "Exérèse simple incomplète en profondeur",
  },
  ...EXERIS_TYPE_OPTIONS_NOT_ASSESSABLE,
] as const;

export type ExeresisType =
  | (typeof EXERIS_TYPE_OPTIONS_ORIENTED)[number]["value"]
  | (typeof EXERIS_TYPE_OPTIONS_NOT_ORIENTED)[number]["value"];

// With only 3h multiples
export const ORIENTATION_OPTIONS = [
  { value: "à 3h", label: "à 3h" },
  { value: "à 6h", label: "à 6h" },
  { value: "à 9h", label: "à 9h" },
  { value: "à 12h", label: "à 12h" },
  { value: "au pôle supérieur", label: "au pôle supérieur" },
  { value: "au pôle inférieur", label: "au pôle inférieur" },
  { value: "au pôle médian", label: "au pôle médian" },
  { value: "au pôle latéral", label: "au pôle latéral" },
  { value: "au pôle antérieur", label: "au pôle antérieur" },
  { value: "au pôle postérieur", label: "au pôle postérieur" },
] as const;

// With only 3h multiples and option Other
export const ORIENTATION_OPTIONS_WITH_OTHER = [
  ...ORIENTATION_OPTIONS,
  OTHER_ITEM,
] as const;
export type Orientation = (typeof ORIENTATION_OPTIONS)[number]["value"];

// With all hour positions
export const ORIENTATION_OPTIONS_FULL = [
  ...ORIENTATION_OPTIONS,
  { value: "à 1h", label: "à 1h" },
  { value: "à 2h", label: "à 2h" },
  { value: "à 4h", label: "à 4h" },
  { value: "à 5h", label: "à 5h" },
  { value: "à 7h", label: "à 7h" },
  { value: "à 8h", label: "à 8h" },
  { value: "à 10h", label: "à 10h" },
  { value: "à 11h", label: "à 11h" },
] as const;
export type OrientationFull =
  (typeof ORIENTATION_OPTIONS_FULL)[number]["value"];

// Dumb but straightforward mapping
const OPPOSITE_ORIENTATION_MAPPING: Record<Orientation, Orientation> = {
  "à 3h": "à 9h",
  "à 6h": "à 12h",
  "à 9h": "à 3h",
  "à 12h": "à 6h",
  "au pôle supérieur": "au pôle inférieur",
  "au pôle inférieur": "au pôle supérieur",
  "au pôle médian": "au pôle médian",
  "au pôle latéral": "au pôle médian",
  "au pôle antérieur": "au pôle postérieur",
  "au pôle postérieur": "au pôle antérieur",
};
export const getOppositeDirection = (orientation: Orientation): Orientation =>
  OPPOSITE_ORIENTATION_MAPPING[orientation];

export const METASTASIS_LOCATION_OPTIONS = [
  { value: "Sous-capsulaire", label: "Sous-capsulaire" },
  { value: "Intraparenchymateux", label: "Intraparenchymateux" },
  {
    value: "Sous-capsulaire et intraparenchymateux",
    label: "Sous-capsulaire et intraparenchymateux",
  },
];
export type MetastasisLocation =
  (typeof METASTASIS_LOCATION_OPTIONS)[number]["value"];

export const MOLECULAR_BIOLOGY_OPTIONS = [
  { value: "New Generation Sequencing", label: "New Generation Sequencing" },
  { value: "Idylla", label: "Idylla" },
] as const;
export type MolecularBiology =
  (typeof MOLECULAR_BIOLOGY_OPTIONS)[number]["value"];

export const INVASIVE_MELANOMA_ANTIBODY_GROUPS = [
  {
    title: "Anticorps de la différenciation mélanocytaire",
    options: [
      { value: "SOX10" as const, label: "SOX10" },
      { value: "Melan A" as const, label: "Melan A" },
    ],
  },
  {
    title: "Anticorps de la famille des cellules dérivées des crêtes neurales",
    options: [
      { value: "PS100" as const, label: "PS100" },
      { value: "HMB45" as const, label: "HMB45" },
    ],
  },
  {
    title: "Anticorps diagnostiques",
    options: [
      { value: "PRAME" as const, label: "PRAME" },
      { value: "P16" as const, label: "P16" },
      { value: "Ki67" as const, label: "Ki67" },
    ],
  },
  {
    title: "Anticorps théranostiques",
    options: [{ value: "BRAF" as const, label: "BRAF" }],
  },
] satisfies AntibodyGroup[];

export const INVASIVE_MELANOMA_ANTIBODY_PROPERTIES: PropertiesByAntibody = {
  SOX10: {},
  "Melan A": {},
  PS100: {},
  HMB45: {},
  PRAME: {},
  P16: {},
  Ki67: {},
  BRAF: {},
};
