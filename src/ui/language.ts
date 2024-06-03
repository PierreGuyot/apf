export type Language = "FR" | "EN";
export const DEFAULT_LANGUAGE = "FR" satisfies Language;

const DICTIONARY_EN: Record<string, string> = {
  // General
  Biopsies: "Biopsies",
  et: "and",
  Localisation: "Location",
  Nombre: "Count",
  non: "no",
  Non: "No",
  Numéro: "Number",
  oui: "yes",
  Oui: "Yes",
  "Remarques particulières": "Other",
  "Renseignements cliniques": "Case summary",
  Taille: "Size",
  Tumeurs: "Tumors",
  Type: "Type",

  // Prostate biopsy
  "Biopsies prostatiques transrectales écho-guidées":
    "Transrectal prostate needle biopsies",

  pot: "Container", // TODO with Louis: confirm sample versus container
  Pot: "container", // TODO with Louis: confirm sample versus container
  Sextant: "Systematic biopsy",
  Cible: "Targeted biopsy",
  Cibles: "Targeted biopsies",

  Pots: "Containers", // TODO with Louis: confirm sample versus container
  "Autres lésions": "Other lesions",
  "Score de Gleason": "Gleason Score",

  // TODO with Louis: re-check wording for these 4 items
  "Envahissement périneural": "Perineural Invasion",
  "Tissu extra-prostatique": "Periprostatic Fat Invasion",
  EPN: "Perineural Invasion",
  TEP: "Periprostatic Fat Invasion",

  "Base droite": "Right base",
  "Milieu droit": "Right mid",
  "Apex droit": "Right apex",
  "Base gauche": "Left base",
  "Milieu gauche": "Left mid",
  "Apex gauche": "Left apex",

  "Lésions tumorales précancéreuses": "Glandular neoplasms of the prostate",

  "Carcinome intra-ductal": "Isolated intraductal carcinoma",
  // TODO with Louis: confirm PINGH vs PIN and English vs French (seems to be PIN/HGPIN in English)
  "Néoplasie intra-épithéliale de haut grade":
    "High-grade prostatic intraepithelial neoplasia",
  PINGH: "PINHG",
  "Prolifération acinaire atypique": "Atypical small acinar proliferation",
  ASAP: "ASAP",

  "Lésions tumorales bégnines": "Other benign lesions",

  "Adénomyome prostatique": "Prostate adenomyoma",
  Adénose: "Adenosis",
  Atrophie: "Atrophy",
  "Atrophie partielle": "Partial atrophy",
  "Hyperplasie des cellules basales": "Basal cell hyperplasia",
  "Hyperplasie post-atrophique": "Post-atrophic hyperplasia",
  Inflammation: "Inflammation",

  Glandulaire: "Glandular",

  "Adénocarcinome acinaire de type prostatique":
    "Acinar adenocarcinoma, conventional (usual)",
  "Adénocarcinome acinaire à cellules indépendantes":
    "Acinar adenocarcinoma, signet-ring-like cell",
  "Adénocarcinome acinaire à cellules pléomorphes":
    "Acinar adenocarcinoma, pleomorphic giant cell",
  "Adénocarcinome acinaire sarcomatoïde": "Acinar adenocarcinoma, sarcomatoid",
  "Adénocarcinome acinaire de type néoplasie intra-épithéliale":
    "Acinar adenocarcinoma, prostatic intraepithelial neoplasia-like",
  "Adénocarcinome ductal": "Ductal adenocarcinoma",

  Épidermoïde: "Squamous",

  "Carcinome adénosquameux": "Adenosquamous carcinoma",
  "Carcinome épidermoïde": "Squamous cell carcinoma",
  "Carcinome adénoïde kystique de sous-type basal":
    "Basal cell (adenoid cystic) carcinoma",

  Neuroendocrine: "Neuroendocrine",

  "Adénocarcinome avec différenciation neuroendocrine":
    "Adenocarcinoma with neuroendocrine differentiation",
  "Tumeur neuroendocrine bien différenciée":
    "Well-differentiated neuroendocrine tumor",
  "Carcinome neuroendocrine à petites cellules":
    "Small cell neuroendocrine carcinoma",
  "Carcinome neuroendocrine à grandes cellules":
    "Large cell neuroendocrine carcinoma",

  "non cribriforme": "non cribriform",

  // TODO with Louis: confirm PSA vs APS
  PSA: "PSA", // Prostate Specific Antigen
  IRM: "MRI",

  // Dermatology
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
    return value;
  }

  return translation;
};
