import { Option } from "../../ui/helpers/options";

// TODO with Louis: un-mock
// TODO with louis: translate
export type Antibody = "P504S" | "P63" | "BCC";
export type AntibodyTarget = "cible_1" | "cible_2";
export type AntibodyClone = "P504S" | "BCC" | "ventana-0123" | "clone_1";

export type AntibodyData = {
  type: Antibody;
  clone: AntibodyClone;
  blocks: Block[];
};

type Conclusions = Record<Result, string>;
const MOCK_CONCLUSIONS = (
  antibody: Antibody,
  target: AntibodyTarget,
): Conclusions => ({
  positive: `conclusion_positive_${antibody}_${target}`,
  negative: `conclusion_negative_${antibody}_${target}`,
});

// TODO: clean data structure for better search (compute options afterwards from this)
type Targets = Array<Option<AntibodyTarget> & { conclusions: Conclusions }>;

export const ANTIBODIES_PROPERTIES: Record<
  Antibody,
  {
    clones: Option<AntibodyClone>[];
    targets: Targets;
  }
> = {
  P504S: {
    clones: [
      { value: "P504S", label: "P504S" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("P504S", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("P504S", "cible_2"),
      },
    ],
  },
  P63: {
    clones: [
      { value: "ventana-0123", label: "P63 (clone Ventana 0123)" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("P63", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("P63", "cible_2"),
      },
    ],
  },
  BCC: {
    clones: [
      { value: "BCC", label: "BCC" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("BCC", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("BCC", "cible_2"),
      },
    ],
  },
};

export type Result = "positive" | "negative";
export const RESULT_OPTIONS: Option<Result>[] = [
  { value: "positive", label: "Positif" },
  { value: "negative", label: "Négatif" },
];

export type Block = {
  index: number;
  target: AntibodyTarget;
  result: Result;
};
