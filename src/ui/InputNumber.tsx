import { useEffect, useMemo } from "react";
import { Code } from "./Code";
import { Label } from "./Label";
import { clamp, join } from "./helpers";
import "./input-number.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean, useString } from "./state";

// TODO: add tooltip to display error message

type Unit = "ng-per-mL";

type InputNumberProps = InputProps<number> & {
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
  onChange,
}: InputNumberProps) => {
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
    // - If the field is empty, reset to 0
    // - If the field is filled, reset to last valid value
    _setValue(String(_value ? value : 0));
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
    <>
      {label ? <Label label={label} /> : undefined}
      <input
        className={join(
          "input-number",
          `input-number--${size}`,
          shouldDisplayError ? "input-number--is-invalid" : undefined,
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
        <Code>
          <UnitLabel unit={unit} />
        </Code>
      ) : undefined}
    </>
  );
};

type UnitLabelProps = { unit: Unit };

const UnitLabel = ({ unit }: UnitLabelProps) => {
  switch (unit) {
    case "ng-per-mL": {
      return (
        <>
          ng.mL<sup>-1</sup>
        </>
      );
    }
  }
};
