import { ERROR_MANDATORY_FIELD } from "../../../../validation";
import { Dimension3d } from "../helpers";
import { MacroscopyState } from "./state";

// TODO: extract
const validateDimensions = ({
  type,
  length,
  width,
  depth = 0,
}: {
  type: Dimension3d;
  length: number;
  width: number;
  depth?: number;
}) => {
  switch (type) {
    case "unspecified": {
      return {};
    }
    case "specified-with-depth": {
      return {
        length: length ? undefined : ERROR_MANDATORY_FIELD,
        width: width ? undefined : ERROR_MANDATORY_FIELD,
        depth: depth ? undefined : ERROR_MANDATORY_FIELD,
      };
    }
    case "specified-without-depth": {
      return {
        length: length ? undefined : ERROR_MANDATORY_FIELD,
        width: width ? undefined : ERROR_MANDATORY_FIELD,
      };
    }
  }
};

export const validateMacroscopy = (state: MacroscopyState) => ({
  orientationMethodOther:
    state.orientationMethod !== "other" || state.orientationMethodOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  orientationOther:
    state.orientation !== "other" || state.orientationOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  specimenDimensions: validateDimensions(state.specimenDimensions),
  lesionDimensions: validateDimensions(state.lesionDimensions),
  lesionAspectOther:
    state.lesionAspect !== "other" || state.lesionAspectOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  otherLesionsDescription:
    !state.hasOtherLesions || state.otherLesionsDescription
      ? undefined
      : ERROR_MANDATORY_FIELD,
  inkingOrientationOther:
    state.inking.orientation !== "other" || state.inking.orientationOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  secondBlockIndex:
    state.secondBlockIndex === state.blockIndex
      ? "Les deux numéros de blocs ne peuvent pas être égaux."
      : undefined,
});

export type MacroscopyErrors = ReturnType<typeof validateMacroscopy>;
