import { IhcState } from "./helpers";

// FIXME: inline errors when possible (return object instead of array)
export const validateIhc = ({
  ihc,
  containerCount,
}: {
  ihc: IhcState;
  containerCount?: number;
}) => {
  if (!ihc.hasIhc) {
    return [];
  }

  const errors: string[] = [];

  if (ihc.blocks.length === 0) {
    errors.push(`Aucun bloc n'est sélectionné pour l'immunohistochimie.`);
  }

  const hasMultipleBlocks = typeof containerCount === "number";

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
                ? `Dans le bloc ${block.index}, les champs Nom et Résultat pour les anticorps autres doivent être renseignés.`
                : `Les champs Nom et Résultat pour les anticorps autres doivent être renseignés.`,
            );
          }
        });
      }
    });
  });

  return errors;
};
