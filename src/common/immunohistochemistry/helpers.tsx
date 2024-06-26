import { Option, OptionGroup } from "../../ui/helpers/options";

export type IhcState = {
  hasIhc: boolean;
  antibodies: AntibodyData[];
};

// FIXME: translate
export type Antibody =
  // Composed
  | "P504S/P63"
  // Base cells
  | "P63"
  | "BCC"
  | "CK5/6"
  | "CK903"
  | "CK14/CK15"
  // Prostate neoplasia cells
  | "P504S"
  // Prostatic
  | "PSA"
  | "PSAP"
  | "NKX3.1"
  | "RA"
  // Vesicular
  | "CK7"
  | "CK20"
  | "GATA3"
  // Prognostic
  | "ERG";

// FIXME: un-mock
export type AntibodyClone = "clone_1" | "clone_2";

export type OtherAntibody = {
  type: "other";
  name: string;
  clone: string;
  conclusion: string;
  blocks: Block[];
};

export type AntibodyData =
  | {
      type: Antibody;
      clone: AntibodyClone;
      blocks: Block[];
    }
  | OtherAntibody;

// FIXME: un-mock
const MOCK_CLONES: Option<AntibodyClone>[] = [
  { value: "clone_1", label: "Clone 1" },
  { value: "clone_2", label: "Clone 2" },
];

export const ANTIBODIES_PROPERTIES: Record<
  Antibody,
  {
    label: string;
    clones: Option<AntibodyClone>[];
  }
> = {
  "P504S/P63": { label: "P504S/P63", clones: MOCK_CLONES },
  P63: { label: "P63", clones: MOCK_CLONES },
  BCC: { label: "BCC", clones: MOCK_CLONES },
  "CK5/6": { label: "CK5/6", clones: MOCK_CLONES },
  CK903: { label: "CK903", clones: MOCK_CLONES },
  "CK14/CK15": { label: "CK14/CK15", clones: MOCK_CLONES },
  P504S: { label: "P504S", clones: MOCK_CLONES },
  PSA: { label: "PSA", clones: MOCK_CLONES },
  PSAP: { label: "PSAP", clones: MOCK_CLONES },
  "NKX3.1": { label: "NKX3.1", clones: MOCK_CLONES },
  RA: { label: "RA", clones: MOCK_CLONES },
  CK7: { label: "CK7", clones: MOCK_CLONES },
  CK20: { label: "CK20", clones: MOCK_CLONES },
  GATA3: { label: "GATA3", clones: MOCK_CLONES },
  ERG: { label: "ERG", clones: MOCK_CLONES },
};

export const getAntibodyLabel = (type: Antibody | "other") => {
  if (type === "other") {
    return "Autre";
  }

  const properties = ANTIBODIES_PROPERTIES[type];
  return properties.label;
};

export type Result = string;

export type Block = {
  index: number;
  result: Result;
};

export type ResultOptions = Option<Result>[];
export type AntibodyGroup = OptionGroup<Antibody>;
export type AntibodyProperties = { resultOptions: ResultOptions };
export type PropertiesByAntibody = Partial<
  Record<Antibody, AntibodyProperties>
>;

export const OTHER_RESULT_OPTIONS: ResultOptions = [
  { value: "positive", label: "Positif" },
  { value: "negative", label: "Négatif" },
];

// TODO clean: test extensively
export const validateIhc = ({ ihc }: { ihc: IhcState }) => {
  if (!ihc.hasIhc) {
    return [];
  }

  const errors: string[] = [];

  if (ihc.antibodies.length === 0) {
    errors.push(`Aucun anticorps n'est sélectionné pour l'immunohistochimie.`);
  }

  ihc.antibodies.forEach((antibody) => {
    const label = getAntibodyLabel(antibody.type);

    if (antibody.blocks.length === 0) {
      errors.push(`Aucun bloc n'est sélectionné pour l'anticorps ${label}.`);
    }

    if (antibody.type === "other") {
      if (!antibody.name) {
        errors.push(`Le champ Nom pour l'anticorps ${label} doit être rempli.`);
      }

      if (!antibody.clone) {
        errors.push(
          `Le champ Clone pour l'anticorps ${label} doit être rempli.`,
        );
      }

      if (!antibody.conclusion) {
        errors.push(
          `Le champ Conclusions pour l'anticorps ${label} doit être rempli.`,
        );
      }
    }
  });

  return errors;
};
