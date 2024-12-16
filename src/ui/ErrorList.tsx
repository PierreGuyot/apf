import { ErrorMessage, Stack } from ".";

// TODO clean: add to documentation

type Props = {
  errors: string[] | Record<string, string | undefined> | undefined;
};

export const ErrorList = ({ errors = [] }: Props) => (
  <Stack>
    {Object.values(errors).map((error) => (
      <ErrorMessage key={error} errorMessage={error} />
    ))}
  </Stack>
);
