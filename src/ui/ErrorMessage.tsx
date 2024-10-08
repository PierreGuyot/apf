import "./error-message.css";

type Props = {
  errorMessage: string | undefined;
};

export const ErrorMessage = ({ errorMessage }: Props) =>
  errorMessage ? (
    <div className="error-message">{errorMessage}</div>
  ) : undefined;
