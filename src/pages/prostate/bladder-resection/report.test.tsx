import { render } from "@testing-library/react";
import { Report, ReportParams } from "./report";

// TODO: handle translation

const MOCK_DATA: ReportParams = {
  clinicalInfo: "MOCK_CLINICAL_INFO",
  medicalHistory: "yes",
  previousTumorType: {
    type: "other",
    subtype: "Adénocarcinome de type digestif",
    otherSubtype: "mock_subtype",
    grade: "high-grade",
    extension: {},
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
  tumor: {
    type: "Malpighien",
    subtype: "Carcinome urothélial conventionnel",
    otherSubtype: "",
    grade: "high-grade",
    extension: {
      pT1a: 10,
      pT1b: 80,
      other: 10,
    },
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

const SAMPLE_STANDARD_MODE_FR = `RÉSECTION TRANSURÉTRALE DE VESSIE

Renseignements cliniques :
    MOCK_CLINICAL_INFO

Macroscopie :
    Poids des copeaux : 2g
    Échantillonnage en 2 blocs (fixation : formol tamponné 4%, coloration HE)

Microscopie :
    Type histologique de la tumeur : malpighien
    Sous-type histologique de la tumeur : carcinome urothélial conventionnel
    Grade tumoral : haut grade
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
    MOCK_COMMENTS`;

const SAMPLE_STANDARD_MODE_EN = `TRANSURETHRAL BLADDER RESECTION

Case summary:
    MOCK_CLINICAL_INFO

Macroscopy:
    Total chip weight: 2g
    Sampling in 2 blocks (fixation : buffered formalin 4%, stain HE)

Microscopy:
    TODO: tODO
    TODO: tODO
    TODO: tODO
    TODO:
         - pT1a: 10%
         - pT1b: 80%
         - TODO: 10%

    Lymphatic or vascular invasion: yes

    TODO: yes
    TODO: 10

    TODO
        TODO:
             - TODO
             - TODO
        TODO:
             - TODO
             - TODO

Other:
    MOCK_COMMENTS`;

const SAMPLE_EXPERT_MODE_FR = `RÉSECTION TRANSURÉTRALE DE VESSIE

Antécédents de maladie des voies urinaires ou de métastases à distance : oui
Type histologique de la tumeur : other
Sous-type histologique de la tumeur : mock_subtype
Localisation : urètre masculin
Traitements antérieurs : oui (résection transurétrale de vessie)
Aspect cystoscopique de la lésion actuelle : polypoïde

Macroscopie :
    Poids des copeaux : 2g
    Échantillonnage en 2 blocs (fixation : formol tamponné 4%, coloration HE)

Microscopie :
    Type histologique de la tumeur : malpighien
    Sous-type histologique de la tumeur : carcinome urothélial conventionnel
    Grade tumoral : haut grade
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
    MOCK_COMMENTS`;

const SAMPLE_EXPERT_MODE_EN = `TRANSURETHRAL BLADDER RESECTION

TODO: yes
TODO: other
TODO: mock_subtype
Location: tODO
TODO: yes (transurethral bladder resection)
TODO: tODO

Macroscopy:
    Total chip weight: 2g
    Sampling in 2 blocks (fixation : buffered formalin 4%, stain HE)

Microscopy:
    TODO: tODO
    TODO: tODO
    TODO: tODO
    TODO:
         - pT1a: 10%
         - pT1b: 80%
         - TODO: 10%

    Lymphatic or vascular invasion: yes

    TODO: yes
    TODO: 10

    TODO
        TODO:
             - TODO
             - TODO
        TODO:
             - TODO
             - TODO

Other:
    MOCK_COMMENTS`;

describe("generateReport", () => {
  it("should generate a clean report in standard mode (FR)", () => {
    const { container } = render(
      <Report form={MOCK_DATA} language={"FR"} isExpertMode={false} />,
    );
    expect(container.textContent).toEqual(SAMPLE_STANDARD_MODE_FR);
  });

  it("should generate a clean report in standard mode (EN)", () => {
    const { container } = render(
      <Report form={MOCK_DATA} language={"EN"} isExpertMode={false} />,
    );
    expect(container.textContent).toEqual(SAMPLE_STANDARD_MODE_EN);
  });

  it("should generate a clean report in expert mode (FR)", () => {
    const { container } = render(
      <Report form={MOCK_DATA} language={"FR"} isExpertMode={true} />,
    );
    expect(container.textContent).toEqual(SAMPLE_EXPERT_MODE_FR);
  });

  it("should generate a clean report in expert mode (EN)", () => {
    const { container } = render(
      <Report form={MOCK_DATA} language={"EN"} isExpertMode={true} />,
    );
    expect(container.textContent).toEqual(SAMPLE_EXPERT_MODE_EN);
  });
});
