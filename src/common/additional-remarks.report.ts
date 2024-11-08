import { Language, Lines, reportTextArea } from "../ui";

export const reportAdditionalRemarks = (
  form: { comments: string },
  language: Language,
): Lines => reportTextArea("Remarques particulières", form.comments, language);
