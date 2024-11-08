import { joinLines, Language, padSection, reportTitle } from ".";

export const reportTextArea = (
  title: string,
  comments: string,
  language: Language,
) => {
  const trimmedComments = comments.trim();

  return trimmedComments
    ? joinLines([reportTitle(title, language), padSection(trimmedComments)])
    : undefined;
};
