import { InputTextArea } from "../ui/InputTextArea";
import { Section } from "../ui/Section";
import { FieldProps } from "../ui/helpers/fields";

type Props = FieldProps<string> & {
  index?: number;
};

export const ClinicalInfo = ({ index, value, onChange }: Props) => (
  <Section title="Renseignements cliniques" index={index}>
    <InputTextArea
      value={value}
      placeholder="Ajoutez ici les renseignements cliniques"
      onChange={onChange}
    />
  </Section>
);
