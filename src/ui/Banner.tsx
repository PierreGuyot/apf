import "./banner.css";
import { FORMS, FormId } from "./forms";
import { join } from "./helpers";
import { ONE_DAY, formatDate, formatDurationInDays } from "./time";

// We recommend checking for updates after 180 days (around 6 months)
// TODO: discuss with Louis
const WARNING_DELAY_IN_DAYS = 180; // In days

type BannerProps = {
  formId: FormId;
};

const REPOSITORY_LINK = "https://github.com/PierreGuyot/apf";

export const Banner = ({ formId }: BannerProps) => {
  const { lastUpdate } = FORMS[formId];
  const daysSinceLastUpdate = Math.floor((Date.now() - lastUpdate) / ONE_DAY); // In days
  const isWarning = daysSinceLastUpdate > WARNING_DELAY_IN_DAYS;

  return (
    <div className={join("banner", isWarning ? "banner--warning" : undefined)}>
      <div>
        Dernière mise à jour le {formatDate({ timestamp: lastUpdate })} (
        {formatDurationInDays({ duration: daysSinceLastUpdate })})
      </div>
      <div>
        Vous pouvez re-télécharger une version plus à jour de ce formulaire en
        cliquant <a href={REPOSITORY_LINK}>ici</a>.
      </div>
    </div>
  );
};
