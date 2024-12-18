import { useEffect, useMemo } from "react";
import { anId, filterNullish, join } from "./helpers/helpers";
import {
  Option,
  OptionGroup,
  OptionOrGroup,
  OptionValue,
} from "./helpers/options";

import { ErrorList } from "./ErrorList";
import { HelpIcon } from "./HelpIcon";
import css from "./select.module.css";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { DEFAULT_LANGUAGE, Language, translate } from "./translation";

// TODO clean: consider extracting a SelectWithOther component

type Props<T extends OptionValue> = {
  language?: Language;
  options: readonly OptionOrGroup<T>[];
  value: T;
  onChange: (value: T) => void;
  errors?: string | string[] | undefined;

  // TODO: make label mandatory to avoid forgetting it (label: string | undefined)
  label?: string;
  labelSize?: "sm" | "md";
  isInline?: boolean;
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
  options: optionsProp,
  value,
  onChange: onChangeProp,
  errors: errorsProp,
  label,
  labelSize = "md",
  isInline,
  isReadOnly,
  variant = "field",
  width,
}: Props<T>) {
  const id = useMemo(anId, []);

  const flatOptions = useMemo((): readonly Option<T>[] => {
    return optionsProp.flatMap((item) =>
      isOptionGroup(item) ? item.options : [item],
    );
  }, [optionsProp]);

  const optionsByValue = useMemo(() => {
    return Object.fromEntries(
      flatOptions.map((option) => [option.value, option]),
    );
  }, [flatOptions]);

  // If options changes and value is not valid anymore, update the value to the first available.
  // Typically useful when options are dynamic.
  useEffect(() => {
    if (flatOptions.some((option) => option.value === value)) {
      return;
    }

    onChangeProp(flatOptions[0].value);
  }, [value, flatOptions, onChangeProp]);

  const errors = (Array.isArray(errorsProp) ? errorsProp : [errorsProp]).filter(
    filterNullish,
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
      onChangeProp(value);
    };

    return (
      <select
        className={join(css.select, css[variant])}
        style={{ width }}
        value={String(value)}
        id={id}
        onChange={onChange}
      >
        {optionsProp.map((item) =>
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
    onChangeProp,
    optionsByValue,
    optionsProp,
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
    // TODO clean: in particular, align heights (for example, between TextInput and Select)
    <Stack
      isInline={isInline}
      direction="row"
      alignItems="center"
      wrap="nowrap"
      spacing="sm"
    >
      {/* TODO clean: replace with Label */}
      {/* TODO clean: translate label */}
      {/* TODO clean: prevent unwanted wrapping */}
      {label ? (
        <label htmlFor={id}>
          <Text size={labelSize}>{label}</Text>
        </label>
      ) : undefined}
      {content}
      {errors.length ? (
        <HelpIcon
          variant="error"
          size="xs"
          content={<ErrorList errors={errors} />}
        />
      ) : undefined}
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
