export type Language = "FR" | "EN";
export const DEFAULT_LANGUAGE = "FR" satisfies Language;

const DICTIONARY_EN: Record<string, string> = {
  oui: "yes",
  Oui: "Yes",
  non: "no",
  Non: "No",
  pot: "Container",
  Pot: "container",
  et: "and",
  "Biopsies prostatiques transrectales écho-guidées":
    "Transrectal prostate needle biopsies",
  Dermatologie: "Dermatology",
};

export const translate = (value: string, language: Language) => {
  // FR (default)
  if (language === DEFAULT_LANGUAGE) {
    return value;
  }

  // EN
  const translation = DICTIONARY_EN[value];
  if (!translation) {
    throw new Error(`Missing EN translation for: ${value}`);
  }

  return translation;
};
