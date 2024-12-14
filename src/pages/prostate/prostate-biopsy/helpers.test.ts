import { DEFAULT_GLEASON_ITEM } from "../helpers";
import { getMaximumByGleasonScore } from "./helpers";

let MOCK_ITEM_1 = {
  a: 4,
  b: 3,
  percentage: 55,
  cribriformPercentage: 0,
} as const;
let MOCK_ITEM_2 = {
  a: 4,
  b: 3,
  percentage: 70,
  cribriformPercentage: 0,
} as const;
let MOCK_ITEM_3 = {
  a: 3,
  b: 4,
  percentage: 95,
  cribriformPercentage: 0,
} as const;

describe.only("getMaximumByGleasonScore", () => {
  it("should properly get the maximum of an empty array", () => {
    expect(getMaximumByGleasonScore([])).toEqual(DEFAULT_GLEASON_ITEM);
  });

  it("should properly get the maximum on a Gleason score array", () => {
    expect(
      getMaximumByGleasonScore([MOCK_ITEM_1, MOCK_ITEM_2, MOCK_ITEM_3]),
    ).toEqual(MOCK_ITEM_2);
  });
});
