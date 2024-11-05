import { generateReport, ReportParams } from "./report";

const MOCK_DATA: ReportParams = {
  clinicalInfo: "MOCK_CLINICAL_INFO",
  medicalHistory: "yes",
  previousTumorType: {
    type: "other",
    subtype: "Adénocarcinome de type digestif",
    otherSubtype: "mock_subtype",
  },
  location: { location: "Urètre masculin", sublocation: "Urètre pénien" },
  hadPreviousTreatment: "yes",
  previousTreatment: "Résection transurétrale de vessie",
  lesionAspect: "Polypoïde",
  otherLesionAspect: "",
  chipWeight: 2,
  samplingType: "partial",
  blockCount: 2,
  coloration: "HE",
  tumorType: {
    type: "Malpighien",
    subtype: "Carcinome urothélial conventionnel",
    otherSubtype: "",
  },
  grade: "g1",
  tumoralExtension: {
    pT1a: { isChecked: true, percentage: 10 },
    pT1b: { isChecked: true, percentage: 80 },
    other: { isChecked: false, percentage: 10 },
  },
  hasLymphaticOrVascularInvasion: true,
  muscularisPropria: { isPresent: "yes", chipCount: 10, notes: "" },
  otherResults: {
    tumoral: [
      "Papillome urothélial, type inversé",
      "Néoplasme urothélial papillaire à faible potentiel de malignité",
    ],
    nonTumoral: ["Métaplasie intestinale", "Bilharziose"],
  },
  comments: "MOCK_COMMENTS",
  formId: "bladder-transurethral-resection",
};

// TODO: handle translation

describe("generateReport", () => {
  it("should generate a clean report in standard mode (FR)", () => {
    expect(generateReport(MOCK_DATA, "FR", false))
      .toEqual(`RÉSECTION TRANSURÉTRALE DE VESSIE

Renseignements cliniques :
    MOCK_CLINICAL_INFO

Macroscopie :
    Poids des copeaux : 2g
    Échantillonnage en 2 blocs (fixation : formol tamponné 4%, coloration HE)

Microscopie :
    Type histologique de la tumeur : malpighien
    Sous-type histologique de la tumeur : carcinome urothélial conventionnel
    Grade tumoral : g1 (bien différencié)
    Extension tumorale :
         - pT1a : 10%
         - pT1b : 80%
         - Impossible à déterminer : 10%

    Emboles vasculaires ou lymphatiques : oui

    Copeaux de résection présentant de la musculeuse : oui
    Nombre de copeaux : 10

    Autres résultats
        Tumoraux :
             - Papillome urothélial, type inversé
             - Néoplasme urothélial papillaire à faible potentiel de malignité
        Non-tumoraux :
             - Métaplasie intestinale
             - Bilharziose

Remarques particulières :
    MOCK_COMMENTS`);
  });

  it("should generate a clean report in standard mode (EN)", () => {
    expect(generateReport(MOCK_DATA, "EN", false))
      .toEqual(`TRANSURETHRAL BLADDER RESECTION

Case summary:
    MOCK_CLINICAL_INFO

Macroscopy:
    Total chip weight: 2g
    Sampling in 2 blocks (fixation : buffered formalin 4%, stain HE)

Microscopy:
    Type histologique de la tumeur: malpighien
    Sous-type histologique de la tumeur: carcinome urothélial conventionnel
    Grade tumoral: g1 (bien différencié)
    Extension tumorale:
         - pT1a: 10%
         - pT1b: 80%
         - Impossible à déterminer: 10%

    Lympathic or vascular invasion: yes

    Copeaux de résection présentant de la musculeuse: yes
    Nombre de copeaux: 10

    Autres résultats
        Tumoraux:
             - Papillome urothélial, type inversé
             - Néoplasme urothélial papillaire à faible potentiel de malignité
        Non-tumoraux:
             - Métaplasie intestinale
             - Bilharziose

Other:
    MOCK_COMMENTS`);
  });

  it("should generate a clean report in expert mode (FR)", () => {
    expect(generateReport(MOCK_DATA, "FR", true))
      .toEqual(`RÉSECTION TRANSURÉTRALE DE VESSIE

Antécédents de maladie des voies urinaires ou de métastases à distance : oui
Type histologique de la tumeur : other
Sous-type histologique de la tumeur : mock_subtype
Localisation : urètre masculin
Traitements antérieurs : oui (Résection transurétrale de vessie)
Aspect cystoscopique de la lésion actuelle : polypoïde

Macroscopie :
    Poids des copeaux : 2g
    Échantillonnage en 2 blocs (fixation : formol tamponné 4%, coloration HE)

Microscopie :
    Type histologique de la tumeur : malpighien
    Sous-type histologique de la tumeur : carcinome urothélial conventionnel
    Grade tumoral : g1 (bien différencié)
    Extension tumorale :
         - pT1a : 10%
         - pT1b : 80%
         - Impossible à déterminer : 10%

    Emboles vasculaires ou lymphatiques : oui

    Copeaux de résection présentant de la musculeuse : oui
    Nombre de copeaux : 10

    Autres résultats
        Tumoraux :
             - Papillome urothélial, type inversé
             - Néoplasme urothélial papillaire à faible potentiel de malignité
        Non-tumoraux :
             - Métaplasie intestinale
             - Bilharziose

Remarques particulières :
    MOCK_COMMENTS`);
  });

  it.only("should generate a clean report in expert mode (EN)", () => {
    expect(generateReport(MOCK_DATA, "EN", true))
      .toEqual(`TRANSURETHRAL BLADDER RESECTION

Antécédents de maladie des voies urinaires ou de métastases à distance: yes
Type histologique de la tumeur: other
Sous-type histologique de la tumeur: mock_subtype
Location: urètre masculin
Traitements antérieurs: yes (résection transurétrale de vessie)
Aspect cystoscopique de la lésion actuelle: polypoïde

Macroscopy:
    Total chip weight: 2g
    Sampling in 2 blocks (fixation : buffered formalin 4%, stain HE)

Microscopy:
    Type histologique de la tumeur: malpighien
    Sous-type histologique de la tumeur: carcinome urothélial conventionnel
    Grade tumoral: g1 (bien différencié)
    Extension tumorale:
         - pT1a: 10%
         - pT1b: 80%
         - Impossible à déterminer: 10%

    Lympathic or vascular invasion: yes

    Copeaux de résection présentant de la musculeuse: yes
    Nombre de copeaux: 10

    Autres résultats
        Tumoraux:
             - Papillome urothélial, type inversé
             - Néoplasme urothélial papillaire à faible potentiel de malignité
        Non-tumoraux:
             - Métaplasie intestinale
             - Bilharziose

Other:
    MOCK_COMMENTS`);
  });
});
