import { useState } from "react";
import { Code } from "./Code";

type Unit = "ng-per-mL";

type InputNumberProps = {
  value: number;
  label?: string;
  min?: number;
  max?: number;
  unit?: Unit;
  errorMessage?: string;
  isSubmitted?: boolean;
  onChange: (value: number) => void;
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
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    // CAUTION: this cast is type-unsafe
    const InputEvent = e.target as HTMLInputElement;
    const valueAsNumber = Number(InputEvent.value);

    if (isNaN(valueAsNumber)) {
      return;
    }

    onChange(valueAsNumber);
  };

  return (
    <>
      {label ? <label>{label}</label> : undefined}
      <input
        className="number"
        type="text"
        value={value}
        min={min}
        max={max}
        onBlur={onBlur}
        onInput={onInput}
      />
      {isTouched || isSubmitted ? <div>{errorMessage}</div> : undefined}
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
