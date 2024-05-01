import { Page } from "./ui/Page";
import { BiopsiesProstatiques } from "./pages/BiopsiesProstatiques/BiopsiesProstatiques";
import { Banner } from "./ui/Banner";
import { FORMS } from "./ui/forms";

const formId = "prostate-biopsy";

export const App = () => {
  const form = FORMS[formId];
  return (
    <Page title={form.title}>
      <Banner formId={formId} />
      <BiopsiesProstatiques />
    </Page>
  );
};
