import { filterNullish, sum } from "./helpers";

export const validateComposition = (
  composition: Partial<Record<string, number>>,
): string | undefined => {
  const total = sum(Object.values(composition).filter(filterNullish));
  return total === 100
    ? undefined
    : `Le total doit être égal à 100% (${100 - total}% pour l'instant).`;
};
