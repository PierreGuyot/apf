export type Pair<T extends number = number> = [T, T];

// Base type for any kind of input/field
export type FieldProps<T> = {
  value: T;
  isReadOnly?: boolean;
  onChange: (value: T) => void;
};

export type Language = "FR" | "EN";
