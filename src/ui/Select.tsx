import { useMemo } from "react";
import { anId, join } from "./helpers/helpers";
import {
  Option,
  OptionGroup,
  OptionOrGroup,
  OptionValue,
} from "./helpers/options";

import css from "./select.module.css";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { DEFAULT_LANGUAGE, Language, translate } from "./translation";

type Props<T extends OptionValue> = {
  language?: Language;
  options: readonly OptionOrGroup<T>[];
  value: T;
  onChange: (value: T) => void;

  label?: string;
  labelSize?: "sm" | "md";
  isReadOnly?: boolean;
  variant?: "field" | "neutral";
  width?: string; // Free string
};

function isOptionGroup<T extends OptionValue>(
  option: OptionOrGroup<T>,
): option is OptionGroup<T> {
  return "options" in option;
}

export function Select<T extends OptionValue>({
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
    (): readonly Option<T>[] =>
      _options.flatMap((item) => (isOptionGroup(item) ? item.options : [item])),
    [_options],
  );

  const optionsByValue = useMemo(
    () =>
      Object.fromEntries(flatOptions.map((option) => [option.value, option])),
    [flatOptions],
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
        id={id}
        onChange={onChange}
      >
        {_options.map((item) =>
          isOptionGroup(item) ? (
            <optgroup key={item.title} label={translate(item.title, language)}>
              {item.options.map((option) => (
                <OptionItem
                  key={String(option.value)}
                  option={option}
                  language={language}
                />
              ))}
            </optgroup>
          ) : (
            <OptionItem
              key={String(item.value)}
              option={item}
              language={language}
            />
          ),
        )}
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
    value,
    width,
    variant,
  ]);

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" alignItems="center" wrap="wrap" spacing="sm">
      {/* TODO clean: replace with Label */}
      {/* TODO clean: translate label */}
      {/* TODO clean: prevent unwanted wrapping */}
      {label ? (
        <label htmlFor={id}>
          <Text size={labelSize}>{label}</Text>
        </label>
      ) : undefined}
      {content}
    </Stack>
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
