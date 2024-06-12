import { Option } from "../../ui/helpers/options";

// TODO with Louis: translate
export type BiopsyType = "punch" | "fuseau";
export const BIOPSY_TYPES: Option<BiopsyType>[] = [
  { value: "punch", label: "Punch" },
  { value: "fuseau", label: "Fuseau" },
] as const;

// TODO with Louis: translate
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

// TODO with Louis: translate
export type InclusionType = "full" | "partial" | "none";
export const INCLUSION_TYPES: Option<InclusionType>[] = [
  { value: "full", label: "Oui" },
  { value: "partial", label: "Oui (sauf les pointes)" },
  { value: "none", label: "Non" },
];

// TODO with Louis: translate
export type CutType = "transverse" | "longitudinal" | "cross";
export const getCutTypes = (isOriented: boolean): Option<CutType>[] => [
  { value: "transverse", label: "Coupe transversale" },
  ...(isOriented
    ? [{ value: "longitudinal" as const, label: "Coupe longitudinale" }]
    : []),
  { value: "cross", label: "Coupe en croix" },
];

// TODO with Louis: translate
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

// TODO with Louis: translate
export type LesionType = "tumor" | "inflammation" | "foreign-body";
export const LESION_TYPES: Option<LesionType>[] = [
  { value: "tumor", label: "Tumoral" },
  { value: "inflammation", label: "Inflammatoire" },
  { value: "foreign-body", label: "Corps étranger" },
];

// TODO with Louis: translate
// TODO: replace with clean values when english translation is available
const TUMOR_TYPES = [
  "Angioléiomyome",
  "Botriomycome",
  "Carcinome basocellulaire superficiel",
  "Carcinome basocellulaire nodulaire",
  "Carcinome basocellulaire infiltrant",
  "Carcinome basocellulaire sclérodermiforme",
  "Carcinome épidermoïde",
  "Carcinome sébacé",
  "Kératose pré-carcinomateuse classique",
  "Kératose pré-carcinomateuse bourgeonnante",
  "Kératose pré-carcinomateuse hyperplasique",
  "Kératose pré-carcinomateuse lichénoïde",
  "Kératose séborrhéique classique",
  "Kératose séborrhéique irritée",
  "Kératose séborrhéique pigmentée",
  "Kératose séborrhéique clonale",
  "Kératose séborrhéique pédiculée",
  "Kyste épidermique",
  "Kyste épidermique inflammatoire",
  "Kyste épidermique suppuré",
  "Kyste épidermique complètement détruit",
  "Léiomyome pilaire",
  "Naevus dermique",
  "Naevus jonctionnel",
  "Naevus composé",
  "Naevus congénital",
] as const;
export type TumorType = (typeof TUMOR_TYPES)[number];
export const TUMOR_PROPERTIES: Record<
  TumorType,
  {
    description: string;
    hasSelectLymphaticOrVascularInvasion?: true;
    hasSelectPerineuralInvasion?: true;
    hasSelectClarkInfiltrationLevel?: true;
  }
> = {
  Angioléiomyome: {
    description:
      "On observe une formation nodulaire grossièrement arrondie et bien délimitée. Il s'agit d'une prolifération de cellules fusiformes agencées en faisceaux entrecroisés. Ces cellules ont un cytoplasme éosinophile mal délimité et un noyau allongé. Entre ces faisceaux, s'organisent des vaisseaux de taille variée, dont l'endothélium est aplati ou turgescent sans atypie ni mitose.",
  },
  Botriomycome: {
    description:
      "A l'examen histologique, il s'agit d'une lésion vasculaire polypoïde, constituée de capillaires regroupés en lobules, disposés dans un tissu de granulation oedémateux et inflammatoire.",
  },
  "Carcinome basocellulaire superficiel": {
    description:
      "Le prélèvement est centré par une prolifération carcinomateuse basaloïde superficielle, appendue à l'épiderme, de disposition palissadique avec fente de rétraction en périphérie.",
  },
  "Carcinome basocellulaire nodulaire": {
    description:
      "Le prélèvement est centré par une prolifération carcinomateuse basaloïde, grossièrement nodulaire avec une organisation palissadique en périphérie qui est raccordée à l'épiderme. En périphérie, on observe quelques fentes de rétraction.",
  },
  "Carcinome basocellulaire infiltrant": {
    description:
      "On observe une prolifération tumorale basaloïde appendue à l'épiderme, faite d'amas tumoraux infiltrant le derme avec parfois un aspect mal délimité, avec une disposition palissadique en périphérie et des fentes de rétraction avec le derme adjacent.",
    hasSelectPerineuralInvasion: true,
    hasSelectClarkInfiltrationLevel: true,
  },
  "Carcinome basocellulaire sclérodermiforme": {
    description:
      "Le prélèvment est centré par une prolifération tumorale basaloïde appendue à l'épiderme constituée d'amas et de travées tumoraux infiltrant le derme, avec une disposition palissadique en périphérie. On observe des fines travées étirées sur le front d'invasion entourées par un stroma fibro-hyalin. Les cellules ont un cytoplasme peu abondant, et un noyau ovalaire basophile. ",
    hasSelectPerineuralInvasion: true,
    hasSelectClarkInfiltrationLevel: true,
  },
  "Carcinome épidermoïde": {
    description: `On observe une prolifération tumorale qui présente les caractéristiques suivantes :
- Type histologique : carcinome épidermoïde commun, bien différencié
- Épaisseur maximale de la tumeur : # mm (niveau # selon Clark)
- Embole vasculaire tumoral : # (oui/non)
- Envahissement nerveux : # (oui/non)
- Lésion(s) associée(s) : kératose pré-épithéliomateuse (liste ?)`,
  },
  "Carcinome sébacé": {
    description:
      "Le prélèvement est centré par une prolifération tumorale carcinomateuse de localisation dermique, faite de multiples massifs tumoraux présentant une architecture nodulaire associant des sébocytes immatures avec un certain degré d'atypies, prédominant en périphérie, à des sébocytes tumoraux plus matures au centre des amas. Les noyaux sont ovalaires et nucléolés. Quelques mitoses sont visibles. En périphérie de la prolifération, on observe une réaction inflammatoire à prédominance lymphocytaire et plasmocytaire.",
    hasSelectLymphaticOrVascularInvasion: true,
    hasSelectPerineuralInvasion: true,
    hasSelectClarkInfiltrationLevel: true,
  },
  "Kératose pré-carcinomateuse classique": {
    description:
      "L'épiderme est parakératosique, avec une couche basale remaniée, constituée de kératinocytes irrégulièrement agencés, avec des noyaux hyperchromatiques.Il n'y a pas de micro-invasion du derme papillaire.",
  },
  "Kératose pré-carcinomateuse bourgeonnante": {
    description:
      "Il existe une prolifération kératinocytaire atypique, intraépidermique, prédominant à la partie basale, recouverte d'une squame-croûte mêlant sérosités, parakératose assez abondante. La prolifération bourgeonne dans le derme et est associée à des images d'acantholyse mais sans réaliser de vraies images d'infiltration. On observe un infiltrat dense lymphocytaire et plasmocytaire en regard.",
  },
  "Kératose pré-carcinomateuse hyperplasique": {
    description:
      "Le prélèvement est centré par une prolifération kératinocytaire atypique épaississant l'épiderme avec des atypies et parfois quelques multinucléations ou noyau hyperchromatique surmonté par une parakératose. Les cellules sont parfois clarifiées. Il n'y a pas d'infiltration du derme.",
  },
  "Kératose pré-carcinomateuse lichénoïde": {
    description:
      "L'étude microscopique montre un épiderme discrètement acanthosique, recouvert par une couche cornée parakératosique. Cet épiderme contient des kératinocytes atypiques, tassés les uns contre les autres avec quelques mitoses. Ces modifications intéressent les couches inférieures de l'épiderme. Le derme sous-jacent est remanié par un infiltrat inflammatoire mononucléé lichénoïde en bande sous épidermique. ",
  },
  "Kératose séborrhéique classique": {
    description:
      "On observe une lésion épidermique hyperkératosique, faite d'une prolifération de cellules de petite taille régulières sans atypie, réalisant par place des enroulements et des kystes cornés. Le derme sous-jacent est remanié par un discret infiltrat inflammatoire mononucléé épars.",
  },
  "Kératose séborrhéique irritée": {
    description:
      "Le prélèvement est centré par une prolifération kératinocytaire basaloïde intraépidermique bien limitée avec des aspects d'enroulement sans kératinisation et une parakératose humide, abondante en surface.",
  },
  "Kératose séborrhéique pigmentée": {
    description:
      "On observe une lésion épidermique hyperkératosique, faite d'une prolifération de cellules de petite taille régulières sans atypie, réalisant par place des enroulements et des kystes cornés. Certains kératinocytes sont pigmentés. Le derme sous-jacent est remanié par un discret infiltrat inflammatoire mononucléé épars.",
  },
  "Kératose séborrhéique clonale": {
    description:
      "On observe une lésion intra-épidermique, faite d'une prolifération de cellules de petite taille régulières sans atypie, agencée en nids. Le derme sous-jacent est remanié par un discret infiltrat inflammatoire mononucléé épars.",
  },
  "Kératose séborrhéique pédiculée": {
    description:
      "Il s'agit d'une lésion polypoïde comportant une prolifération épidermique constituée de kératinocytes basaloïdes, sans atypies cytonucléaires, avec des pseudokystes cornés.",
  },
  "Kyste épidermique": {
    description:
      "Le prélèvement intéresse une lésion kystique bordée d'un revêtement malpighien sans atypie contenant une kératine lamellaire. Il n'y a pas d'inflammation ou de prolifération.",
  },
  "Kyste épidermique inflammatoire": {
    description:
      "Il s'agit d'une cavité kystique remplie de kératine lamellaire. La paroi de ce kyste est bordée par un épithélium malpighien pourvu d'une couche granuleuse. Le kyste est localement interrompu avec une réaction inflammatoire avec des cellules géantes résorbant des lamelles de kératine.",
  },
  "Kyste épidermique suppuré": {
    description:
      "En surface, l'épiderme est discrètement hyperplasique et régulier en regard d'une formation kystique bordée par un épithélium malpighien bien structuré avec une couche granuleuse élaborant une kératine de type lamellaire. Le revêtement est souvent détruit par un granulome inflammatoire polymorphe où prédominent les polynucléaires neutrophiles. Il s'y associe quelques macrophages, quelques cellules géantes et lymphocytes.",
  },
  "Kyste épidermique complètement détruit": {
    description:
      "Le derme est le siège d'importants remaniements inflammatoires, comportant des lymphocytes, des polynucléaires neutrophiles formant par place des foyers suppurées et des cellules géantes entourant et phagocytant des lamelles de kératine. Absence de structure kystique. ",
  },
  "Léiomyome pilaire": {
    description: `On observe une lésion nodulaire composée de nombreux faisceaux plexiformes, composés de cellules musculaires lisses enchevêtrées les uns aux autres sans atypie cytonucléaire ni mitose. Le stroma peu abondant est fibreux et vascularisé.
L'épiderme est normal.`,
  },
  "Naevus dermique": {
    description:
      "On observe une prolifération mélanocytaire symétrique de siège exclusivement dermique et bien limité, et constituée de mélanocytes non atypiques agencés en thèques ou en nappes selon un gradient de maturation.",
  },
  "Naevus jonctionnel": {
    description: `Le prélèvement est centré par une prolifération mélanocytaire jonctionnelle, mal limitée, constituée de nids ou de cellules isolées hyperpigmentés. Il n'y a pas de franche ascension pagétoïde, ni d'atypie cytonucléaire, ni de mitose visualisées.
Le derme renferme des mélanophages et un discret piqueté lymphocytaire péri-capillaire.`,
  },
  "Naevus composé": {
    description:
      "Le prélèvement est centré par une prolifération mélanocytaire jonctionnelle et dermique en petits nids, situés sur le côté ou l'extrémité de crêtes épidermiques associés à quelques mélanocytes lentigineux. Il existe une très discrète anisocaryose. On note une fibroplasie lamellaire soulignant les crêtes épidermiques.",
  },
  "Naevus congénital": {
    description: `On observe une prolifération mélanocytaire de siège dermique et jonctionnel, et symétrique et bien limité. La composante jonctionnelle est constituée de mélanocytes non atypiques agencés de manière lentigineuse au niveau des crêtes épidermiques. La composante dermique est composée de mélanocytes non atypiques agencés en nappes selon un gradient de maturation. Il existe des aspects un peu clonaux avec une alternance entre une morphologie un peu plus épithélioïde et une autre de plus petite taille naevique.
L'aspect morphologique est en faveur d'une origine congénitale.`,
  },
};
export const TUMOR_TYPE_OPTIONS = TUMOR_TYPES.map((value) => ({
  value,
  label: value,
}));

// TODO with Louis: translate
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
// TODO with Louis: translate
export type CutaneousDiseaseType = "psoriasis" | "eczema";
export const CUTANEOUS_DISEASE_TYPES: Option<CutaneousDiseaseType>[] = [
  { value: "psoriasis", label: "Psoriasis" },
  { value: "eczema", label: "Eczéma" },
];

// TODO with Louis: translate
export type ClarkInfiltrationLevel = 1 | 2 | 3 | 4 | 5;
export const CLARK_INFILTRATION_LEVELS: Option<ClarkInfiltrationLevel>[] = [
  { value: 1, label: "I (épiderme)" },
  { value: 2, label: "II (derme papillaire)" },
  { value: 3, label: "III (réticulaire)" },
  { value: 4, label: "IV (profond)" },
  { value: 5, label: "V (hypoderme)" },
];

// TODO with Louis: check wording
// TODO with Louis: translate
export type Limit =
  | "superior"
  | "inferior"
  | "median"
  | "lateral"
  | "anterior"
  | "posterior";
export const LIMIT_OPTIONS: Option<Limit>[] = [
  { value: "superior", label: "Supérieure" },
  { value: "inferior", label: "Inférieure" },
  { value: "median", label: "Médiane" },
  { value: "lateral", label: "Latérale" },
  { value: "anterior", label: "Antérieure" },
  { value: "posterior", label: "Postérieure" },
];

// Hour-like notation
export const ANGLE_OPTIONS = [
  { value: 1, label: "à 1h" },
  { value: 2, label: "à 2h" },
  { value: 3, label: "à 3h" },
  { value: 4, label: "à 4h" },
  { value: 5, label: "à 5h" },
  { value: 6, label: "à 6h" },
  { value: 7, label: "à 7h" },
  { value: 8, label: "à 8h" },
  { value: 9, label: "à 9h" },
  { value: 10, label: "à 10h" },
  { value: 11, label: "à 11h" },
  { value: 12, label: "à 12h" },
] as const;
export type Angle = (typeof ANGLE_OPTIONS)[number]["value"];
