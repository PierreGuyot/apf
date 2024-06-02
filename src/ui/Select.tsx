import { useMemo } from "react";
import { anId } from "./helpers/helpers";
import { FieldProps } from "./helpers/helpers.types";
import { Option, OptionGroup, SelectValue } from "./helpers/options";

import "./select.css";

type SelectProps<T extends SelectValue> = FieldProps<T> & {
  options: Option<T>[] | OptionGroup<T>[];
  name: string;
  label?: string; // TODO clean: consider using label as name
};

function isGroupedOptions<T extends SelectValue>(
  options: SelectProps<T>["options"],
): options is OptionGroup<T>[] {
  return "items" in options[0];
}

export function Select<T extends SelectValue>({
  value,
  options: _options,
  name,
  label,
  isReadOnly,
  onChange: _onChange,
}: SelectProps<T>) {
  const id = useMemo(anId, []);

  const flatOptions = useMemo(
    (): Option<T>[] =>
      isGroupedOptions(_options)
        ? _options.flatMap((group) => group.items)
        : _options,
    [_options],
  );

  const optionsByValue = useMemo(
    () =>
      Object.fromEntries(flatOptions.map((option) => [option.value, option])),
    [flatOptions],
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value;
    const { value } = optionsByValue[String(rawValue)];
    _onChange(value);
  };

  if (isReadOnly) {
    const match = flatOptions.find((option) => option.value === value);
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
        {isGroupedOptions(_options)
          ? _options.map((group) => (
            <optgroup key={group.title} label={group.title}>
              {group.items.map((option) => (
                <OptionItem key={String(option.value)} option={option} />
              ))}
            </optgroup>
          ))
          : _options.map((option) => (
            <OptionItem key={String(option.value)} option={option} />
          ))}
      </select>
    </div>
  );
}

function OptionItem<T extends SelectValue>({ option }: { option: Option<T> }) {
  // CAUTION: this cast type is unsafe
  const value = option.value as string | number;

  return (
    <option key={value} value={value}>
      {option.label}
    </option>
  );
}
