import { sum } from "../../../ui";
import { hasTumoralExtensionSection, Tumor } from "./helpers";

// TODO clean: add tests
export const validateTumorInput = ({ type, extension }: Tumor) => {
  if (!hasTumoralExtensionSection(type)) {
    return [];
  }

  const errors: string[] = [];

  const totalPercentage = sum(
    Object.values(extension).map((item) => item.percentage),
  );
  if (totalPercentage !== 100) {
    errors.push(
      `Le pourcentage total d'extension tumorale doit être égal à 100% (${totalPercentage} actuellement).`,
    );
  }

  return errors;
};
