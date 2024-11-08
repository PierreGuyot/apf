import { render } from "@testing-library/react";
import { Report, ReportParams } from "./report";
import { aMockIhcState } from "../../../common/fixtures";

// TODO clean: test functions to compute scores
// TODO clean: test functions to compute errors

const ihc = aMockIhcState();

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
  comments: "MOCK-specific-notes",
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
      tumorTep: true,
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
      tumorTep: true,
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
  comments: "MOCK-specific-notes",
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
    tumorTep: true,
  },
};

const MOCK_DATA_WITH_TUMOR_TRANSPERINEAL: ReportParams = {
  ...MOCK_DATA_WITH_TUMOR,
  formId: "prostate-biopsy-transperineal",
};

const SAMPLE_WITHOUT_TUMOR_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :

    PSA: 10 ng.mL⁻¹
    IRM : oui
    Cibles :
        PIRADS 2, base droite (pots 7 et 8)
        PIRADS 3, apex droit (pot 9)

Remarques particulières :
    MOCK-specific-notes

Conclusion :

Absence de foyer tumoral sur l'ensemble des 18 biopsies étudiées (36 mm).
Adénomyome prostatique.`;

const SAMPLE_WITH_TUMOR_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :

    PSA: 10 ng.mL⁻¹
    IRM : oui
    Cibles :
        PIRADS 2, base droite (pots 7 et 8)
        PIRADS 3, apex droit (pot 9)

Remarques particulières :
    MOCK-specific-notes

Conclusion :

Type de tumeur : adénocarcinome acinaire de type prostatique.
Score de Gleason : 9 (4 + 5) dont 10% de cribriforme, soit un score ISUP de 5.
Localisation :
    Biopsies systématiques : 2 des 12 biopsies (5mm sur 24mm examinés, 21%)
    Biopsies ciblées : 0 des 6 biopsies (0mm sur 12mm examinés, 0%)
    Total : 5mm sur 36mm examinés (base droite et milieu droit)

Engainements périnerveux : non
Tissu extra-prostatique : oui (base droite et milieu droit)`;

const SAMPLE_WITHOUT_TUMOR_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:

    PSA: 10 ng.mL⁻¹
    MRI: yes
    Targeted biopsies:
        PIRADS 2, right base (containers 7 and 8)
        PIRADS 3, right apex (container 9)

Other:
    MOCK-specific-notes

Conclusion:

No tumor seen among the 18 studied biopsies (36 mm).
Prostate adenomyoma.`;

const SAMPLE_WITH_TUMOR_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:

    PSA: 10 ng.mL⁻¹
    MRI: yes
    Targeted biopsies:
        PIRADS 2, right base (containers 7 and 8)
        PIRADS 3, right apex (container 9)

Other:
    MOCK-specific-notes

Conclusion:

TODO: acinar adenocarcinoma, conventional (usual).
Gleason Score: 9 (4 + 5) of which 10% cribriform, i.e. an ISUP score of 5.
Location:
    Systematic biopsies: 2 out of 12 biopsies (5mm out of 24mm examined, 21%)
    Targeted biopsies: 0 out of 6 biopsies (0mm out of 12mm examined, 0%)
    Total: 5mm out of 36mm examined (right base and right mid)

Perineural Invasion: no
Periprostatic Fat Invasion: yes (right base and right mid)`;

const SAMPLE_WITH_IHC_FR = `BIOPSIES PROSTATIQUES TRANSRECTALES ÉCHO-GUIDÉES

Renseignements cliniques :

    PSA: 10 ng.mL⁻¹
    IRM : oui
    Cibles :
        PIRADS 2, base droite (pots 7 et 8)
        PIRADS 3, apex droit (pot 9)

Immunohistochimie :
Bloc 1 :
    P504S/P63 (clone M-13H4) : carcinome invasif
    other_1 (clone clone_1) : bénin
    other_2 (clone clone_2) : malin
Bloc 3 :
    P63 (clone M-4A4) : bénin
    CK14/CK15 (clone SP53) : lésion intra-épithéliale
    other_3 (clone clone_3) : bénin

Remarques particulières :
    MOCK-specific-notes

Conclusion :

Type de tumeur : adénocarcinome acinaire de type prostatique.
Score de Gleason : 9 (4 + 5) dont 10% de cribriforme, soit un score ISUP de 5.
Localisation :
    Biopsies systématiques : 2 des 12 biopsies (5mm sur 24mm examinés, 21%)
    Biopsies ciblées : 0 des 6 biopsies (0mm sur 12mm examinés, 0%)
    Total : 5mm sur 36mm examinés (base droite et milieu droit)

Engainements périnerveux : non
Tissu extra-prostatique : oui (base droite et milieu droit)`;

const SAMPLE_WITH_IHC_EN = `TRANSRECTAL PROSTATE NEEDLE BIOPSIES

Case summary:

    PSA: 10 ng.mL⁻¹
    MRI: yes
    Targeted biopsies:
        PIRADS 2, right base (containers 7 and 8)
        PIRADS 3, right apex (container 9)

Immunohistochemistry:
Block 1:
    P504S/P63 (clone M-13H4): invasive carcinoma
    other_1 (clone clone_1): bénin
    other_2 (clone clone_2): malin
Block 3:
    P63 (clone M-4A4): begnin
    CK14/CK15 (clone SP53): intraepithelial lesion
    other_3 (clone clone_3): bénin

Other:
    MOCK-specific-notes

Conclusion:

TODO: acinar adenocarcinoma, conventional (usual).
Gleason Score: 9 (4 + 5) of which 10% cribriform, i.e. an ISUP score of 5.
Location:
    Systematic biopsies: 2 out of 12 biopsies (5mm out of 24mm examined, 21%)
    Targeted biopsies: 0 out of 6 biopsies (0mm out of 12mm examined, 0%)
    Total: 5mm out of 36mm examined (right base and right mid)

Perineural Invasion: no
Periprostatic Fat Invasion: yes (right base and right mid)`;

const SAMPLE_WITH_TUMOR_TRANSPERINEAL_FR = `BIOPSIES PROSTATIQUES TRANSPÉRINÉALES ÉCHO-GUIDÉES

Renseignements cliniques :

    PSA: 10 ng.mL⁻¹
    IRM : oui
    Cibles :
        PIRADS 2, latérale droite (pots 7 et 8)
        PIRADS 3, médiane droite (pot 9)

Remarques particulières :
    MOCK-specific-notes

Conclusion :

Type de tumeur : adénocarcinome acinaire de type prostatique.
Score de Gleason : 9 (4 + 5) dont 10% de cribriforme, soit un score ISUP de 5.
Localisation :
    Biopsies systématiques : 2 des 12 biopsies (5mm sur 24mm examinés, 21%)
    Biopsies ciblées : 0 des 6 biopsies (0mm sur 12mm examinés, 0%)
    Total : 5mm sur 36mm examinés (latérale droite et para-médiane droite)

Engainements périnerveux : non
Tissu extra-prostatique : oui (latérale droite et para-médiane droite)`;

const SAMPLE_WITH_TUMOR_TRANSPERINEAL_EN = `TRANSPERINEAL PROSTATE NEEDLE BIOPSIES

Case summary:

    PSA: 10 ng.mL⁻¹
    MRI: yes
    Targeted biopsies:
        PIRADS 2, right lateral (containers 7 and 8)
        PIRADS 3, right median (container 9)

Other:
    MOCK-specific-notes

Conclusion:

TODO: acinar adenocarcinoma, conventional (usual).
Gleason Score: 9 (4 + 5) of which 10% cribriform, i.e. an ISUP score of 5.
Location:
    Systematic biopsies: 2 out of 12 biopsies (5mm out of 24mm examined, 21%)
    Targeted biopsies: 0 out of 6 biopsies (0mm out of 12mm examined, 0%)
    Total: 5mm out of 36mm examined (right lateral and right paramedian)

Perineural Invasion: no
Periprostatic Fat Invasion: yes (right lateral and right paramedian)`;

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

  it("should generate a clean report for transperineal prostate biopsy (FR)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITH_TUMOR_TRANSPERINEAL}
        language={"FR"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_TUMOR_TRANSPERINEAL_FR);
  });

  it("should generate a clean report for transperineal prostate biopsy (EN)", () => {
    const { container } = render(
      <Report
        form={MOCK_DATA_WITH_TUMOR_TRANSPERINEAL}
        language={"EN"}
        isExpertMode={true}
      />,
    );
    expect(container.textContent).toEqual(SAMPLE_WITH_TUMOR_TRANSPERINEAL_EN);
  });
});
