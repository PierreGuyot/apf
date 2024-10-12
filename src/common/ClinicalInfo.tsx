import { InputTextArea, Section } from "../ui";

type Props = {
  index?: number;
  value: string;
  isReadOnly?: boolean; // TODO clean: implement
  onChange: (value: string) => void;
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
