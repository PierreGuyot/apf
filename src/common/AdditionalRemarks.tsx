import { InputTextArea } from "../ui/InputTextArea";
import { Section } from "../ui/Section";
import { FieldProps } from "../ui/helpers/fields";

type Props = FieldProps<string> & {
  index?: number;
};

export const AdditionalRemarks = ({ index, value, onChange }: Props) => (
  <Section title="Remarques particulières" index={index}>
    <InputTextArea
      value={value}
      placeholder="Ajoutez vos remarques additionnelles dans ce champ"
      onChange={onChange}
    />
  </Section>
);
