import { findOption, item, YES_NO_OPTIONS } from "./helpers";
import { Language, translate } from "./translation";

const getBooleanOption = findOption(YES_NO_OPTIONS);

export const reportBoolean = ({
  label,
  value,
  language,
}: {
  label?: string;
  value: boolean;
  language: Language;
}) => {
  const option = getBooleanOption(value ? "yes" : "no");
  return item(label, translate(option.label, language), language);
};
