import { useState } from "react";
import { Button } from "./Button";
import { Title } from "./Title";
import { copyToClipboard } from "./copy";
import "./summary.css";
import { Language } from "./helpers.types";
import { Option } from "./options";
import { Select } from "./Select";

type SummaryProps = {
  getContent: (language: Language) => string;
};

const LANGUAGE_OPTIONS: Option<Language>[] = [
  { value: "FR", label: "Français" },
  { value: "EN", label: "Anglais" },
];

export const Summary = ({ getContent }: SummaryProps) => {
  const [language, setLanguage] = useState<Language>("FR");

  const content = getContent(language);

  return (
    <>
      <Title title="Compte-rendu" marginBottom="sm" />
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
    </>
  );
};
