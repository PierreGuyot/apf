import {
  COLON_CHARACTER,
  joinLines,
  Language,
  padSection,
  translate,
} from "../ui";

export const getParagraphSection = (
  title: string,
  comments: string,
  language: Language,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  const trimmedComments = comments.trim();

  return trimmedComments
    ? joinLines([`${t(title)}${colon}`, padSection(trimmedComments)])
    : undefined;
};

export const getCommentSection = (
  form: { comments: string },
  language: Language,
) => getParagraphSection("Remarques particulières", form.comments, language);
