import { Button } from "./Button";
import "./banner.css";
import { FORMS, FormId } from "./helpers/forms";
import { join } from "./helpers/helpers";
import { joinLines } from "./helpers/text";
import { goToIndex } from "./helpers/navigation";
import { ONE_DAY, formatDate, formatDurationInDays } from "./time";

// We recommend checking for updates after 180 days (around 6 months)
// TODO with Louis: discuss
const WARNING_DELAY_IN_DAYS = 180; // In days

type Props = {
  formId: FormId;
  onClear: () => void;
};

const REPOSITORY_LINK = "https://github.com/PierreGuyot/apf";
const CONFIRMATION_MESSAGE = joinLines([
  "Êtes-vous certain de vouloir remettre le formulaire à zéro ?",
  "Vos changements seront définitivement perdus.",
]);

export const Banner = ({ formId, onClear: _onClear }: Props) => {
  const { lastUpdate } = FORMS[formId];
  const daysSinceLastUpdate = Math.floor((Date.now() - lastUpdate) / ONE_DAY); // In days
  const isWarning = daysSinceLastUpdate > WARNING_DELAY_IN_DAYS;

  const onClear = () => {
    const confirmation = window.confirm(CONFIRMATION_MESSAGE);
    if (confirmation) {
      _onClear();
    }
  };

  return (
    <div className={join("banner", isWarning ? "banner--warning" : undefined)}>
      <div>
        <div>
          Dernière mise à jour le {formatDate({ timestamp: lastUpdate })} (
          {formatDurationInDays({ duration: daysSinceLastUpdate })})
        </div>
        <div>
          Vous pouvez télécharger une version plus à jour de ce formulaire{" "}
          <a href={REPOSITORY_LINK}>ici</a>.
        </div>
        {/* TODO: add mailing address to report issues */}
      </div>
      <div className="banner-actions">
        <Button label="Remettre le formulaire à zéro" onClick={onClear} />
        <Button
          label="Retourner à la liste des formulaires"
          onClick={goToIndex}
        />
      </div>
    </div>
  );
};
