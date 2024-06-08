import { Button } from "./ui/Button";
import {
  FORMS,
  FORM_ROUTES,
  FormId,
  getCategoryProps,
} from "./ui/helpers/forms";
import { useHash } from "./ui/helpers/navigation";

import { MainDisclaimer } from "./common/MainDisclaimer";
import "./main-list.css";
import { Em } from "./ui/Em";
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

export const MainList = () => {
  return (
    <Page title="Bienvenue sur APF">
      {/* TODO: add context here, aligned on the README file */}
      <Section>
        <div className="main-list-presentation">
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
        <MainDisclaimer />
      </Section>

      <Section title="Choisissez un type de formulaire">
        <div className="main-list-routes">
          {FORM_ROUTES.map((item) => {
            const { label, imagePath } = getCategoryProps(item.category);
            return (
              <div>
                <div className="main-list-section">
                  <img
                    className="main-list-section-icon"
                    src={imagePath}
                    alt=""
                  />
                  <div className="main-list-section-label"> {label}</div>
                </div>
                <div className="main-list-section-routes">
                  {item.routes.map((route) => (
                    <FormRoute key={route} route={route} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </Page>
  );
};
