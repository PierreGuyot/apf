import { ErrorMessage, Stack } from ".";

// TODO clean: add to documentation

type Props = {
  errors?: string[];
};

export const ErrorList = ({ errors = [] }: Props) => (
  <Stack>
    {errors.map((error) => (
      <ErrorMessage key={error} errorMessage={error} />
    ))}
  </Stack>
);
