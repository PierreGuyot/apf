// TODO clean: remove this type
// Base type for any kind of input/field
export type FieldProps<T> = {
  value: T;
  isReadOnly?: boolean;
  onChange: (value: T) => void;
};
