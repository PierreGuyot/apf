import { Option } from "../../ui/helpers/options";

// TODO: translate
export type BiopsyType = "punch" | "fuseau";
export const BIOPSY_TYPES: Option<BiopsyType>[] = [
  { value: "punch", label: "Punch" },
  { value: "fuseau", label: "Fuseau" },
] as const;

// TODO: translate
export type LesionAspectType =
  | "Nodulaire"
  | "Plane"
  | "Pigmentée"
  | "Ulcérée"
  | "En relief"
  | "Kératosique"
  | "Mal limitée";
export const LESION_ASPECT_TYPES: Option<LesionAspectType>[] = [
  { value: "Nodulaire", label: "Nodulaire" },
  { value: "Plane", label: "Plane" },
  { value: "Pigmentée", label: "Pigmentée" },
  { value: "Ulcérée", label: "Ulcérée" },
  { value: "En relief", label: "En relief" },
  { value: "Kératosique", label: "Kératosique" },
  { value: "Mal limitée", label: "Mal limitée" },
];

export type InclusionType = "full" | "partial" | "none";
export const INCLUSION_TYPES: Option<InclusionType>[] = [
  { value: "full", label: "Oui" },
  { value: "partial", label: "Oui (sauf les pointes)" },
  { value: "none", label: "Non" },
];

export type CutType = "transverse" | "longitudinal" | "cross";
export const getCutTypes = (isOriented: boolean): Option<CutType>[] => [
  { value: "transverse", label: "Coupe transversale" },
  ...(isOriented
    ? [{ value: "longitudinal" as const, label: "Coupe longitudinale" }]
    : []),
  { value: "cross", label: "Coupe en croix" },
];

export type OrientationType =
  | "thread-one"
  | "thread-long-short"
  | "thread-short-short"
  | "thread-long-long"
  | "staple"
  | "notch-one"
  | "notch-two";
export const ORIENTATION_TYPES: Option<OrientationType>[] = [
  { value: "thread-one", label: "Un fil" },
  { value: "thread-long-short", label: "Un fil long et un fil court" },
  { value: "thread-short-short", label: "Deux fils courts" },
  { value: "thread-long-long", label: "Deux fils longs" },
  { value: "staple", label: "Une agrafe" },
  { value: "notch-one", label: "Une encoche" },
  { value: "notch-two", label: "Deux encoches" },
];

export type LesionType = "tumor" | "inflammation" | "foreign-body";
export const LESION_TYPES: Option<LesionType>[] = [
  { value: "tumor", label: "Tumoral" },
  { value: "inflammation", label: "Inflammatoire" },
  { value: "foreign-body", label: "Corps étranger" },
];

// TODO: complete list
export type TumorType =
  | "basal-cell-carcinoma-superficial"
  | "basal-cell-carcinoma-nodular";
export const TUMOR_TYPES: Option<TumorType>[] = [
  {
    value: "basal-cell-carcinoma-superficial",
    label: "Carninome basocellulaire superficiel",
  },
  {
    value: "basal-cell-carcinoma-nodular",
    label: "Carninome basocellulaire nodulaire",
  },
];

export type ExcisionType =
  | "complete"
  | "complete-with-margins"
  | "incomplete-with-margins";
export const EXCISION_TYPES: Option<ExcisionType>[] = [
  { value: "complete", label: "Exérèse complète" },
  { value: "complete-with-margins", label: "Exérèse complète avec marges" },
  { value: "incomplete-with-margins", label: "Exérèse incomplète avec marges" },
];

// TODO: complete list
export type CutaneousDiseaseType = "psoriasis" | "eczema";
export const CUTANEOUS_DISEASE_TYPES: Option<CutaneousDiseaseType>[] = [
  { value: "psoriasis", label: "Psoriasis" },
  { value: "eczema", label: "Eczéma" },
];
