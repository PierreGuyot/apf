export const LANGUAGES = ["FR", "EN"] as const;

export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE = "FR" satisfies Language;

// TODO clean: have a refactoring pass on internationalization

export const COLON_CHARACTER = " :";

export const DICTIONARY_EN: Record<string, string> = {
  // Special characters
  [COLON_CHARACTER]: ":",

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
  Tumeur: "Tumor",
  Tumeurs: "Tumors",
  Type: "Type",
  copeau: "chip",
  Macroscopie: "Macroscopy",
  macroscopie: "macroscopy",
  Microscopie: "Microscopy",
  microscopie: "microscopy",
  Autre: "Other",
  Autres: "Others",
  autre: "other",
  autres: "others",
  Positive: "Positive",
  positive: "positive",
  Positif: "Positive",
  positif: "positive",
  Négative: "Negative",
  négative: "negative",
  Négatif: "Negative",
  négatif: "negative",
  standard: "standard",
  Standard: "Standard",
  expert: "expert",
  Expert: "Expert",

  // Specialized
  "Biopsies prostatiques transrectales écho-guidées":
    "Transrectal prostate needle biopsies",
  "Biopsies prostatiques transpérinéales écho-guidées":
    "Transperineal prostate needle biopsies",
  "Résection transurétrale de prostate": "Transurethral Prostatic Resection",
  "Enucléation au laser holnium de la prostate":
    "Holmium laser prostatic enucleation of the prostate",
  Sextant: "Systematic biopsy",
  Cible: "Targeted biopsy",
  Cibles: "Targeted biopsies",
  "Biopsie systématique": "Systematic biopsy",
  "Biopsie ciblée": "Targeted biopsy",
  "Autres lésions": "Other lesions",
  "Score de Gleason": "Gleason Score",
  "Base droite": "Right base",
  "Milieu droit": "Right mid",
  "Apex droit": "Right apex",
  "Base gauche": "Left base",
  "Milieu gauche": "Left mid",
  "Apex gauche": "Left apex",
  "Latérale droite": "Right lateral",
  "Para-médiane droite": "Right paramedian",
  "Médiane droite": "Right median",
  "Latérale gauche": "Left lateral",
  "Para-médiane gauche": "Left paramedian",
  "Médiane gauche": "Left median",
  "Lésions tumorales précancéreuses": "Glandular neoplasms of the prostate",
  "Carcinome intra-ductal": "Isolated intraductal carcinoma",
  "Prolifération acinaire atypique": "Atypical small acinar proliferation",
  ASAP: "ASAP",
  "Lésions tumorales bégnines": "Other benign lesions",
  "Adénomyome prostatique": "Prostate adenomyoma",
  "Adénomyome prostatique et inflammation granulomateuse":
    "Prostate adenomyoma and granulomatous inflammation",
  "Adénomyome prostatique et inflammation non-spécifique":
    "Prostate adenomyoma and nonspecific inflammation",
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
  IRM: "MRI",
  "Inclusion en totalité": "Full inclusion",
  Échantillonnage: "Sampling",
  "Absence de traitement antérieur": "No presurgical therapy",
  "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (radiothérapie) ":
    "Not applicable due to major effects linked to presurgical therapy (radiation therapy) ",
  "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (hormonothérapie ou chimiothérapie) ":
    "Not applicable due to major effects linked to presurgical therapy (hormonal therapy or chemotherapy) ",
  "Applicable en raison de modifications histologiques mineures liées à un traitement antérieur (radiothérapie) ":
    "Applicable due to minor effects linked to presurgical therapy (radiation therapy)",
  "Applicable en raison de modification histologiques mineures liées à un traitement antérieur (hormonothérapie ou chimiothérapie) ":
    "Applicable due to minor effects linked to presurgical therapy (hormonal therapy or chemotherapy)",
  HE: "HE", // Hematoxylin and eosin stain
  HES: "HES", // Hematoxylin, eosin and saffron stain
  "Conditions pré-existantes": "Pre-existing conditions",
  "Estimation de la surface envahie": "Tumor quantification",
  "Emboles vasculaires ou lymphatiques": "Lympathic or vascular invasion",
  "Engainements périnerveux": "Perineural Invasion",
  "Poids des copeaux": "Total chip weight",
  Dermatologie: "Dermatology",
  Bénin: "Begnin",
  "Lésion intra-épithéliale": "Intraepithelial lesion",
  "Carcinome invasif": "Invasive carcinoma",
  Immunohistochimie: "Immunohistochemistry",
  PSA: "PSA", // Prostate Specific Antigen
  "Biopsies ciblées": "Targeted biopsies",
  "Biopsies systématiques": "Systematic biopsies",
  Total: "Total",

  // Tranlations to review

  Bloc: "Block",
  "Néoplasie intra-épithéliale de haut grade":
    "High-grade prostatic intraepithelial neoplasia",
  PINGH: "PINHG",
  "Tissu extra-prostatique": "Periprostatic Fat Invasion",
  EPN: "Perineural Invasion",
  TEP: "Periprostatic Fat Invasion",
  // FIXME: confirm sample versus container
  Pots: "Containers",
  pot: "container",
  Pot: "container",
};

const IS_DEBUG = false;
const DICTIONARIES_PER_LANGUAGE = {
  EN: DICTIONARY_EN,
} as const;

export const translate = (value: string, language: Language) => {
  // FR (default)
  if (language === DEFAULT_LANGUAGE) {
    return value;
  }

  // EN
  const dictionary = DICTIONARIES_PER_LANGUAGE[language];
  const translation = dictionary[value];

  // Translation is missing
  if (!translation) {
    if (IS_DEBUG) {
      throw new Error(`Translation for value '${value}' cannot be found.`);
    }

    return value;
  }

  return translation;
};
