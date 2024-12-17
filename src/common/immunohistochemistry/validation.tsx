import { ERROR_MANDATORY_FIELD } from "../../validation";
import { IhcState } from "./helpers";

export type BlockErrors = {
  antibodyCount?: string;
  antibodies: AntibodyOtherError[][];
};

export type AntibodyOtherError = { name?: string; result?: string };

export type IhcErrors = {
  blockCount?: string;
  blocks: BlockErrors[];
};

// FIXME: inline errors when possible (return object instead of array)
export const validateIhc = (ihc: IhcState): IhcErrors => {
  if (!ihc.hasIhc) {
    return { blocks: [] };
  }

  const errors: BlockErrors[] = [];
  ihc.blocks.forEach((block) => {
    let antibodyCountError =
      block.antibodies.length === 0
        ? "Aucun anticorps n'est sélectionné."
        : undefined;

    let antibodiesErrors = block.antibodies.map((antibody) => {
      if (antibody.type !== "others") {
        return [];
      }

      return antibody.values.map((value) => ({
        name: value.name ? undefined : ERROR_MANDATORY_FIELD,
        result: value.result ? undefined : ERROR_MANDATORY_FIELD,
      }));
    });

    errors.push({
      antibodyCount: antibodyCountError,
      antibodies: antibodiesErrors,
    });
  });

  return {
    blockCount: ihc.blocks.length ? undefined : "Aucun bloc n'est sélectionné.",
    blocks: errors,
  };
};
