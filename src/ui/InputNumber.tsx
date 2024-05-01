import { useState } from "react";
import { Code } from "./Code";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import { join } from "./helpers";
import "./input-number.css";
import { InputProps, OnInput } from "./input.types";

type Unit = "ng-per-mL";

type InputNumberProps = InputProps<number> & {
  min?: number;
  max?: number;
  unit?: Unit;
  size?: "md" | "lg";
  // TODO: add a isDecimal?: boolean prop
};

export const InputNumber = ({
  value,
  label,
  min,
  max,
  unit,
  size = "md",
  errorMessage,
  isSubmitted,
  onChange,
}: InputNumberProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    const valueAsNumber = Number(inputEvent.value);

    // TODO: handle decimals
    // TODO: handle min/max

    if (isNaN(valueAsNumber)) {
      return;
    }

    onChange(valueAsNumber);
  };

  return (
    <>
      {label ? <Label label={label} /> : undefined}
      <input
        className={join("input-number", `input-number--${size}`)}
        // CAUTION:
        // Native type number inputs are poorly implemented so we resort to customizing a string input
        // (See https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
        // For instance, it is impossible to clear a type number input
        type="text"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onBlur={onBlur}
        onInput={onInput}
      />
      {isTouched || isSubmitted ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : undefined}
      {unit ? (
        <Code>
          <UnitLabel unit={unit} />
        </Code>
      ) : undefined}
    </>
  );
};

type UnitProps = { unit: Unit };

const UnitLabel = ({ unit }: UnitProps) => {
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
