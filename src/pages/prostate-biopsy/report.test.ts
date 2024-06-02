import { FormState } from "./ProstateBiopsyForm";
import { generateReport } from "./report";

const aFormState = (partial: Partial<FormState> = {}): FormState => ({
  hasInfo: true,
  hasTarget: true,
  targetCount: 0,
  hasMri: true,
  psaRate: 1.23,
  containerCount: 0,
  comment: "",
  tumorType: "acinar-adenocarcinoma-conventional",
  piradsItems: [],
  rows: [],
  ...partial,
});

// TODO: test functions to compute scores
// TODO: test functions to compute errors
// TODO: test generateReport on real, complete example

describe("generateReport", () => {
  it("should generate a clean report with a tumor (FR)", () => {
    expect(
      generateReport({
        language: "FR",
        score: { biopsyCount: 1, biopsySize: 2, tumorCount: 1 },
        ...aFormState(),
      }),
    ).toEqual(
      `Adénocarcinome acinaire de type prostatique.

Il présente un score de Gleason 6 (3 + 3), soit un score ISUP de 1.
Il est localisé sur 0 des 0 biopsies systématiques et sur 0 des 0 biopsies ciblées.
Il mesure undefined mm sur 2 mm examinés sur les biopsies standards.

Engainements périnerveux : Non
Tissu extra-prostatique : Non
Envahissement tissu extra-prostatique : Non

Renseignements cliniques:
    PSA: 1.23 ng.mL⁻¹
    IRM: oui`,
    );
  });

  it("should generate a clean report without a tumor (FR)", () => {
    expect(
      generateReport({
        language: "FR",
        score: { biopsyCount: 1, biopsySize: 2, tumorCount: 0 },
        ...aFormState(),
      }),
    )
      .toEqual(`Absence de foyer tumoral sur l'ensemble des 1 biopsies étudiées (2 mm).
Adénomyome prostatique.

Renseignements cliniques:
    PSA: 1.23 ng.mL⁻¹
    IRM: oui`);
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect("TODO").toEqual("TODO");
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect("TODO").toEqual("TODO");
  });
});
