import { EMPTY_LINE, joinLines, Language, pad, reportTitle } from ".";

// Helper to pad a string (as opposed to a string[]):
// In that case, we need to split, pad, then join again
const padSection = (value: string) =>
  value.split(EMPTY_LINE).map(pad).join(EMPTY_LINE);

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
