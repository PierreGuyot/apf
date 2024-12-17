export const ERROR_MANDATORY_FIELD = "Le champ est obligatoire.";

// Standard error format
// TODO: use as base type (in particular, for all inputs)
type BaseError = string | undefined;
export type Errors = BaseError | Array<Errors> | { [key: string]: Errors };

// TODO: add tests
export const reduceErrors = (errors: Errors): boolean => {
  if (typeof errors === "undefined") {
    return false;
  }

  if (typeof errors === "string") {
    return !!errors;
  }

  return Object.values(errors).some(reduceErrors);
};
