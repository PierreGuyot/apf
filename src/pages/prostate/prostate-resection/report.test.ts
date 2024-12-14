import { aMockBlock1 } from "../../../common/fixtures";
import { ReportParams, generateReport } from "./report";

const ihc = {
  hasIhc: true,
  blocks: [aMockBlock1()],
};

const MOCK_DATA_WITHOUT_TUMOR: ReportParams = {
  formId: "prostate-transurethral-resection",
  caseSummary: "MOCK-clinical-info",
  chipWeight: 10,
  blockCount: 5,
  coloration: "HES",
  samplingType: "full",
  mainLesionType: "prostate-adenomyoma",
  tumorType: "acinar-adenocarcinoma-conventional",
  previousTreatments: [],
  histologicalGradeApplicability: "applicable",
  histologicalGrade: {
    a: 3,
    b: 3,
    percentage: 95,
    cribriformPercentage: 0,
  },
  tumorQuantification: ">5%",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherLesions: ["prostate-adenomyoma", "ASAP"],
  ihc,
};

const MOCK_DATA_WITH_TUMOR: ReportParams = {
  formId: "prostate-transurethral-resection",
  caseSummary: "MOCK-clinical-info",
  chipWeight: 10,
  blockCount: 5,
  coloration: "HES",
  samplingType: "full",
  mainLesionType: "tumor",
  tumorType: "acinar-adenocarcinoma-conventional",
  previousTreatments: [],
  histologicalGradeApplicability: "applicable",
  histologicalGrade: {
    a: 4,
    b: 4,
    percentage: 95,
    cribriformPercentage: 20,
  },
  tumorQuantification: "5%",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherLesions: ["prostate-adenomyoma", "ASAP"],
  ihc,
};

describe("generateReport", () => {
  it("should generate a clean report without a tumor (FR)", () => {
    expect(generateReport(MOCK_DATA_WITHOUT_TUMOR, "FR")).toEqual(
      `RÉSECTION TRANSURÉTRALE DE PROSTATE

Renseignements cliniques :
    Traitements antérieurs : absence de traitement antérieur
    Autres renseignements cliniques :
        MOCK-clinical-info

Poids des copeaux : 10g
Inclusion en totalité en 5 blocs (fixation : formol tamponné 4%, coloration HES)

Immunohistochimie :
    P504S/P63 (clone M-13H4) : carcinome invasif
    other_1 (clone clone_1) : bénin
    other_2 (clone clone_2) : malin

On observe des glandes prostatiques nombreuses souvent groupées en nodules, au sein d'un stroma prostatique musculaire lisse. Absence de foyer carcinomateux.

Autres lésions :
     - Prolifération acinaire atypique
     - Adénomyome prostatique`,
    );
  });

  it("should generate a clean report with a tumor (FR)", () => {
    expect(generateReport(MOCK_DATA_WITH_TUMOR, "FR")).toEqual(
      `RÉSECTION TRANSURÉTRALE DE PROSTATE

Renseignements cliniques :
    Traitements antérieurs : absence de traitement antérieur
    Autres renseignements cliniques :
        MOCK-clinical-info

Poids des copeaux : 10g
Inclusion en totalité en 5 blocs (fixation : formol tamponné 4%, coloration HES)

Immunohistochimie :
    P504S/P63 (clone M-13H4) : carcinome invasif
    other_1 (clone clone_1) : bénin
    other_2 (clone clone_2) : malin

Adénocarcinome acinaire de type prostatique.

Score de Gleason : 8 (4 + 4) avec 100% de score 4 dont 20% de cribriforme, soit un score ISUP de 4.
Estimation de la surface envahie : 5%
Invasion lymphatique ou vasculaire : non
Engainements périnerveux : non

Autres lésions :
     - Prolifération acinaire atypique
     - Adénomyome prostatique`,
    );
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect(generateReport(MOCK_DATA_WITHOUT_TUMOR, "EN")).toEqual(
      `TRANSURETHRAL PROSTATIC RESECTION

Case summary:
    Previous treatments: no previous treatments
    Other clinical info:
        MOCK-clinical-info

Total chip weight: 10g
Full inclusion in 5 blocks (fixation : buffered formalin 4%, stain HES)

Immunohistochemistry:
    P504S/P63 (clone M-13H4): invasive carcinoma
    other_1 (clone clone_1): benign
    other_2 (clone clone_2): malignant

Numerous prostate glands, often grouped into nodules, are found within a smooth muscular prostatic stroma. No carcinomatous focus.

Other lesions:
     - Atypical small acinar proliferation
     - Prostate adenomyoma`,
    );
  });

  it("should generate a clean report with a tumor (EN)", () => {
    expect(generateReport(MOCK_DATA_WITH_TUMOR, "EN")).toEqual(
      `TRANSURETHRAL PROSTATIC RESECTION

Case summary:
    Previous treatments: no previous treatments
    Other clinical info:
        MOCK-clinical-info

Total chip weight: 10g
Full inclusion in 5 blocks (fixation : buffered formalin 4%, stain HES)

Immunohistochemistry:
    P504S/P63 (clone M-13H4): invasive carcinoma
    other_1 (clone clone_1): benign
    other_2 (clone clone_2): malignant

Acinar adenocarcinoma, conventional (usual).

Gleason Score: 8 (4 + 4) with 100% of score 4 of which 20% cribriform, i.e. an ISUP score of 4.
Tumor quantification: 5%
Lymphatic or vascular invasion: no
Perineural Invasion: no

Other lesions:
     - Atypical small acinar proliferation
     - Prostate adenomyoma`,
    );
  });
});
