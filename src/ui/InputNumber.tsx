import { useEffect, useMemo } from "react";
import { clamp, filterNullish, join } from "./helpers/helpers";
import { useBoolean, useString } from "./helpers/state";
import { Unit, getUnitLabel } from "./helpers/units";
import { HelpIcon } from "./HelpIcon";
import { InlineCode } from "./InlineCode";
import css from "./input-number.module.css";
import { InputProps, OnInput } from "./input.types";
import { Label } from "./Label";
import { Stack } from "./Stack";
import { ErrorList } from "./ErrorList";

type Props = InputProps<number> & {
  min?: number;
  max?: number;
  unit?: Unit;
  size?: "md" | "lg";
  isInline?: boolean;
  isDecimal?: boolean;
};

// Validates `0`, `1`, `10`, `2.`, `2.5`, but not `12.3.`, or the empty string
const REGEX_DECIMAL = /^\d+(\.(\d+)?)?$/;
// Validates `0`, `1`, `10`, but not the empty string
const REGEX_INTEGER = /^\d+$/;

const validate = ({
  value,
  isDecimal,
  min,
  max,
}: {
  value: string;
  isDecimal: boolean;
  min: number | undefined;
  max: number | undefined;
}) => {
  const regex = isDecimal ? REGEX_DECIMAL : REGEX_INTEGER;
  if (!regex.test(value)) {
    return "String is not a valid number.";
  }

  const valueAsNumber = Number(value);
  const clampedValue = clamp({ value: valueAsNumber, min, max });

  if (valueAsNumber !== clampedValue) {
    return `Value is not inside specified range ${min}-${max}`;
  }

  return undefined;
};

// TODO CLEAN: handle an `isDisabled` prop

export const InputNumber = ({
  value,
  label,
  min,
  max,
  unit,
  size = "md",
  isDecimal = false,
  isSubmitted = true,
  isInline,
  isReadOnly,
  onChange,
  errors: errorMessageProp,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const [_value, _setValue] = useString(String(value));

  useEffect(() => {
    _setValue(String(value));
  }, [_setValue, value]);

  const hasError = useMemo(
    () => validate({ value: _value, isDecimal, min, max }),
    [_value, isDecimal, min, max],
  );
  const hasInternalError = (isTouched ?? isSubmitted) ? hasError : false;

  const onFocus = () => {
    setIsTouched(true);
  };

  const onBlur = () => {
    if (!hasError) {
      return;
    }

    // If the value is invalid, set the field to a valid value on blur:
    // - If the field is empty, reset to minimal value
    // - If the field is filled, reset to last valid value
    const resetValue = min ?? 0;
    const newValue = _value ? value : resetValue;
    _setValue(String(newValue));
    onChange(newValue);
  };

  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    const stringValue = inputEvent.value;

    _setValue(stringValue);

    if (validate({ value: stringValue, isDecimal, min, max })) {
      return;
    }

    const numericValue = Number(stringValue);
    const clampedValue = clamp({ value: numericValue, min, max });
    onChange(clampedValue);
  };

  const errorMessage = (
    Array.isArray(errorMessageProp) ? errorMessageProp : [errorMessageProp]
  ).filter(filterNullish);

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" alignItems="start" isInline={isInline} spacing="sm">
      {label ? <Label label={label} size="md" /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <Stack spacing="xs" isInline>
          <Stack direction="row" spacing="sm" isInline>
            <input
              className={join(
                css.input,
                css[size],
                hasInternalError ? css.isInvalid : undefined,
              )}
              // CAUTION:
              // Native type number inputs are poorly implemented so we resort to customizing a string input
              // (See https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
              // For instance, it is impossible to clear a type number input
              type="text"
              inputMode="numeric"
              value={_value}
              min={min}
              max={max}
              onFocus={onFocus}
              onBlur={onBlur}
              onInput={onInput}
            />
            {unit ? (
              // CAUTION: the margin is required because isInline: true will cancel the effect of the spacing prop on the parent Stack
              <Stack isInline marginLeft="xs">
                <InlineCode>{getUnitLabel(unit)}</InlineCode>
              </Stack>
            ) : undefined}
            {isSubmitted && errorMessage.length ? (
              <Stack isInline marginLeft="xs">
                <HelpIcon
                  variant="error"
                  size="xs"
                  content={<ErrorList errors={errorMessage} />}
                />
              </Stack>
            ) : undefined}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
