import { toYesNo } from "./helpers/options";
import { Language } from "./translation";

type Props = {
  language?: Language;
  value: boolean;
};

export const YesOrNo = ({ value, language }: Props) => (
  <span>{toYesNo(value, language)}</span>
);
