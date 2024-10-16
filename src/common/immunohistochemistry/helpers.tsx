import { Option, OptionGroup } from "../../ui";

export type IhcState = {
  hasIhc: boolean;
  blocks: Block[];
};

export type Block = {
  index: number;
  antibodies: AntibodyData[];
};

export type StandardAntibody = {
  type: Antibody;
  clone: AntibodyClone;
  result: string;
};

export type OtherAntibody = {
  type: "other";
  name: string;
  clone: string;
  result: string;
};

export type AntibodyData = StandardAntibody | OtherAntibody;

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
export type AntibodyClone =
  | "M-13H4"
  | "M-4A4"
  | "M-4A4"
  | "M-D5/16B4"
  | "SP53"
  | "M-13H4"
  | "polyclonal-ventana"
  | "EP356"
  | "M-SP52"
  | "M-SP33"
  | "M-L50-823"
  | "M-EP111"

  // Mocks
  | "TODO";

// FIXME: un-mock
const MOCK_CLONES: Option<AntibodyClone>[] = [{ value: "TODO", label: "TODO" }];

export const ANTIBODIES_PROPERTIES: Record<
  Antibody,
  {
    label: string;
    clones: Option<AntibodyClone>[];
  }
> = {
  "P504S/P63": {
    label: "P504S/P63",
    clones: [
      {
        value: "M-13H4",
        label: "M-13H4",
      },
      {
        value: "M-4A4",
        label: "M-4A4",
      },
    ],
  },
  P63: {
    label: "P63",
    clones: [
      {
        value: "M-4A4",
        label: "M-4A4",
      },
    ],
  },
  // FIXME: un-mock (missing in the spec)
  BCC: {
    label: "BCC",
    clones: MOCK_CLONES,
  },
  "CK5/6": {
    label: "CK5/6",
    clones: [
      {
        value: "M-D5/16B4",
        label: "M-D5/16B4",
      },
    ],
  },
  // FIXME: un-mock (missing in the spec)
  CK903: {
    label: "CK903",
    clones: MOCK_CLONES,
  },
  "CK14/CK15": {
    label: "CK14/CK15",
    clones: [
      {
        value: "SP53",
        label: "SP53",
      },
    ],
  },
  P504S: {
    label: "P504S",
    clones: [
      {
        value: "M-13H4",
        label: "M-13H4",
      },
    ],
  },
  PSA: {
    label: "PSA",
    clones: [
      {
        value: "polyclonal-ventana",
        label: "Polyclonal (Ventana)",
      },
    ],
  },
  // FIXME: un-mock (missing in the spec)
  PSAP: { label: "PSAP", clones: MOCK_CLONES },
  "NKX3.1": {
    label: "NKX3.1",
    clones: [
      {
        value: "EP356",
        label: "EP356",
      },
    ],
  },
  // FIXME: un-mock (missing in the spec)
  RA: { label: "RA", clones: MOCK_CLONES },
  CK7: {
    label: "CK7",
    clones: [
      {
        value: "M-SP52",
        label: "M-SP52",
      },
    ],
  },
  CK20: {
    label: "CK20",
    clones: [
      {
        value: "M-SP33",
        label: "M-SP33",
      },
    ],
  },
  GATA3: {
    label: "GATA3",
    clones: [
      {
        value: "M-L50-823",
        label: "M-L50-823",
      },
    ],
  },
  ERG: {
    label: "ERG",
    clones: [
      {
        value: "M-EP111",
        label: "M-EP111",
      },
    ],
  },
};

export const getAntibodyLabel = (type: Antibody | "other") => {
  if (type === "other") {
    return "Autre";
  }

  const properties = ANTIBODIES_PROPERTIES[type];
  return properties.label;
};

export type Result = string;

export type ResultOptions = Option<Result>[];
export type AntibodyGroup = OptionGroup<Antibody>;
type AntibodyProperties = { resultOptions: ResultOptions };
export type PropertiesByAntibody = Partial<
  Record<Antibody, AntibodyProperties>
>;

// TODO clean: test extensively
export const validateIhc = ({ ihc }: { ihc: IhcState }) => {
  if (!ihc.hasIhc) {
    return [];
  }

  const errors: string[] = [];

  if (ihc.blocks.length === 0) {
    errors.push(`Aucun bloc n'est sélectionné pour l'immunohistochimie.`);
  }

  ihc.blocks.forEach((block) => {
    if (block.antibodies.length === 0) {
      errors.push(
        `Aucun anticorps n'est sélectionné pour le bloc ${block.index}.`,
      );
    }

    block.antibodies.forEach((antibody) => {
      if (antibody.type === "other") {
        const label = getAntibodyLabel(antibody.type);

        if (!antibody.name) {
          errors.push(
            `Dans le bloc ${block.index}, le champ Nom pour l'anticorps ${label} doit être rempli.`,
          );
        }

        if (!antibody.clone) {
          errors.push(
            `Dans le bloc ${block.index}, le champ Clone pour l'anticorps ${label} doit être rempli.`,
          );
        }

        if (!antibody.result) {
          errors.push(
            `Dans le bloc ${block.index}, le champ Résultats immunohistochimies pour l'anticorps ${label} doit être rempli.`,
          );
        }
      }
    });
  });

  return errors;
};
