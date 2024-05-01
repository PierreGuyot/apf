import { FieldProps } from "./helpers.types";

export type OnInput<T> = React.FormEventHandler<T>;

export type InputProps<T extends string | number> = FieldProps<T> & {
  label?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
};
