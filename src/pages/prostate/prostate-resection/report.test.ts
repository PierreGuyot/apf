import { DEFAULT_GLEASON_ITEM } from "../helpers";
import { FormState } from "./ProstateResectionForm";
import { generateReport } from "./report";

const aFormState = (partial: Partial<FormState> = {}): FormState => ({
  caseSummary: "a-case-summary",
  chipWeight: 10,
  blockCount: 10,
  coloration: "HES",
  samplingType: "full",
  mainLesionType: "prostate-adenomyoma",
  tumorType: "acinar-adenocarcinoma-conventional",
  priorConditions: "none",
  histologicalGrade: DEFAULT_GLEASON_ITEM,
  tumorQuantification: ">5%",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherLesions: [],
  ...partial,
});

// TODO: fix tests
// TODO: test generateReport on real, complete example

describe("generateReport", () => {
  it("should generate a clean report with a tumor (FR)", () => {
    expect(
      generateReport(
        {
          formId: "transurethral-prostatic-resection",
          ...aFormState(),
        },
        "FR",
      ),
    ).toEqual("TODO");
  });

  it("should generate a clean report without a tumor (FR)", () => {
    expect(
      generateReport(
        {
          formId: "transurethral-prostatic-resection",
          ...aFormState(),
        },
        "FR",
      ),
    ).toEqual("TODO");
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect("TODO").toEqual("TODO");
  });

  it("should generate a clean report without a tumor (EN)", () => {
    expect("TODO").toEqual("TODO");
  });
});
