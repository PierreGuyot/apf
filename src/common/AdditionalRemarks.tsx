import { InputTextArea, Section } from "../ui";

type Props = {
  value: string;
  index?: number;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: string) => void;
};

export const AdditionalRemarks = ({ index, value, onChange }: Props) => (
  <Section title="Remarques particulières" index={index}>
    <InputTextArea
      value={value}
      placeholder="Ajoutez vos remarques additionnelles dans ce champ."
      onChange={onChange}
    />
  </Section>
);
