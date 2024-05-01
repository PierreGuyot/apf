import { YES_NO_OPTIONS } from "./options";

type Props = {
  value: boolean;
};

export const YesOrNo = ({ value }: Props) => {
  const option = YES_NO_OPTIONS.find((item) => item.value === value);
  return <span>{option?.label}</span>;
};
