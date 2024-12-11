// Key should be singular, value should be plural
// For instance: 'cheval': 'chevaux'
const IRREGULAR_PLURALS: Record<string, string> = {};
const defaultPlural = (word: string) => `${word}s`;

export const pluralize = (count: number, word: string) => {
  // None and singular
  if (count <= 1) {
    return word;
  }

  // Plural
  return IRREGULAR_PLURALS[word] ?? defaultPlural(word);
};

export const count = (count: number, word: string) =>
  `${count} ${pluralize(count, word)}`;

export type GrammaticalForm = {
  number: "singular" | "plural";
  gender: "feminine" | "masculine"; // Required in some languages like French
};
