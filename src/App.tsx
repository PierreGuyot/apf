import { isFeatureFlagEnabled } from "./feature-flags";
import { PageMain } from "./pages/PageMain";
import { DesignPage } from "./pages/_PageDesign";
import { InvasiveMelanomaForm } from "./pages/dermatology/invasive-melanoma/InvasiveMelanomaForm";
import { DermatologyForm } from "./pages/dermatology/_wip-dermatology/DermatologyForm";
import { BladderResectionForm } from "./pages/prostate/bladder-resection/BladderResectionForm";
import { ProstateBiopsyForm } from "./pages/prostate/prostate-biopsy/ProstateBiopsyForm";
import { ProstateResectionForm } from "./pages/prostate/prostate-resection/ProstateResectionForm";
import { useIsLogged } from "./session";
import {
  assertUnreachable,
  INDEX_ROUTE,
  isFormId,
  isRoute,
  Route,
  useHash,
} from "./ui";

const isEnabledRoute = (value: string): value is Route => {
  if (!isRoute(value)) {
    return false;
  }

  if (isFormId(value)) {
    return isFeatureFlagEnabled(value);
  }

  return true;
};

// Mock routing using hash
export const App = () => {
  const { hash: rawHash } = useHash();
  const hash = isEnabledRoute(rawHash) ? rawHash : INDEX_ROUTE;
  const isLogged = useIsLogged();

  if (!isLogged) {
    return <PageMain />;
  }

  switch (hash) {
    // Forms
    // Note: this switch is not smart, but easy to maintain
    case "dermatology":
      return <DermatologyForm formId={hash} />;
    case "prostate-biopsy-transperineal":
      return <ProstateBiopsyForm formId={hash} />;
    case "prostate-biopsy-transrectal":
      return <ProstateBiopsyForm formId={hash} />;
    case "prostate-transurethral-resection":
      return <ProstateResectionForm formId={hash} />;
    case "prostate-holmium-laser-enucleation":
      return <ProstateResectionForm formId={hash} />;
    case "bladder-transurethral-resection":
      return <BladderResectionForm formId={hash} />;
    case "invasive-melanoma":
      return <InvasiveMelanomaForm formId={hash} />;

    // Home page
    case "":
      return <PageMain />;

    // Internal pages
    case "_design":
      return <DesignPage />;

    default:
      return assertUnreachable(hash);
  }
};
