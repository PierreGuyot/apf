import { InputTextArea } from "./InputTextArea";
import { Item } from "./Item";
import { Title } from "./Title";

type Props = {
  index: number;
  value: string;
  onChange: (value: string) => void;
};

export const AdditionalRemarks = ({ index, value, onChange }: Props) => (
  <Item>
    <Title title="Remarques particulières" index={index} />
    <InputTextArea
      value={value}
      placeholder="Ajoutez vos remarques additionnelles dans ce champ."
      onChange={onChange}
    />
  </Item>
);
