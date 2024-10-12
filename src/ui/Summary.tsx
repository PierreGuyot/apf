import { ReactNode, useState } from "react";
import { Button } from "./Button";
import { Item } from "./Item";
import { Section } from "./Section";
import { Select } from "./Select";
import { TextBlock } from "./TextBlock";
import { copyToClipboard } from "./helpers/copy";
import { Option } from "./helpers/options";
import { Language } from "./language";
import css from "./summary.module.css";

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
      <Section title="Compte-rendu">
        <div className={css.buttons}>
          <Select
            variant="neutral"
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
