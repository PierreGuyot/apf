import { Text } from "./Text";

type Props = {
  errorMessage: string | undefined;
};

export const ErrorMessage = ({ errorMessage }: Props) => {
  if (!errorMessage) {
    return undefined;
  }

  return (
    <Text as="div" size="sm" color="warning">
      {errorMessage}
    </Text>
  );
};
