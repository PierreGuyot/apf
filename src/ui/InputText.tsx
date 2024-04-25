import { useState } from "react";
import { InputProps, OnInput } from "./input.types";
import "./input-text.css";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type InputTextProps = InputProps<string> & {
  placeholder?: string;
};

export const InputText = ({
  value,
  label,
  placeholder,
  errorMessage,
  isSubmitted,
  onChange,
}: InputTextProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    onChange(inputEvent.value);
  };

  return (
    <>
      {label ? <Label label={label} /> : undefined}
      <input
        className="input-text"
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onInput={onInput}
      />
      {isTouched || isSubmitted ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : undefined}
    </>
  );
};
