export const ERROR_MANDATORY_FIELD = "Champ obligatoire";

type Error = string | string[] | undefined;

// TODO: add tests

export const reduceErrors = (errors: Record<string, Error> | Error[]) =>
  !!Object.values(errors).filter((value) =>
    Array.isArray(value) ? !!value.length : !!value,
  ).length;
