import { item } from "./helpers";
import { Language, translate } from "./translation";
import { getTrooleanOption, Troolean } from "./troolean";

export const reportTroolean = ({
  label,
  value,
  language,
}: {
  label: string;
  value: Troolean;
  language: Language;
}) => {
  const option = getTrooleanOption(value);
  return item(label, translate(option.label, language), language);
};
