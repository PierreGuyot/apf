type InputTextProps = {
  errorMessage?: string;
};

export const ErrorMessage = ({ errorMessage }: InputTextProps) =>
  errorMessage ? <div>{errorMessage}</div> : undefined;
