import { useMemo } from "react";
import { anId } from "./helpers/helpers";
import { Option, OptionGroup, SelectValue } from "./helpers/options";

import { FieldProps } from "./helpers/fields";
import { DEFAULT_LANGUAGE, Language, translate } from "./language";
import "./select.css";

type Props<T extends SelectValue> = FieldProps<T> & {
  language?: Language;
  options: Option<T>[] | OptionGroup<T>[];
  name: string;
  label?: string; // TODO clean: consider using label as name
};

function isGroupedOptions<T extends SelectValue>(
  options: Props<T>["options"],
): options is OptionGroup<T>[] {
  return "items" in options[0];
}

export function Select<T extends SelectValue>({
  language = DEFAULT_LANGUAGE,
  value,
  options: _options,
  name,
  label,
  isReadOnly,
  onChange: _onChange,
}: Props<T>) {
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

    return translate(match.label, language);
  }

  return (
    <div className="select-container">
      {/* TODO clean: replace with Label */}
      {/* TODO: translate label */}
      {label ? <label htmlFor={id}>{label}</label> : undefined}
      <select
        className="select"
        value={String(value)}
        name={name}
        id={id}
        onChange={onChange}
      >
        {isGroupedOptions(_options)
          ? _options.map((group) => (
              <optgroup
                key={group.title}
                label={translate(group.title, language)}
              >
                {group.items.map((option) => (
                  <OptionItem
                    key={String(option.value)}
                    option={option}
                    language={language}
                  />
                ))}
              </optgroup>
            ))
          : _options.map((option) => (
              <OptionItem
                key={String(option.value)}
                option={option}
                language={language}
              />
            ))}
      </select>
    </div>
  );
}

function OptionItem<T extends SelectValue>({
  option,
  language,
}: {
  option: Option<T>;
  language: Language;
}) {
  // CAUTION: this cast type is unsafe
  const value = option.value as string | number;

  return (
    <option key={value} value={value}>
      {translate(option.label, language)}
    </option>
  );
}
