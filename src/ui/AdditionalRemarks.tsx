import { InputTextArea } from "./InputTextArea";
import { Item } from "./Item";
import { FieldProps } from "./helpers.types";

type Props = FieldProps<string>;

export const AdditionalRemarks = ({ value, onChange }: Props) => (
  <Item>
    <InputTextArea
      value={value}
      label="Remarques particulières"
      placeholder="Ajoutez vos remarques additionnelles dans ce champ."
      onChange={onChange}
    />
  </Item>
);
