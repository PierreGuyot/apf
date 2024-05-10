import { Page } from "./ui/Page";
import { ProstateBiopsyForm } from "./pages/prostate-biopsy/ProstateBiopsyForm";
import { Banner } from "./ui/Banner";
import { FORMS } from "./ui/forms";

const formId = "prostate-biopsy";

export const App = () => {
  const form = FORMS[formId];
  return (
    <Page title={form.title}>
      <Banner formId={formId} />
      <ProstateBiopsyForm />
    </Page>
  );
};
