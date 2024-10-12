import css from "./error-message.module.css";

type Props = {
  errorMessage: string | undefined;
};

export const ErrorMessage = ({ errorMessage }: Props) =>
  errorMessage ? <div className={css.main}>{errorMessage}</div> : undefined;
