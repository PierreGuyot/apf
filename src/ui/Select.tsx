import { useMemo } from "react";
import { anId } from "./helpers";
import { FieldProps } from "./helpers.types";
import { Option } from "./options";

type SelectValue = string | number | boolean;

type SelectProps<T extends SelectValue> = FieldProps<T> & {
  options: Option<T>[];
  name: string;
  label?: string; // TODO: consider using label as name
};

export function Select<T extends SelectValue>({
  value,
  options,
  name,
  label,
  onChange: _onChange,
}: SelectProps<T>) {
  const id = useMemo(anId, []);
  const optionsByValue = useMemo(
    () => Object.fromEntries(options.map((option) => [option.value, option])),
    [options],
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value;
    const { value } = optionsByValue[String(rawValue)];
    _onChange(value);
  };

  return (
    <>
      {/* TODO: replace with Label */}
      {label ? <label htmlFor={id}>{label}</label> : undefined}
      <select
        className="select"
        value={String(value)}
        name={name}
        id={id}
        onChange={onChange}
      >
        {options.map((option) => {
          const value = option.value as string | number;
          return (
            <option
              key={value}
              // CAUTION: this cast type is unsafe
              value={value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </>
  );
}
