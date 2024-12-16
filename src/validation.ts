export const ERROR_MANDATORY_FIELD = "Le champ est obligatoire.";

// Standard error format
// TODO: use as base type (in particular, for all inputs)
export type Errors =
  | string
  | string[]
  | Record<string, string | undefined>
  | undefined;

// TODO: add tests

export const reduceErrors = (
  errors: Record<string, Errors> | Errors[],
): boolean =>
  !!Object.values(errors).filter((value) => {
    if (typeof value === "undefined") {
      return false;
    }

    if (typeof value === "string") {
      return !!value;
    }

    if (Array.isArray(value)) {
      return !!value.length;
    }

    return reduceErrors(value);
  }).length;
