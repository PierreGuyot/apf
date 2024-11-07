export const LANGUAGES = ["FR", "EN"] as const;

export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE = "FR" satisfies Language;

// TODO clean: have a refactoring pass on internationalization

export const COLON_CHARACTER = " :";

export const DICTIONARY_EN: Record<string, string> = {
  // Special characters

  [COLON_CHARACTER]: ":",

  // Clean

  "Absence de traitement antérieur": "No presurgical therapy",
  "Adénocarcinome acinaire à cellules indépendantes":
    "Acinar adenocarcinoma, signet-ring-like cell",
  "Adénocarcinome acinaire à cellules pléomorphes":
    "Acinar adenocarcinoma, pleomorphic giant cell",
  "Adénocarcinome acinaire de type néoplasie intra-épithéliale":
    "Acinar adenocarcinoma, prostatic intraepithelial neoplasia-like",
  "Adénocarcinome acinaire de type prostatique":
    "Acinar adenocarcinoma, conventional (usual)",
  "Adénocarcinome acinaire sarcomatoïde": "Acinar adenocarcinoma, sarcomatoid",
  "Adénocarcinome avec différenciation neuroendocrine":
    "Adenocarcinoma with neuroendocrine differentiation",
  "Adénocarcinome ductal": "Ductal adenocarcinoma",
  "Adénomyome prostatique et inflammation granulomateuse":
    "Prostate adenomyoma and granulomatous inflammation",
  "Adénomyome prostatique et inflammation non-spécifique":
    "Prostate adenomyoma and nonspecific inflammation",
  "Adénomyome prostatique": "Prostate adenomyoma",
  "Apex droit": "Right apex",
  "Apex gauche": "Left apex",
  "Applicable en raison de modification histologiques mineures liées à un traitement antérieur (hormonothérapie ou chimiothérapie) ":
    "Applicable due to minor effects linked to presurgical therapy (hormonal therapy or chemotherapy)",
  "Applicable en raison de modifications histologiques mineures liées à un traitement antérieur (radiothérapie) ":
    "Applicable due to minor effects linked to presurgical therapy (radiation therapy)",
  "Atrophie partielle": "Partial atrophy",
  "Autre (précisez)": "Other (specify)",
  "Autres lésions": "Other lesions",
  "Base droite": "Right base",
  "Base gauche": "Left base",
  "Biopsie ciblée": "Targeted biopsy",
  "Biopsie systématique": "Systematic biopsy",
  "Biopsies ciblées": "Targeted biopsies",
  "Biopsies prostatiques transpérinéales écho-guidées":
    "Transperineal prostate needle biopsies",
  "Biopsies prostatiques transrectales écho-guidées":
    "Transrectal prostate needle biopsies",
  "Biopsies systématiques": "Systematic biopsies",
  "Carcinome adénoïde kystique de sous-type basal":
    "Basal cell (adenoid cystic) carcinoma",
  "Carcinome adénosquameux": "Adenosquamous carcinoma",
  "Carcinome épidermoïde": "Squamous cell carcinoma",
  "Carcinome intra-ductal": "Isolated intraductal carcinoma",
  "Carcinome invasif": "Invasive carcinoma",
  "Carcinome neuroendocrine à grandes cellules":
    "Large cell neuroendocrine carcinoma",
  "Carcinome neuroendocrine à petites cellules":
    "Small cell neuroendocrine carcinoma",
  "Conditions pré-existantes": "Pre-existing conditions",
  "Emboles vasculaires ou lymphatiques": "Lymphatic or vascular invasion",
  "Engainements périnerveux": "Perineural Invasion",
  "Enucléation au laser holnium de la prostate":
    "Holmium laser prostatic enucleation of the prostate",
  "Hyperplasie des cellules basales": "Basal cell hyperplasia",
  "Hyperplasie post-atrophique": "Post-atrophic hyperplasia",
  "Inclusion en totalité": "Full inclusion",
  "Latérale droite": "Right lateral",
  "Latérale gauche": "Left lateral",
  "Lésion intra-épithéliale": "Intraepithelial lesion",
  "Lésions tumorales bégnines": "Other benign lesions",
  "Lésions tumorales précancéreuses": "Glandular neoplasms of the prostate",
  "Médiane droite": "Right median",
  "Médiane gauche": "Left median",
  "Milieu droit": "Right mid",
  "Milieu gauche": "Left mid",
  "Néoplasie intra-épithéliale de haut grade":
    "High-grade prostatic intraepithelial neoplasia",
  "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (hormonothérapie ou chimiothérapie) ":
    "Not applicable due to major effects linked to presurgical therapy (hormonal therapy or chemotherapy) ",
  "Non applicable en raison de modifications histologiques majeures liées à un traitement antérieur (radiothérapie) ":
    "Not applicable due to major effects linked to presurgical therapy (radiation therapy) ",
  "non cribriforme": "non cribriform",
  "Non-précisé": "Unspecified",
  "Para-médiane droite": "Right paramedian",
  "Para-médiane gauche": "Left paramedian",
  "Poids des copeaux": "Total chip weight",
  "Prolifération acinaire atypique": "Atypical small acinar proliferation",
  "Remarques particulières": "Other",
  "Renseignements cliniques": "Case summary",
  "Résection transurétrale de prostate": "Transurethral prostatic resection",
  "Résection transurétrale de vessie": "Transurethral bladder resection",
  "Score de Gleason": "Gleason Score",
  "Tissu extra-prostatique": "Periprostatic Fat Invasion",
  "Tumeur neuroendocrine bien différenciée":
    "Well-differentiated neuroendocrine tumor",
  Adénose: "Adenosis",
  ASAP: "ASAP",
  Atrophie: "Atrophy",
  autre: "other",
  Autre: "Other",
  autres: "others",
  Autres: "Others",
  Bénin: "Begnin",
  Biopsies: "Biopsies",
  Bloc: "Block",
  Cible: "Targeted biopsy",
  Cibles: "Targeted biopsies",
  copeau: "chip",
  Dermatologie: "Dermatology",
  Échantillonnage: "Sampling",
  Épidermoïde: "Squamous",
  EPN: "Perineural Invasion",
  et: "and",
  expert: "expert",
  Expert: "Expert",
  Glandulaire: "Glandular",
  HE: "HE", // Hematoxylin and eosin stain
  HES: "HES", // Hematoxylin, eosin and saffron stain
  Immunohistochimie: "Immunohistochemistry",
  Inflammation: "Inflammation",
  IRM: "MRI",
  Localisation: "Location",
  macroscopie: "macroscopy",
  Macroscopie: "Macroscopy",
  microscopie: "microscopy",
  Microscopie: "Microscopy",
  Musculeuse: "Muscularis Propria",
  négatif: "negative",
  Négatif: "Negative",
  négative: "negative",
  Négative: "Negative",
  Neuroendocrine: "Neuroendocrine",
  Nombre: "Count",
  non: "no",
  Non: "No",
  Numéro: "Number",
  oui: "yes",
  Oui: "Yes",
  PINGH: "PINHG",
  positif: "positive",
  Positif: "Positive",
  positive: "positive",
  Positive: "Positive",
  PSA: "PSA", // Prostate Specific Antigen
  Sextant: "Systematic biopsy",
  standard: "standard",
  Standard: "Standard",
  Taille: "Size",
  TEP: "Periprostatic Fat Invasion",
  Total: "Total",
  Tumeur: "Tumor",
  Tumeurs: "Tumors",
  Type: "Type",

  // Missing translations

  "Adénocarcinome à cellules claires": "TODO",
  "Adénocarcinome à cellules indépendante ": "TODO",
  "Adénocarcinome de type digestif": "TODO",
  "Adénocarcinome in situ (pas de carcinome invasif identifié)": "TODO",
  "Adénocarcinome mixte": "TODO",
  "Adénocarcinome mucineux": "TODO",
  "Adénocarcinome, NOS": "TODO",
  "Artéfact de cautérisation": "TODO",
  "Aspect cystoscopique de la lésion actuelle": "TODO",
  "Autres résultats": "TODO",
  "Bas grade": "TODO",
  "BCG thérapie": "TODO",
  Bilharziose: "TODO",
  "Calice rénal": "TODO",
  "Carcinome endométrioïde": "TODO",
  "Carcinome épidermoïde in situ (pas de carcinome invasif identifié)": "TODO",
  "Carcinome urothélial à cellules claires (riche en glycogène)": "TODO",
  "Carcinome urothélial à cellules géantes": "TODO",
  "Carcinome urothélial à différenciation glandulaire": "TODO",
  "Carcinome urothélial à différenciation malpighienne ": "TODO",
  "Carcinome urothélial à différenciation müllérienne ": "TODO",
  "Carcinome urothélial avec différenciation trophoblastique": "TODO",
  "Carcinome urothélial conventionnel": "TODO",
  "Carcinome urothélial de type plasmacytoïde": "TODO",
  "Carcinome urothélial en nid": "TODO",
  "Carcinome urothélial in situ (préciser focal / multifocal)": "TODO",
  "Carcinome urothélial in situ": "TODO",
  "Carcinome urothélial invasif (conventionnel)": "TODO",
  "Carcinome urothélial micropapillaire": "TODO",
  "Carcinome urothélial papillaire, non invasif": "TODO",
  "Carcinome urothélial peu différencié": "TODO",
  "Carcinome urothélial riche en lipides": "TODO",
  "Carcinome urothélial sarcomatoïde": "TODO",
  "Carcinome urothélial, de type lymphoépithélial": "TODO",
  "Carcinome urothélial, tubulaire et microkystique": "TODO",
  "Carcinome verruqueux": "TODO",
  "Changements liés à la thérapie": "TODO",
  Commentaire: "TODO",
  "Copeaux de résection présentant de la musculeuse": "TODO",
  "Cystite cystique et glandulaire": "TODO",
  Dôme: "TODO",
  "Droit (préciser tiers proximal, médian, distal)": "TODO",
  Droit: "TODO",
  Gauche: "TODO",
  "Dysplasie urothéliale": "TODO",
  "G1 (bien différencié)": "TODO",
  "G2 (modérément différencié)": "TODO",
  "G3 (peu différencié)": "TODO",
  "Gauche (préciser tiers proximal, médian, distal)": "TODO",
  "Grade tumoral": "TODO",
  "Haut grade": "TODO",
  "Impossible à déterminer": "TODO",
  "Inflammation / changements régénératifs": "TODO",
  "invasion de l'urètre, les canaux ou des acini prostatiques sans invasion stromale.":
    "TODO",
  "invasion de la musculeuse.": "TODO",
  "invasion du chorion avec dépassement de la musculaire muqueuse.": "TODO",
  "invasion du chorion sans autre précision.": "TODO",
  "invasion du chorion sans dépassement de la musculaire muqueuse.": "TODO",
  "invasion du stroma prostatique.": "TODO",
  "invasion du tissu conjonctif sous-épithélial prostatique.": "TODO",
  Malpighien: "TODO",
  "Métaplasie intestinale": "TODO",
  "Métaplasie malpighienne kératinisante": "TODO",
  Mullérien: "TODO",
  "Néoplasme urothélial papillaire à faible potentiel de malignité": "TODO",
  "Nombre de copeaux": "TODO",
  "Non-tumoraux": "TODO",
  Normal: "TODO",
  Papillaire: "TODO",
  "Papillome urothélial, type inversé": "TODO",
  "Papillome urothélial": "TODO",
  "Paroi antérieure": "TODO",
  "Paroi latérale droite": "TODO",
  "Paroi latérale gauche": "TODO",
  "Paroi postérieure": "TODO",
  "Plage érythémateuse": "TODO",
  Polypoïde: "TODO",
  "Sous-type histologique de la tumeur": "TODO",
  Trigone: "TODO",
  Tumoraux: "TODO",
  "Type histologique de la tumeur": "TODO",
  Uretère: "TODO",
  "Urètre antérieur": "TODO",
  "Urètre postérieur": "TODO",
  "Urètre bulbomembraneux": "TODO",
  "Urètre féminin": "TODO",
  "Urètre masculin": "TODO",
  "Urètre pénien": "TODO",
  "Urètre prostatique": "TODO",
  Vessie: "TODO",

  // Translations to review

  // FIXME: confirm sample versus container
  Pots: "Containers",
  pot: "container",
  Pot: "container",

  // FIXME: should these two items be merged?
  "Estimation de la surface envahie": "Tumor quantification",
  "Extension tumorale": "TODO",

  // FIXME: should these two items be merged?
  "Antécédents de maladie des voies urinaires ou de métastases à distance":
    "TODO",
  "Traitements antérieurs": "TODO",
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
