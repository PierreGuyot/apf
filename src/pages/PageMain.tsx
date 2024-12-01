import { useState } from "react";
import {
  Button,
  Disclaimer,
  FORMS,
  FORM_CATEGORIES,
  FormId,
  InputText,
  Page,
  Section,
  Stack,
  Text,
  Title,
  getCategoryProps,
  useHash,
} from "../ui";

import { PASS_CODE, log, useIsLogged } from "../session";
import css from "./page-main.module.css";
// TODO clean: handle link buttons?
const FormRoute = ({ route }: { route: FormId }) => {
  const { updateHash } = useHash();

  const { title } = FORMS[route];

  return (
    <div>
      <Button label={title} onClick={() => updateHash(route)} />
    </div>
  );
};

export const PageMain = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const isLogged = useIsLogged();

  return (
    <Page title="Bienvenue sur APF">
      <Stack spacing="lg">
        {isLogged ? (
          <>
            <Section>
              <Stack spacing="xs">
                <div>
                  <Text variant="bold">APF</Text> est un formulaire de
                  compte-rendu standardisé pour l'anatomopathologie.
                </div>
                <div>
                  Il est conçu par:
                  <ul>
                    <Stack spacing="sm">
                      <li>
                        <Text variant="bold">Louis Vaquier</Text> (interne en
                        anatomopathologie)
                      </li>
                      <li>
                        <Text variant="bold">Yu Tian</Text> (assistant en
                        anatomopathologie)
                      </li>
                      <li>
                        <Text variant="bold">Pierre Guyot</Text> (ingénieur en
                        informatique)
                      </li>
                    </Stack>
                  </ul>
                </div>
                <div>
                  Le code du projet est disponible{" "}
                  <a href="https://github.com/PierreGuyot/apf">ici</a>.
                </div>
              </Stack>
            </Section>

            <Section>
              <Disclaimer>
                Attention ! Ce projet est un prototype et se trouve encore en
                phase de test.
              </Disclaimer>
            </Section>
            <Section title="Choisissez un type de formulaire">
              <Stack spacing="lg">
                {FORM_CATEGORIES.map((item) => {
                  const { label, imagePath } = getCategoryProps(item.category);
                  return (
                    <div key={item.category}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        marginBottom="md"
                        spacing="sm"
                      >
                        <img className={css.icon} src={imagePath} alt="" />
                        <Title title={label} hasMarginBottom={false} />
                      </Stack>
                      <Stack spacing="sm">
                        {item.routes.map((route) => (
                          <Stack
                            direction="row"
                            spacing="sm"
                            alignItems="center"
                          >
                            <FormRoute key={route.id} route={route.id} />
                            {route.isWip ? <FeatureStatusBeta /> : undefined}
                          </Stack>
                        ))}
                      </Stack>
                    </div>
                  );
                })}
              </Stack>
            </Section>
          </>
        ) : (
          <Stack spacing="sm">
            Entrez votre code d'accès :
            <InputText
              type="password"
              value={code}
              onChange={(value) => {
                setIsSubmitted(false);
                setCode(value);
              }}
              onReturn={() => {
                if (code === PASS_CODE) {
                  log();
                  // Refresh after log
                  window.location.reload();
                } else {
                  setError("Le code entré est invalide.");
                  setIsSubmitted(true);
                }
              }}
              isSubmitted={isSubmitted}
              errorMessage={isSubmitted ? error : undefined}
            />
          </Stack>
        )}
      </Stack>
    </Page>
  );
};

const FeatureStatusBeta = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-warning)",
        border: "1px solid var(--border-warning)",
        padding: "var(--spacing-xs) var(--spacing-sm)",
        borderRadius: "var(--border-radius-md)",
      }}
    >
      <Text size="sm">En cours de développement</Text>
    </div>
  );
};
