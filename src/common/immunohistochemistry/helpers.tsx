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
  name: string;
  clone: string;
  result: string;
};

export type OtherAntibodies = {
  type: "others";
  values: OtherAntibody[];
};

export type AntibodyData = StandardAntibody | OtherAntibodies;

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
  | "P504S";

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

  // FIXME: remove
  | "TODO";

export const aNewOtherAntibody = (): OtherAntibody => ({
  name: "",
  clone: "",
  result: "",
});

export const aNewOtherAntibodies = (): OtherAntibodies => ({
  type: "others",
  values: [aNewOtherAntibody()],
});

export const aNewAntibody = ({
  type,
  properties,
}: {
  type: Antibody | "others";
  properties: PropertiesByAntibody;
}): AntibodyData => {
  if (type === "others") {
    return aNewOtherAntibodies();
  }

  const { clones } = ANTIBODIES_PROPERTIES[type];
  const defaultClone = clones[0].value;

  const antibodyProperties = properties[type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }
  const { resultOptions } = antibodyProperties;
  const defaultResult = resultOptions[0].value;

  return {
    type: type,
    clone: defaultClone,
    result: defaultResult,
  };
};

export const aNewBlock = (index: number): Block => ({
  index,
  antibodies: [],
});

// FIXME: add missing values
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
  BCC: {
    label: "BCC",
    clones: [{ value: "TODO", label: "TODO" }],
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
  CK903: {
    label: "CK903",
    clones: [{ value: "TODO", label: "TODO" }],
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
      if (antibody.type === "others") {
        antibody.values.forEach((value) => {
          if (!value.name || !value.result) {
            // Clone field is optional
            errors.push(
              `Dans le bloc ${block.index}, les champs Nom et Résultat pour les anticorps autres doit être remplis.`,
            );
          }
        });
      }
    });
  });

  return errors;
};
