import { Language } from "../ui";
import { reportTextArea } from "../ui/text-area.report";

export const reportAdditionalRemarks = (
  form: { comments: string },
  language: Language,
) => reportTextArea("Remarques particulières", form.comments, language);
