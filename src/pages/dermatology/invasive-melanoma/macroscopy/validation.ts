import { filterNullish } from "../../../../ui";
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
}): string[] => {
  switch (type) {
    case "unspecified": {
      return [];
    }
    case "specified-with-depth": {
      return [
        length ? undefined : "Le champ Longueur doit être renseigné.",
        width ? undefined : "Le champ Largeur doit être renseigné.",
        depth ? undefined : "Le champ Profondeur doit être renseigné.",
      ].filter(filterNullish);
    }
    case "specified-without-depth": {
      return [
        length ? undefined : "Le champ Longueur doit être renseigné.",
        width ? undefined : "Le champ Largeur doit être renseigné.",
      ].filter(filterNullish);
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
  blockDescription: state.blockDescription ? undefined : ERROR_MANDATORY_FIELD,
});

export type MacroscopyErrors = ReturnType<typeof validateMacroscopy>;
