import { useCallback, useMemo } from "react";
import { anId, join } from "./helpers/helpers";
import { Option, OptionGroup, OptionValue } from "./helpers/options";

import { DEFAULT_LANGUAGE, Language, translate } from "./language";
import css from "./select.module.css";

type Props<T extends OptionValue> = {
  name: string;
  language?: Language;
  options: Option<T>[] | OptionGroup<T>[];
  value: T;
  onChange: (value: T) => void;

  label?: string; // TODO clean: consider using label as name
  labelSize?: "sm" | "md";
  isReadOnly?: boolean;
  variant?: "field" | "neutral";
  width?: string; // Free string
};

function isGroupedOptions<T extends OptionValue>(
  options: Props<T>["options"],
): options is OptionGroup<T>[] {
  return "options" in options[0];
}

export function Select<T extends OptionValue>({
  name,
  language = DEFAULT_LANGUAGE,
  options: _options,
  value,
  onChange: _onChange,
  label,
  labelSize = "md",
  isReadOnly,
  variant = "field",
  width,
}: Props<T>) {
  const id = useMemo(anId, []);

  const flatOptions = useMemo(
    (): Option<T>[] =>
      isGroupedOptions(_options)
        ? _options.flatMap((group) => group.options)
        : _options,
    [_options],
  );

  const optionsByValue = useMemo(
    () =>
      Object.fromEntries(flatOptions.map((option) => [option.value, option])),
    [flatOptions],
  );

  const renderOption = useCallback(
    (option: Option<T>) => (
      <OptionItem
        key={String(option.value)}
        option={option}
        language={language}
      />
    ),
    [language],
  );

  const content = useMemo(() => {
    if (isReadOnly) {
      const match = flatOptions.find((option) => option.value === value);
      if (!match) {
        throw new Error("Invalid value");
      }

      return translate(match.label, language);
    }

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const rawValue = e.target.value;
      const { value } = optionsByValue[String(rawValue)];
      _onChange(value);
    };

    return (
      <select
        className={join(css.select, css[variant])}
        style={{ width }}
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
                {group.options.map(renderOption)}
              </optgroup>
            ))
          : _options.map(renderOption)}
      </select>
    );
  }, [
    _onChange,
    optionsByValue,
    _options,
    flatOptions,
    id,
    isReadOnly,
    language,
    name,
    renderOption,
    value,
    width,
    variant,
  ]);

  return (
    // TODO clean: mutualize style with InputText
    <div className={join(css.main, css[labelSize])}>
      {/* TODO clean: replace with Label */}
      {/* TODO clean: translate label */}
      {/* TODO clean: prevent unwanted wrapping */}
      {label ? <label htmlFor={id}>{label}</label> : undefined}
      {content}
    </div>
  );
}

function OptionItem<T extends OptionValue>({
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
