import { ReactNode, useState } from "react";
import { Button } from "./Button";
import { Section } from "./Section";
import { Select } from "./Select";
import { Title } from "./Title";
import { copyToClipboard } from "./helpers/copy";
import { Option } from "./helpers/options";
import { Language } from "./language";
import "./summary.css";
import { TextBlock } from "./TextBlock";
import { Item } from "./Item";

type Props = {
  getContent: (language: Language) => string; // This part of the content must be a string for copy-pasting
  getTable?: (language: Language) => ReactNode;
};

const LANGUAGE_OPTIONS: Option<Language>[] = [
  { value: "FR", label: "Français" },
  { value: "EN", label: "Anglais" },
];

export const Summary = ({ getContent, getTable }: Props) => {
  const [language, setLanguage] = useState<Language>("FR");

  const content = getContent(language);

  return (
    <>
      <Section>
        <Title title="Compte-rendu" />
        <div className="summary-buttons">
          <Select
            name="Language selection"
            label="Langue :"
            value={language}
            options={LANGUAGE_OPTIONS}
            onChange={setLanguage}
          />
          <Button
            label="Copier dans le presse-papier"
            onClick={() => copyToClipboard(content)}
          />
        </div>
        <TextBlock>{content}</TextBlock>
      </Section>
      {getTable ? (
        <Item hasMaxWidth={false}>{getTable(language)}</Item>
      ) : undefined}
    </>
  );
};
