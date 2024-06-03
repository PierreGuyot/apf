import { toYesNo } from "./helpers/options";
import { Language } from "./language";

type Props = {
  language?: Language;
  value: boolean;
};

export const YesOrNo = ({ value, language }: Props) => (
  <span>{toYesNo(value, language)}</span>
);
