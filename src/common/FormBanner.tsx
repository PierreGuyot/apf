import {
  Banner,
  Button,
  FORMS,
  FormId,
  ONE_DAY,
  Stack,
  formatDate,
  formatDurationInDays,
  goToIndex,
  joinLines,
} from "../ui";
import { FormDisclaimer } from "./FormDisclaimer";

// We recommend checking for updates after 180 days (around 6 months)
// FIXME: discuss
const WARNING_DELAY_IN_DAYS = 180; // In days

type Props = {
  formId: FormId;
  isPickingMode: boolean;
  isPrototype: boolean;
  onClear: () => void;
};

const REPOSITORY_LINK = "https://github.com/PierreGuyot/apf";
const ISSUE_LINK = "https://github.com/PierreGuyot/apf/issues";
const CONFIRMATION_MESSAGE = joinLines([
  "Êtes-vous certain de vouloir remettre le formulaire à zéro ?",
  "Vos changements seront définitivement perdus.",
]);

export const FormBanner = ({
  formId,
  isPickingMode,
  isPrototype,
  onClear: _onClear,
}: Props) => {
  const { lastUpdate } = FORMS[formId];
  const daysSinceLastUpdate = Math.floor((Date.now() - lastUpdate) / ONE_DAY); // In days
  const isWarning = daysSinceLastUpdate > WARNING_DELAY_IN_DAYS;

  const onClear = () => {
    const confirmation = window.confirm(CONFIRMATION_MESSAGE);
    if (confirmation) {
      _onClear();
    }
  };

  const left = (
    <>
      <div>
        Dernière mise à jour le {formatDate({ timestamp: lastUpdate })} (
        {formatDurationInDays({ duration: daysSinceLastUpdate })})
      </div>
      <div>
        Vous pouvez télécharger une version plus à jour de ce formulaire{" "}
        <a href={REPOSITORY_LINK}>ici</a>.
      </div>
      {/* TODO feature: add mailing address to report issues */}
      <div>
        Vous pouvez remonter un problème ou une suggestion d'amélioration{" "}
        <a href={ISSUE_LINK}>ici</a>.
      </div>
      {isPrototype ? (
        <Stack marginTop="md">
          <FormDisclaimer />
        </Stack>
      ) : undefined}
    </>
  );

  const right = (
    <>
      {isPickingMode ? undefined : (
        <div>
          <Button label="Remettre le formulaire à zéro" onClick={onClear} />
        </div>
      )}
      <div>
        <Button
          label="Retourner à la liste des formulaires"
          onClick={goToIndex}
        />
      </div>
    </>
  );

  return <Banner left={left} right={right} isWarning={isWarning} />;
};
