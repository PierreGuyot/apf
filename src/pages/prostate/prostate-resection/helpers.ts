import { findOption, Option, OptionGroup } from "../../../ui";

export type ProstateResectionFormId =
  | "prostate-transurethral-resection"
  | "prostate-holmium-laser-enucleation";

export type MainLesionType =
  | "prostate-adenomyoma"
  | "prostate-adenomyoma-and-granulomatous-inflammation"
  | "prostate-adenomyoma-and-nonspecific-inflammation"
  | "tumor";
export const MAIN_LESION_TYPES: Option<MainLesionType>[] = [
  {
    value: "prostate-adenomyoma",
    label: "Adénomyome prostatique",
  },
  {
    value: "prostate-adenomyoma-and-granulomatous-inflammation",
    label: "Adénomyome prostatique et inflammation granulomateuse",
  },
  {
    value: "prostate-adenomyoma-and-nonspecific-inflammation",
    label: "Adénomyome prostatique et inflammation non-spécifique",
  },
  {
    value: "tumor",
    label: "Tumeur",
  },
];

export type PreviousTreatment =
  | "radiotherapy"
  | "hormonotherapy"
  | "chimiotherapy";
const PREVIOUS_TREATMENT_OPTIONS: Option<PreviousTreatment>[] = [
  { value: "radiotherapy", label: "Radiothérapie" },
  { value: "hormonotherapy", label: "Hormonothérapie" },
  { value: "chimiotherapy", label: "Chimiothérapie" },
] as const;
export const PREVIOUS_TREATMENT_GROUPS: OptionGroup<PreviousTreatment>[] = [
  {
    title: "", // TODO clean: fix API
    options: PREVIOUS_TREATMENT_OPTIONS,
  },
];

export const getPreviousTreatmentOption = findOption(
  PREVIOUS_TREATMENT_OPTIONS,
);

export const HISTOLOGICAL_APPLICABILITY_OPTIONS = [
  { value: "applicable", label: "Applicable" },
  {
    value: "non-applicable",
    label:
      "Non applicable (modifications histologiques majeures dues à un traitement antérieur)",
  },
] as const;
export type HistologicalApplicability =
  (typeof HISTOLOGICAL_APPLICABILITY_OPTIONS)[number]["value"];

export type TumorQuantification = "1%" | "2%" | "3%" | "4%" | "5%" | ">5%";
export const TUMOR_QUANTIFICATION_OPTIONS: Option<TumorQuantification>[] = [
  { value: "1%", label: "1%" },
  { value: "2%", label: "2%" },
  { value: "3%", label: "3%" },
  { value: "4%", label: "4%" },
  { value: "5%", label: "5%" },
  { value: ">5%", label: ">5%" },
];

export const getTumorQuantificationOption = findOption(
  TUMOR_QUANTIFICATION_OPTIONS,
);
