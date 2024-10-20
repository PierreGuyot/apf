import { render } from "@testing-library/react";
import { Report, ReportParams } from "./report";

// TODO clean: test functions to compute scores
// TODO clean: test functions to compute errors

const MOCK_DATA_WITHOUT_TUMOR: ReportParams = {
  formId: "prostate-biopsy-transrectal",
  clinicalInfo: "",
  hasInfo: true,
  hasTarget: true,
  targetCount: 2,
  hasMri: true,
  psaRate: 10,
  containerCount: 9,
  rows: [
    {
      type: "sextant",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 0,
    },
    {
      type: "sextant",
      location: "medium-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 1,
    },
    {
      type: "sextant",
      location: "apex-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 2,
    },
    {
      type: "sextant",
      location: "base-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 3,
    },
    {
      type: "sextant",
      location: "medium-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 4,
    },
    {
      type: "sextant",
      location: "apex-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 5,
    },
    {
      type: "target",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 6,
    },
    {
      type: "target",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 7,
    },
    {
      type: "target",
      location: "apex-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 8,
    },
  ],
  tumorType: "acinar-adenocarcinoma-conventional",
  piradsItems: [
    {
      score: 2,
      location: "base-right",
    },
    {
      score: 3,
      location: "apex-right",
    },
  ],
  ihc: {
    blocks: [],
    hasIhc: false,
  },
  comment: "MOCK-specific-notes",
  score: {
    biopsyCount: 18,
    biopsySize: 36,
    tumorCount: 0,
  },
};
const MOCK_DATA_WITH_TUMOR: ReportParams = {
  formId: "prostate-biopsy-transrectal",
  clinicalInfo: "",
  hasInfo: true,
  hasTarget: true,
  targetCount: 2,
  hasMri: true,
  psaRate: 10,
  containerCount: 9,
  rows: [
    {
      type: "sextant",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 1,
      tumorSize: [2, 0, 0, 0],
      tumorGleason: {
        a: 4,
        b: 5,
        percentage: 95,
        cribriformPercentage: 10,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 0,
    },
    {
      type: "sextant",
      location: "medium-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 1,
      tumorSize: [3, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 4,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 1,
    },
    {
      type: "sextant",
      location: "apex-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 2,
    },
    {
      type: "sextant",
      location: "base-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 3,
    },
    {
      type: "sextant",
      location: "medium-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 4,
    },
    {
      type: "sextant",
      location: "apex-left",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 5,
    },
    {
      type: "target",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 6,
    },
    {
      type: "target",
      location: "base-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 7,
    },
    {
      type: "target",
      location: "apex-right",
      biopsyCount: 2,
      biopsySize: [2, 2, 0, 0],
      tumorCount: 0,
      tumorSize: [0, 0, 0, 0],
      tumorGleason: {
        a: 3,
        b: 3,
        percentage: 95,
        cribriformPercentage: 0,
      },
      tumorEpn: false,
      tumorTep: false,
      otherLesions: [],
      index: 8,
    },
  ],
  tumorType: "acinar-adenocarcinoma-conventional",
  piradsItems: [
    {
      score: 2,
      location: "base-right",
    },
    {
      score: 3,
      location: "apex-right",
    },
  ],
  ihc: {
    blocks: [],
    hasIhc: false,
  },
  comment: "MOCK-specific-notes",
  score: {
    biopsyCount: 18,
    biopsySize: 36,
    tumorCount: 2,
    tumorSize: 5,
    tumorGleason: {
      a: 4,
      b: 5,
      percentage: 95,
      cribriformPercentage: 10,
    },
    tumorEpn: false,
    tumorTep: false,
  },
};

const ihc: ReportParams["ihc"] = {
  hasIhc: true,
  blocks: [
    {
      index: 1,
      antibodies: [
        { type: "P504S/P63", clone: "M-13H4", result: "invasive-carcinoma" },
        {
          type: "others",
          values: [
            { name: "other_1", clone: "clone_1", result: "bénin" },
            { name: "other_2", clone: "clone_2", result: "malin" },
          ],
        },
      ],
    },
    {
      index: 3,
      antibodies: [
        { type: "P63", clone: "M-4A4", result: "begnin" },
        { type: "CK14/CK15", clone: "SP53", result: "intraepithelial-lesion" },
        {
          type: "others",
          values: [{ name: "other_3", clone: "clone_3", result: "bénin" }],
        },
      ],
    },
  ],
};

const SAMPLE_WITHOUT_TUMOR_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :
    PSA: 10 ng.mL⁻¹
    IRM: Oui
    Cibles :
        PIRADS 2, base droite (pots 6 et 7)
        PIRADS 3, apex droit (pot 8)

Remarques particulières :
    MOCK-specific-notes

Absence de foyer tumoral sur l'ensemble des 18 biopsies étudiées (36 mm).
Adénomyome prostatique.`;

const SAMPLE_WITH_TUMOR_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :
    PSA: 10 ng.mL⁻¹
    IRM: Oui
    Cibles :
        PIRADS 2, base droite (pots 6 et 7)
        PIRADS 3, apex droit (pot 8)

Remarques particulières :
    MOCK-specific-notes

Adénocarcinome acinaire de type prostatique.

Il présente un score de Gleason 9 (4 à 95% dont 10% cribriformes + 5 à 5%), soit un score ISUP de 5.
Il est localisé sur 2 des 12 biopsies systématiques (5 mm sur 24 mm examinés, 21%) et sur 0 des 6 biopsies ciblées (0 mm sur 12 mm examinés, 0%).
Il mesure 5 mm sur 36 mm examinés sur la totalité des biopsies examinées.

Engainements périnerveux : Non
Tissu extra-prostatique : Non`;

const SAMPLE_WITHOUT_TUMOR_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:
    PSA: 10 ng.mL⁻¹
    MRI: Yes
    Targeted biopsies:
        PIRADS 2, right base (Containers 6 and 7)
        PIRADS 3, right apex (Container 8)

Other:
    MOCK-specific-notes

No tumor seen among the 18 studied biopsies (36 mm).
Prostate adenomyoma.`;

const SAMPLE_WITH_TUMOR_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:
    PSA: 10 ng.mL⁻¹
    MRI: Yes
    Targeted biopsies:
        PIRADS 2, right base (Containers 6 and 7)
        PIRADS 3, right apex (Container 8)

Other:
    MOCK-specific-notes

Acinar adenocarcinoma, conventional (usual).

It has a Gleason score of 9 (4 à 95% including cribriform 10% + 5 à 5%), i.e. an ISUP score of 5.
It is localized on 2 out of 6 systematic biopsies (5 mm out of 24 mm examined, 21%) and on 0 out of 3 targeted biopsies (0 mm out of 12 mm examined, 0%).
It has a size of 5 mm out of 36 mm examined on all biopsies.

Perineural Invasion : No
Periprostatic Fat Invasion : No`;

const SAMPLE_WITH_IHC_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :
    PSA: 10 ng.mL⁻¹
    IRM: Oui
    Cibles :
        PIRADS 2, base droite (pots 6 et 7)
        PIRADS 3, apex droit (pot 8)

Immunohistochimie :
    Bloc 1 :
        P504S/P63 (clone M-13H4) : carcinome invasif
        Autres :
            other_1 (clone clone_1) : bénin
            other_2 (clone clone_2) : malin

    Bloc 3 :
        P63 (clone M-4A4) : bénin
        CK14/CK15 (clone SP53) : lésion intra-épithéliale
        Autres :
            other_3 (clone clone_3) : bénin

Remarques particulières :
    MOCK-specific-notes

Adénocarcinome acinaire de type prostatique.

Il présente un score de Gleason 9 (4 à 95% dont 10% cribriformes + 5 à 5%), soit un score ISUP de 5.
Il est localisé sur 2 des 12 biopsies systématiques (5 mm sur 24 mm examinés, 21%) et sur 0 des 6 biopsies ciblées (0 mm sur 12 mm examinés, 0%).
Il mesure 5 mm sur 36 mm examinés sur la totalité des biopsies examinées.

Engainements périnerveux : Non
Tissu extra-prostatique : Non`;

const SAMPLE_WITH_IHC_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:
    PSA: 10 ng.mL⁻¹
    MRI: Yes
    Targeted biopsies:
        PIRADS 2, right base (Containers 6 and 7)
        PIRADS 3, right apex (Container 8)

Immunohistochemistry:
    Block 1:
        P504S/P63 (clone M-13H4): invasive carcinoma
        Others:
            other_1 (clone clone_1): bénin
            other_2 (clone clone_2): malin
            
    Block 3:
        P63 (clone M-4A4): begnin
        CK14/CK15 (clone SP53): intraepithelial lesion
        Others:
            other_3 (clone clone_3): bénin

Other:
    MOCK-specific-notes

Acinar adenocarcinoma, conventional (usual).

It has a Gleason score of 9 (4 à 95% including cribriform 10% + 5 à 5%), i.e. an ISUP score of 5.
It is localized on 2 out of 6 systematic biopsies (5 mm out of 24 mm examined, 21%) and on 0 out of 3 targeted biopsies (0 mm out of 12 mm examined, 0%).
It has a size of 5 mm out of 36 mm examined on all biopsies.

Perineural Invasion : No
Periprostatic Fat Invasion : No`;

describe("generateReport", () => {
  it("should generate a clean report without a tumor (FR)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITHOUT_TUMOR}
        language={"FR"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITHOUT_TUMOR_FR);
  });

  it("should generate a clean report with a tumor (FR)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITH_TUMOR}
        language={"FR"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_TUMOR_FR);
  });

  it("should generate a clean report without a tumor (EN)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITHOUT_TUMOR}
        language={"EN"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITHOUT_TUMOR_EN);
  });

  it("should generate a clean report with a tumor (EN)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITH_TUMOR}
        language={"EN"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_TUMOR_EN);
  });

  it("should generate a clean IHC report (FR)", () => {
    const { container } = render(
      <Report
        form={{ ...MOCK_DATA_WITH_TUMOR, ihc }}
        language={"FR"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_IHC_FR);
  });

  it("should generate a clean IHC report (EN)", () => {
    const { container } = render(
      <Report
        form={{ ...MOCK_DATA_WITH_TUMOR, ihc }}
        language={"EN"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_IHC_EN);
  });
});
