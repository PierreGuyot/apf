import { useEffect, useMemo } from "react";
import { clamp, join } from "./helpers/helpers";
import { useBoolean, useString } from "./helpers/state";
import { Unit, getUnitLabel } from "./helpers/units";
import { InlineCode } from "./InlineCode";
import css from "./input-number.module.css";
import { InputProps, OnInput } from "./input.types";
import { Label } from "./Label";
import { Stack } from "./Stack";

// TODO feature: add tooltip to display error message

type Props = InputProps<number> & {
  min?: number;
  max?: number;
  unit?: Unit;
  size?: "md" | "lg";
  isDecimal?: boolean;
};

// Validates `0`, `1`, `10`, `2.`, `2.5`, but not the empty string, `12.3.`
const REGEX_DECIMAL = /^\d+(\.(\d+)?)?$/;
// Validates `0`, `1`, `10`, but not the empty string
const REGEX_INTEGER = /^\d+$/;

const validate = ({
  value,
  isDecimal,
}: {
  value: string;
  isDecimal: boolean;
}) => {
  const regex = isDecimal ? REGEX_DECIMAL : REGEX_INTEGER;
  return !regex.test(value);
};

export const InputNumber = ({
  value,
  label,
  min,
  max,
  unit,
  size = "md",
  isDecimal = false,
  isSubmitted,
  isReadOnly,
  onChange,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const [_value, _setValue] = useString(String(value));

  useEffect(() => {
    _setValue(String(value));
  }, [_setValue, value]);

  const hasError = useMemo(
    () => validate({ value: _value, isDecimal }),
    [_value, isDecimal],
  );
  const shouldDisplayError = isTouched || isSubmitted ? hasError : undefined;

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
    _setValue(String(_value ? value : resetValue));
  };

  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    const stringValue = inputEvent.value;

    _setValue(stringValue);

    if (validate({ value: stringValue, isDecimal })) {
      return;
    }

    const numericValue = Number(stringValue);
    const clampedValue = clamp({ value: numericValue, min, max });
    onChange(clampedValue);
  };

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" alignItems="center" spacing="sm">
      {label ? <Label label={label} /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <>
          <input
            className={join(
              css.input,
              css[size],
              shouldDisplayError ? css.isInvalid : undefined,
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
          {unit ? <InlineCode>{getUnitLabel(unit)}</InlineCode> : undefined}
        </>
      )}
    </Stack>
  );
};
