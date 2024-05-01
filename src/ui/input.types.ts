import { FieldProps } from "./helpers";

export type OnInput<T> = React.FormEventHandler<T>;

export type InputProps<T extends string | number> = FieldProps<T> & {
  label?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
};
