import { Language, reportTextArea } from "../ui";

export const reportAdditionalRemarks = (
  form: { comments: string },
  language: Language,
) => reportTextArea("Remarques particulières", form.comments, language);
