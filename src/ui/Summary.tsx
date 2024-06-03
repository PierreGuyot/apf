import { useState } from "react";
import { Button } from "./Button";
import { Section } from "./Section";
import { Select } from "./Select";
import { Title } from "./Title";
import { copyToClipboard } from "./helpers/copy";
import { Option } from "./helpers/options";
import "./summary.css";
import { Language } from "./language";

type Props = {
  getContent: (language: Language) => string;
};

const LANGUAGE_OPTIONS: Option<Language>[] = [
  { value: "FR", label: "Français" },
  { value: "EN", label: "Anglais" },
];

export const Summary = ({ getContent }: Props) => {
  const [language, setLanguage] = useState<Language>("FR");

  const content = getContent(language);

  return (
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
      <div className="summary">
        <pre className="summary-content">{content}</pre>
      </div>
    </Section>
  );
};
