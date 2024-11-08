import { item } from "./helpers";
import { Language } from "./translation";
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
  return item(label, option.label, language);
};
