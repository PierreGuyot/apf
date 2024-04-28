import { useState } from "react";
import { Code } from "./Code";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import { InputProps, OnInput } from "./input.types";
import "./input-number.css";

type Unit = "ng-per-mL";

type InputNumberProps = InputProps<number> & {
  min?: number;
  max?: number;
  unit?: Unit;
};

export const InputNumber = ({
  value,
  label,
  min,
  max,
  unit,
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

    if (isNaN(valueAsNumber)) {
      return;
    }

    onChange(valueAsNumber);
  };

  return (
    <>
      {label ? <Label label={label} /> : undefined}
      <input
        className="input-number"
        type="text"
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
