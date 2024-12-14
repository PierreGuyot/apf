import { validateResectionMacroscopy } from "./validation";

describe.only("validateResectionMacroscopy", () => {
  it("should validate a passing form", () => {
    expect(
      validateResectionMacroscopy({ chipWeight: 2, blockCount: 2 }),
    ).toEqual([]);
  });

  it("should not validate a form with a null chip weight", () => {
    expect(
      validateResectionMacroscopy({ chipWeight: 0, blockCount: 2 }),
    ).toEqual(["Le poids des copeaux est égal à 0."]);
  });

  it("should not validate a form with a null block count", () => {
    expect(
      validateResectionMacroscopy({ chipWeight: 2, blockCount: 0 }),
    ).toEqual(["Le nombre de blocs est égal à 0."]);
  });
});
