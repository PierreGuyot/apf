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
  type: AntibodyType;
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

export type AntibodyType =
  | "BCC"
  | "CK14/CK15"
  | "CK5/6"
  | "CK903"
  | "P504S"
  | "P504S/P63"
  | "P63"
  | "BRAF"
  | "HMB45"
  | "Ki67"
  | "Melan A"
  | "P16"
  | "PRAME"
  | "PS100"
  | "SOX10"

  // FIXME: remove mock
  | "TODO";

export type AntibodyClone =
  | "6F11"
  | "A103"
  | "EP268"
  | "EP356"
  | "HMB45"
  | "M-13H4"
  | "M-13H4"
  | "M-4A4"
  | "M-4A4"
  | "M-D5/16B4"
  | "M-EP111"
  | "M-L50-823"
  | "M-SP33"
  | "M-SP52"
  | "MIB-1"
  | "polyclonal-ventana"
  | "polyclonal"
  | "QR005"
  | "SP53"
  | "VE1"

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
  type: AntibodyType | "others";
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
  let result =
    typeof resultOptions === "undefined" ? "" : resultOptions[0].value;

  return { type, clone: defaultClone, result };
};

export const aNewBlock = (index: number): Block => ({
  index,
  antibodies: [],
});

// FIXME: add missing values
// FIXME: fix data structure (labels should not be precised in multiple places)
export const ANTIBODIES_PROPERTIES: Record<
  AntibodyType,
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
  BRAF: {
    label: "BRAF",
    clones: [{ value: "VE1", label: "VE1" }],
  },
  HMB45: {
    label: "HMB45",
    clones: [{ value: "HMB45", label: "HMB45" }],
  },
  Ki67: {
    label: "Ki67",
    clones: [{ value: "MIB-1", label: "MIB-1" }],
  },
  "Melan A": {
    label: "Melan A",
    clones: [{ value: "A103", label: "A103" }],
  },
  P16: {
    label: "P16",
    clones: [{ value: "6F11", label: "6F11" }],
  },
  PRAME: {
    label: "PRAME",
    clones: [{ value: "QR005", label: "QR005" }],
  },
  PS100: {
    label: "PS100",
    clones: [{ value: "polyclonal", label: "polyclonal" }],
  },
  SOX10: {
    label: "SOX10",
    clones: [{ value: "EP268", label: "EP268" }],
  },

  // FIXME: remove
  TODO: {
    label: "TODO",
    clones: [],
  },
};

export type Result = string;

export type ResultOptions = Option<Result>[];
export type AntibodyGroup = OptionGroup<AntibodyType>;
type AntibodyProperties = { resultOptions?: ResultOptions };
export type PropertiesByAntibody = Partial<
  Record<AntibodyType, AntibodyProperties>
>;

// TODO clean: test extensively
export const validateIhc = ({
  ihc,
  hasMultipleBlocks,
}: {
  ihc: IhcState;
  hasMultipleBlocks: boolean;
}) => {
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
        hasMultipleBlocks
          ? `Aucun anticorps n'est sélectionné pour le bloc ${block.index}.`
          : `Aucun anticorps n'est sélectionné.`,
      );
    }

    block.antibodies.forEach((antibody) => {
      if (antibody.type === "others") {
        antibody.values.forEach((value) => {
          if (!value.name || !value.result) {
            // Clone field is optional
            errors.push(
              hasMultipleBlocks
                ? `Dans le bloc ${block.index}, les champs Nom et Résultat pour les anticorps autres doit être remplis.`
                : `Les champs Nom et Résultat pour les anticorps autres doit être remplis.`,
            );
          }
        });
      }
    });
  });

  return errors;
};
