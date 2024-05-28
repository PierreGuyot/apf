import { useMemo } from "react";
import { anId } from "./helpers/helpers";
import { FieldProps } from "./helpers/helpers.types";
import { Option, SelectValue } from "./helpers/options";

import "./select.css";

type SelectProps<T extends SelectValue> = FieldProps<T> & {
  options: Option<T>[];
  name: string;
  label?: string; // TODO clean: consider using label as name
};

export function Select<T extends SelectValue>({
  value,
  options,
  name,
  label,
  isReadOnly,
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

  if (isReadOnly) {
    const match = options.find((option) => option.value === value);
    if (!match) {
      throw new Error("Invalid value");
    }

    return match.label;
  }

  return (
    <div className="select">
      {/* TODO clean: replace with Label */}
      {label ? <label htmlFor={id}>{label}</label> : undefined}
      <select value={String(value)} name={name} id={id} onChange={onChange}>
        {options.map((option) => {
          // CAUTION: this cast type is unsafe
          const value = option.value as string | number;

          return (
            <option key={value} value={value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
