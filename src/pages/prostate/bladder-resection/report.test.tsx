import { render } from "@testing-library/react";
import { Report, ReportParams } from "./report";

// TODO: handle translation

const MOCK_DATA: ReportParams = {
  clinicalInfo: "MOCK_CLINICAL_INFO",
  medicalHistory: true,
  previousTumor: {
    type: "other",
    typeOther: "mock_subtype",
    carcinomaComposition: { Conventionnel: 100 },
    grade: "",
    extension: "pT1",
  },
  location: { location: "Urètre masculin", sublocation: "Urètre pénien" },
  previousTreatments: ["Résection transurétrale de vessie"],
  lesionAspect: "Polypoïde",
  otherLesionAspect: "",
  chipWeight: 2,
  samplingType: "partial",
  blockCount: 2,
  coloration: "HE",
  tumor: {
    type: "Carcinome épidermoïde",
    typeOther: "",
    carcinomaComposition: { Conventionnel: 100 },
    grade: "g1",
    extension: "pT3b",
  },
  hasLymphaticOrVascularInvasion: true,
  muscularisPropria: {
    isPresent: true,
    chipCount: 10,
    invadedChipCount: 2,
    notes: "",
  },
  otherResults: {
    tumoral: [
      "Papillome urothélial, type inversé",
      "Néoplasme urothélial papillaire à faible potentiel de malignité",
    ],
    nonTumoral: ["Métaplasie intestinale", "Bilharziose"],
  },
  ihc: {
    hasIhc: false,
    blocks: [],
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
    Type histologique de la tumeur : carcinome épidermoïde
    Grade tumoral : g1 (bien différencié)
    Extension tumorale : pT3b

    Invasion lymphatique ou vasculaire : oui

    Copeaux de résection présentant de la musculeuse : oui
    Nombre de copeaux : 10

    Autres résultats :
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
    TODO: squamous cell carcinoma
    TODO: tODO
    TODO: pT3b

    Lymphatic or vascular invasion: yes

    TODO: yes
    TODO: 10

    TODO:
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
Type histologique de la tumeur : mock_subtype
Localisation : urètre masculin
Traitements antérieurs :
     - Résection transurétrale de vessie
Aspect cystoscopique de la lésion actuelle : polypoïde

Macroscopie :
    Poids des copeaux : 2g
    Échantillonnage en 2 blocs (fixation : formol tamponné 4%, coloration HE)

Microscopie :
    Type histologique de la tumeur : carcinome épidermoïde
    Grade tumoral : g1 (bien différencié)
    Extension tumorale : pT3b

    Invasion lymphatique ou vasculaire : oui

    Copeaux de résection présentant de la musculeuse : oui
    Nombre de copeaux : 10

    Autres résultats :
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
TODO: mock_subtype
Location: tODO
Previous treatments:
     - Transurethral bladder resection
TODO: tODO

Macroscopy:
    Total chip weight: 2g
    Sampling in 2 blocks (fixation : buffered formalin 4%, stain HE)

Microscopy:
    TODO: squamous cell carcinoma
    TODO: tODO
    TODO: pT3b

    Lymphatic or vascular invasion: yes

    TODO: yes
    TODO: 10

    TODO:
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
