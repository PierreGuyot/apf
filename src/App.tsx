import { DermatologyForm } from "./pages/dermatology/DermatologyForm";
import { ProstateBiopsyForm } from "./pages/prostate-biopsy/ProstateBiopsyForm";
import { Button } from "./ui/Button";
import { FORMS, FormId, isFormId } from "./ui/helpers/forms";
import { assertUnreachable } from "./ui/helpers/helpers";
import { FORM_ROUTES, useHash } from "./ui/helpers/navigation";

import "./app.css";
import { Page } from "./ui/Page";

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
          <div className="app-routes">
            {FORM_ROUTES.map((route) => (
              <FormRoute route={route} />
            ))}
          </div>
        </Page>
      );

    default:
      return assertUnreachable(hash);
  }
};
