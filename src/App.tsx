import { DermatologyForm } from "./pages/dermatology/DermatologyForm";
import { ProstateBiopsyForm } from "./pages/prostate-biopsy/ProstateBiopsyForm";
import { Button } from "./ui/Button";
import { FORMS, FormId, isFormId } from "./ui/helpers/forms";
import { assertUnreachable } from "./ui/helpers/helpers";
import { FORM_ROUTES, useHash } from "./ui/helpers/navigation";

import "./app.css";
import { Em } from "./ui/Em";
import { Disclaimer } from "./ui/Disclaimer";
import { Page } from "./ui/Page";
import { Section } from "./ui/Section";

// TODO: handle link buttons?
const FormRoute = ({ route }: { route: FormId }) => {
  const { updateHash } = useHash();

  const { title } = FORMS[route];
  return (
    <div>
      <Button label={title} onClick={() => updateHash(route)} />
    </div>
  );
};

export const App = () => {
  const { hash: rawHash } = useHash();
  const hash = isFormId(rawHash) ? rawHash : undefined;

  switch (hash) {
    case "dermatology":
      return <DermatologyForm />;

    case "prostate-biopsy":
      return <ProstateBiopsyForm />;

    case undefined:
      return (
        <Page title="Formulaires">
          {/* TODO: add context here, aligned on the README file */}
          <Section>
            <div className="app-presentation">
              <div>
                <Em>APF</Em> est un formulaire de compte-rendu standardisé pour
                l'anatomopathologie.
              </div>
              <div>
                Il a été par conçu par <Em>Louis Vaquier</Em> (interne en
                anatomopathologie) et <Em>Pierre Guyot</Em> (ingénieur en
                informatique).
              </div>
              <div>
                Le code du projet est disponible{" "}
                <a href="https://github.com/PierreGuyot/apf">ici</a>.
              </div>
            </div>
          </Section>

          <Section>
            <Disclaimer>
              Attention ! Ce formulaire est un prototype et se trouve encore en
              phase de test.
            </Disclaimer>
          </Section>

          <Section title="Choisissez un type de formulaire">
            <div className="app-routes">
              {FORM_ROUTES.map((route) => (
                <FormRoute key={route} route={route} />
              ))}
            </div>
          </Section>
        </Page>
      );

    default:
      return assertUnreachable(hash);
  }
};
