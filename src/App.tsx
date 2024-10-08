import { MainList } from "./MainList";
import { DesignPage } from "./pages/_PageDesign";
import { DermatologyForm } from "./pages/dermatology/DermatologyForm";
import { ProstateBiopsyForm } from "./pages/prostate/prostate-biopsy/ProstateBiopsyForm";
import { ProstateResectionForm } from "./pages/prostate/prostate-resection/ProstateResectionForm";
import { assertUnreachable } from "./ui/helpers/helpers";
import { INDEX_ROUTE, isRoute, useHash } from "./ui/helpers/navigation";

export const App = () => {
  const { hash: rawHash } = useHash();
  const hash = isRoute(rawHash) ? rawHash : INDEX_ROUTE;

  switch (hash) {
    // Forms

    case "dermatology":
      return <DermatologyForm />;

    case "prostate-biopsy-transperineal":
      return <ProstateBiopsyForm formId="prostate-biopsy-transperineal" />;

    case "prostate-biopsy-transrectal":
      return <ProstateBiopsyForm formId="prostate-biopsy-transrectal" />;

    case "prostate-transurethral-resection":
      return (
        <ProstateResectionForm formId="prostate-transurethral-resection" />
      );

    case "prostate-holmium-laser-enucleation":
      return (
        <ProstateResectionForm formId="prostate-holmium-laser-enucleation" />
      );

    // Home page
    case "":
      return <MainList />;

    // Internal pages
    case "_design":
      return <DesignPage />;

    default:
      return assertUnreachable(hash);
  }
};
