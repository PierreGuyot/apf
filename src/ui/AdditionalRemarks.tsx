import { InputTextArea } from "./InputTextArea";
import { Section } from "./Section";
import { Title } from "./Title";

type Props = {
  index: number;
  value: string;
  onChange: (value: string) => void;
};

export const AdditionalRemarks = ({ index, value, onChange }: Props) => (
  <Section>
    <Title title="Remarques particulières" index={index} />
    <InputTextArea
      value={value}
      placeholder="Ajoutez vos remarques additionnelles dans ce champ."
      onChange={onChange}
    />
  </Section>
);
