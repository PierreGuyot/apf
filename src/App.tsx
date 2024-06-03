import { MainList } from "./MainList";
import { DermatologyForm } from "./pages/dermatology/DermatologyForm";
import { ProstateBiopsyForm } from "./pages/prostate-biopsy/ProstateBiopsyForm";
import { isFormId } from "./ui/helpers/forms";
import { assertUnreachable } from "./ui/helpers/helpers";
import { useHash } from "./ui/helpers/navigation";

export const App = () => {
  const { hash: rawHash } = useHash();
  const hash = isFormId(rawHash) ? rawHash : undefined;

  switch (hash) {
    case "dermatology":
      return <DermatologyForm />;

    case "prostate-biopsy-transperineal":
      return <ProstateBiopsyForm formId="prostate-biopsy-transperineal" />;

    case "prostate-biopsy-transrectal":
      return <ProstateBiopsyForm formId="prostate-biopsy-transrectal" />;

    case undefined:
      return <MainList />;

    default:
      return assertUnreachable(hash);
  }
};
