import { ReportParams, generateReport } from "./report";

// TODO clean: test non-trivial values for ihc field

const MOCK_DATA_WITHOUT_TUMOR: ReportParams = {
  formId: "prostate-biopsy-transrectal",
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
    antibodies: [],
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
    antibodies: [],
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

// TODO clean: test functions to compute scores
// TODO clean: test functions to compute errors

describe("generateReport", () => {
  it("should generate a clean report without a tumor (FR)", () => {
    expect(generateReport(MOCK_DATA_WITHOUT_TUMOR, "FR")).toEqual(
      `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques:
    PSA: 10 ng.mL⁻¹
    IRM: Oui
    Cibles:
        PIRADS 2, base droite (pots 6 et 7)
        PIRADS 3, apex droit (pot 8)

Remarques particulières:
    MOCK-specific-notes

Absence de foyer tumoral sur l'ensemble des 18 biopsies étudiées (36 mm).
Adénomyome prostatique.`,
    );
  });

  it.only("should generate a clean report with a tumor (FR)", () => {
    expect(generateReport(MOCK_DATA_WITH_TUMOR, "FR"))
      .toEqual(`BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques:
    PSA: 10 ng.mL⁻¹
    IRM: Oui
    Cibles:
        PIRADS 2, base droite (pots 6 et 7)
        PIRADS 3, apex droit (pot 8)

Remarques particulières:
    MOCK-specific-notes

Adénocarcinome acinaire de type prostatique.

Il présente un score de Gleason 9 (4 à 95% dont 10% cribriformes + 5 à 5%), soit un score ISUP de 5.
Il est localisé sur 2 des 6 biopsies systématiques (5 mm sur 24 mm examinés, 21%) et sur 0 des 3 biopsies ciblées (0 mm sur 12 mm examinés, 0%).
Il mesure 5 mm sur 36 mm examinés sur les biopsies standards.

Engainements périnerveux : Non
Tissu extra-prostatique : Non`);
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect(generateReport(MOCK_DATA_WITHOUT_TUMOR, "EN")).toEqual(
      `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:
    PSA: 10 ng.mL⁻¹
    MRI: Yes
    Targeted biopsies:
        PIRADS 2, right base (Containers 6 and 7)
        PIRADS 3, right apex (Container 8)

Other:
    MOCK-specific-notes

No tumor seen among the 18 studied biopsies (36 mm).
Prostate adenomyoma.`,
    );
  });

  it("should generate a clean report with a tumor (EN)", () => {
    expect(generateReport(MOCK_DATA_WITH_TUMOR, "EN")).toEqual(
      `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

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
It has a size of 5 mm out of 36 mm examined on systematic biopsies.

Perineural Invasion : No
Periprostatic Fat Invasion : No`,
    );
  });
});
