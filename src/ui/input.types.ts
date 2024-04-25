export type OnInput<T> = React.FormEventHandler<T>;

export type InputProps<T extends string | number> = {
  value: T;
  label?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
  onChange: (value: T) => void;
};
