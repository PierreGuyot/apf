import { Page } from "./ui/Page";
import { BiopsiesProstatiques } from "./pages/BiopsiesProstatiques/BiopsiesProstatiques";

export const App = () => {
  return (
    <Page title="Biopsies Prostatiques">
      {/* TODO: add banner with `Last update on <date>` */}
      <BiopsiesProstatiques />
    </Page>
  );
};
