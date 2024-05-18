import { toYesNo } from "./options";

type Props = {
  value: boolean;
};

export const YesOrNo = ({ value }: Props) => <span>{toYesNo(value)}</span>;
