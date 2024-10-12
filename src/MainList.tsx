import {
  Button,
  Disclaimer,
  FORMS,
  FORM_ROUTES,
  FormId,
  Page,
  Section,
  Stack,
  Text,
  Title,
  getCategoryProps,
  useHash,
} from "./ui";

import css from "./main-list.module.css";
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

export const MainList = () => {
  return (
    <Page title="Bienvenue sur APF">
      {/* FIXME: add context here, aligned on the README file */}
      <Section>
        <div className={css.presentation}>
          <div>
            <Text variant="bold">APF</Text> est un formulaire de compte-rendu
            standardisé pour l'anatomopathologie.
          </div>
          <div>
            Il est conçu par <Text variant="bold">Louis Vaquier</Text> (interne
            en anatomopathologie) et <Text variant="bold">Pierre Guyot</Text>{" "}
            (ingénieur en informatique).
          </div>
          <div>
            Le code du projet est disponible{" "}
            <a href="https://github.com/PierreGuyot/apf">ici</a>.
          </div>
        </div>
      </Section>

      <Section>
        <Disclaimer>
          Attention ! Ce projet est un prototype et se trouve encore en phase de
          test.
        </Disclaimer>
      </Section>

      <Section title="Choisissez un type de formulaire">
        <div className={css.routes}>
          {FORM_ROUTES.map((item) => {
            const { label, imagePath } = getCategoryProps(item.category);
            return (
              <div key={item.category}>
                <div className={css.section}>
                  <img className={css.icon} src={imagePath} alt="" />
                  <Title title={label} hasMarginBottom={false} />
                </div>
                <Stack spacing="sm">
                  {item.routes.map((route) => (
                    <FormRoute key={route} route={route} />
                  ))}
                </Stack>
              </div>
            );
          })}
        </div>
      </Section>
    </Page>
  );
};
