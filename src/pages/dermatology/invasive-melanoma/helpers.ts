import {
  AntibodyGroup,
  PropertiesByAntibody,
} from "../../../common/immunohistochemistry/helpers";
import { NO_ITEM, Option, OTHER_ITEM, UNSPECIFIED_ITEM } from "../../../ui";

// FIXME: add translations

export const LATERALITY_OPTIONS = [
  { value: "left", label: "Gauche" },
  { value: "midline", label: "Médian" },
  { value: "right", label: "Droite" },
  UNSPECIFIED_ITEM,
] as const;
export type Laterality = (typeof LATERALITY_OPTIONS)[number]["value"];

export const SAMPLING_TYPE_OPTIONS = [
  { value: "exeresis", label: "Exérèse" },
  { value: "shaving", label: "Shaving" },
  { value: "biopsy", label: "Biopsie" },
  OTHER_ITEM,
] as const;
export type SamplingType = (typeof SAMPLING_TYPE_OPTIONS)[number]["value"];

// FIXME: consider how to rename
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
  { value: "label", label: "label" },
  { value: "Épingle", label: "Épingle" },
  { value: "Liège", label: "Liège" },
] as const;
export type OrientationMethod =
  (typeof ORIENTATION_METHOD_OPTIONS)[number]["value"];

export const ORIENTATION_OPTIONS = [
  { value: "à 3H", label: "à 3H" },
  { value: "à 6H", label: "à 6H" },
  { value: "à 9H", label: "à 9H" },
  { value: "à 12H", label: "à 12H" },
  { value: "au pôle supérieur", label: "au pôle supérieur" },
  { value: "au pôle inférieur ", label: "au pôle inférieur " },
  { value: "au pôle médian ", label: "au pôle médian " },
  { value: "au pôle latéral ", label: "au pôle latéral " },
  { value: "au pôle antérieur ", label: "au pôle antérieur " },
  { value: "au pôle postérieur", label: "au pôle postérieur" },
  OTHER_ITEM,
] as const;
export type Orientation = (typeof ORIENTATION_OPTIONS)[number]["value"];

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

export const SUBTYPE_OPTIONS = [
  {
    value: "Mélanome à extension superficielle (SSM)",
    label: "Mélanome à extension superficielle (SSM)",
  },
  { value: "Mélanome de Dubreuilh (LM)", label: "Mélanome de Dubreuilh (LM)" },
  { value: "Mélanome desmoplastique", label: "Mélanome desmoplastique" },
  {
    value: "Tumeur maligne de Spitz (mélanome de Spitz)",
    label: "Tumeur maligne de Spitz (mélanome de Spitz)",
  },
  { value: "Mélanome acro-lentigineux", label: "Mélanome acro-lentigineux" },
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
  { value: "Mélanome nodulaire", label: "Mélanome nodulaire" },
  { value: "Mélanome naevoïde", label: "Mélanome naevoïde" },
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
  UNSPECIFIED_ITEM,
] as const;
export type GrowthPhase = (typeof GROWTH_PHASE_OPTIONS)[number]["value"];

// FIXME: align with DermatologyForm
export type ClarkInfiltrationLevel = 1 | 2 | 3 | 4 | 5;
export const CLARK_INFILTRATION_LEVELS: Option<ClarkInfiltrationLevel>[] = [
  { value: 1, label: "I (épiderme)" },
  { value: 2, label: "II (derme papillaire)" },
  { value: 3, label: "III (réticulaire)" },
  { value: 4, label: "IV (profond)" },
  { value: 5, label: "V (hypoderme)" },
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

export const MARGIN_STATE_OPTIONS = [
  { value: "Saines", label: "Saines" },
  { value: "Atteintes", label: "Atteintes" },
  UNSPECIFIED_ITEM,
] as const;
export type MarginState = (typeof MARGIN_STATE_OPTIONS)[number]["value"];

export type MelanocyticLesion =
  (typeof MELANOCYTIC_LESION_GROUPS)[number]["options"][number]["value"];

// TODO clean: convert to option list once SelectList accepts both options and groups
export const MELANOCYTIC_LESION_GROUPS = [
  {
    title: "",
    options: [
      {
        value: "Naevus jonctionnel composé ou dermique",
        label: "Naevus jonctionnel composé ou dermique",
      },
      {
        value: "Mélanocytome activé de la voie WNT (naevus)",
        label: "Mélanocytome activé de la voie WNT (naevus)",
      },
      {
        value: "Mélanocytome épithélioïde pigmenté",
        label: "Mélanocytome épithélioïde pigmenté",
      },
      {
        value: "Mélanocytome inactivé par BAP1",
        label: "Mélanocytome inactivé par BAP1",
      },
      {
        value: "Tumeurs mélanocytaires activées par la voie MITF",
        label: "Tumeurs mélanocytaires activées par la voie MITF",
      },
      { value: "Naevus de Spitz", label: "Naevus de Spitz" },
      {
        value: "Naevus pigmenté à cellules fusiformes (naevus de Reed)",
        label: "Naevus pigmenté à cellules fusiformes (naevus de Reed)",
      },
      { value: "Naevus acral", label: "Naevus acral" },
      {
        value: "Naevus muqueux et génital",
        label: "Naevus muqueux et génital",
      },
      { value: "Naevus bleu", label: "Naevus bleu" },
      { value: "Naevus congénital", label: "Naevus congénital" },
    ],
  },
];

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
  { value: "simple-complete", label: "Exérèse simple complète" },
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

export const EXERESIS_POSITION_OPTIONS = [
  { value: "à 12H", label: "à 12H" },
  { value: "à 1H", label: "à 1H" },
  { value: "à 2H", label: "à 2H" },
  { value: "à 3H", label: "à 3H" },
  { value: "à 4H", label: "à 4H" },
  { value: "à 5H", label: "à 5H" },
  { value: "à 6H", label: "à 6H" },
  { value: "à 7h", label: "à 7h" },
  { value: "à 8H", label: "à 8H" },
  { value: "à 9H", label: "à 9H" },
  { value: "à 10H", label: "à 10H" },
  { value: "à 11H", label: "à 11H" },
  { value: "au pôle supérieur", label: "au pôle supérieur" },
  { value: "au pôle inférieur", label: "au pôle inférieur" },
  { value: "au pôle médian", label: "au pôle médian" },
  { value: "au pôle latéral", label: "au pôle latéral" },
  { value: "au pôle antérieur", label: "au pôle antérieur" },
  { value: "au pôle postérieur", label: "au pôle postérieur" },
] as const;
export type ExeresisPosition =
  (typeof EXERESIS_POSITION_OPTIONS)[number]["value"];

export const MOLECULAR_BIOLOGY_OPTIONS = [
  {
    value: "New generation sequencing demandé",
    label: "New generation sequencing demandé",
  },
  { value: "Idylla demandé", label: "Idylla demandé" },
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
