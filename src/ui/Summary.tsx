import { ReactNode, useState } from "react";
import { Button } from "./Button";
import { InfoBox } from "./InfoBox";
import { Section } from "./Section";
import { Select } from "./Select";
import { Stack } from "./Stack";
import { TextBlock } from "./TextBlock";
import { copyToClipboard } from "./helpers/copy";
import { Option } from "./helpers/options";
import { Language } from "./translation";
import { ISSUE_LINK } from "../common/links";

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
        <Stack spacing="sm">
          <Stack direction="row" justifyContent="space-between">
            <Select
              variant="neutral"
              label="Langue :"
              value={language}
              options={LANGUAGE_OPTIONS}
              onChange={setLanguage}
            />
            <Button
              label="Copier dans le presse-papier"
              onClick={() => copyToClipboard(content)}
            />
          </Stack>
          <TextBlock>{content}</TextBlock>
          {/* FIXME: add mailing address to report issues */}
          <Stack alignItems="end">
            <InfoBox>
              Vous pouvez remonter un problème ou une suggestion d'amélioration{" "}
              <a href={ISSUE_LINK}>ici</a>.
            </InfoBox>
          </Stack>
        </Stack>
      </Section>
      {getTable ? getTable(language) : undefined}
    </>
  );
};
