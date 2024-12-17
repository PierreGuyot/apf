import { Troolean } from "../../../../ui";
import {
  Aspect,
  BlockSampling,
  Dimension2d,
  Dimension3d,
  Inking,
  Orientation,
  OrientationMethod,
} from "../helpers";

export type MacroscopyState = {
  isSpecimenOriented: boolean;
  orientationMethod: OrientationMethod;
  orientationMethodOther: string;
  orientation: Orientation | "other";
  orientationOther: string;
  specimenDimensions: {
    type: Dimension3d;
    length: number;
    width: number;
    depth: number;
  };
  lesionDimensions: {
    type: Dimension2d;
    length: number;
    width: number;
  };
  lesionAspect: Aspect;
  lesionAspectOther: string;
  hasSatelliteLesions: boolean;
  hasOtherLesions: boolean;
  otherLesionsDescription: string;
  inking: Inking;
  isIncludedInTotality: Troolean;
  blockCount: number;
  blockSampling: BlockSampling;
  position: Orientation;
  blockIndex: number;
  secondBlockIndex: number;
};

export const getMacroscopyState = (): MacroscopyState => ({
  isSpecimenOriented: true,
  orientationMethod: "Fil",
  orientationMethodOther: "",
  orientation: "à 12h",
  orientationOther: "",
  specimenDimensions: {
    type: "specified-with-depth",
    length: 0,
    width: 0,
    depth: 0,
  },
  lesionDimensions: {
    type: "specified-without-depth",
    length: 0,
    width: 0,
  },
  lesionAspect: "Pigmentée",
  lesionAspectOther: "",
  hasSatelliteLesions: false,
  hasOtherLesions: false,
  otherLesionsDescription: "",
  inking: {
    hasInking: false,
    color: "green",
    orientation: "à 3h",
    orientationOther: "",
  },
  isIncludedInTotality: "unspecified",
  blockCount: 1,
  blockSampling: "En croix",
  position: "à 3h",
  blockIndex: 0,
  secondBlockIndex: 0,
});
