import { useState } from "react";
import { InputProps, OnInput } from "./input.types";
import "./input-text-area.css";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

type InputTextAreaProps = InputProps<string> & {
  placeholder?: string;
  lineCount?: number;
};

const DEFAULT_LINE_COUNT = 6;

export const InputTextArea = ({
  value,
  label,
  placeholder,
  lineCount = DEFAULT_LINE_COUNT,
  errorMessage,
  isSubmitted,
  onChange,
}: InputTextAreaProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLTextAreaElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLTextAreaElement;

    // Match the size of the text area with the number of lines it contains
    inputEvent.style.height = "inherit";
    inputEvent.style.height = `${inputEvent.scrollHeight}px`;

    onChange(inputEvent.value);
  };

  return (
    <>
      {label ? <Label label={label} placement="above" /> : undefined}
      <textarea
        className="input-text-area"
        value={value}
        rows={lineCount}
        placeholder={placeholder}
        onBlur={onBlur}
        onInput={onInput}
      />
      {isTouched || isSubmitted ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : undefined}
    </>
  );
};
