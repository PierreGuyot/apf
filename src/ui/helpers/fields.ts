// Base type for any kind of input/field
export type FieldProps<T> = {
  // TODO: consider adding language?: Language here
  value: T;
  isReadOnly?: boolean;
  onChange: (value: T) => void;
};
