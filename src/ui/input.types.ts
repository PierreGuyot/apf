import { FieldProps } from "./helpers/fields";

export type OnInput<T> = React.FormEventHandler<T>;

export type InputProps<T extends string | number> = FieldProps<T> & {
  label?: string;
  // TODO: handle Errors
  errors?: string | string[];
  isSubmitted?: boolean;
};
