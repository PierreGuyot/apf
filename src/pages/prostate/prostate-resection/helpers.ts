import { findOption, Option } from "../../../ui";

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

export type PriorCondition =
  | "none"
  | "non-applicable-radiotherapy"
  | "non-applicable-hormonotherapy-chimiotherapy"
  | "applicable-radiotherapy"
  | "hormonotherapy-chimiotherapy";
export const PRIOR_CONDITION_OPTIONS: Option<PriorCondition>[] = [
  {
    value: "none",
    label: "Absence de traitement antérieur",
  },
  {
    value: "non-applicable-radiotherapy",
    label:
      "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (radiothérapie)",
  },
  {
    value: "non-applicable-hormonotherapy-chimiotherapy",
    label:
      "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (hormonothérapie ou chimiothérapie)",
  },
  {
    value: "applicable-radiotherapy",
    label:
      "Applicable en raison de modifications histologiques mineures liées à un traitement antérieur (radiothérapie)",
  },
  {
    value: "hormonotherapy-chimiotherapy",
    label:
      "Applicable en raison de modifications histologiques mineures liées à un traitement antérieur (hormonothérapie ou chimiothérapie)",
  },
];

export const getPriorConditionOption = findOption(PRIOR_CONDITION_OPTIONS);

export const isApplicable = (value: PriorCondition) =>
  value !== "non-applicable-radiotherapy" &&
  value !== "non-applicable-hormonotherapy-chimiotherapy";

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
