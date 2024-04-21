import { useState } from "react";

type InputProps = {
  value: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
  onChange: (value: string) => void;
};

export const Input = ({
  value,
  label,
  placeholder,
  errorMessage,
  isSubmitted,
  onChange,
}: InputProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const onBlur = () => setIsTouched(true);
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    // CAUTION: this cast is type-unsafe
    const InputEvent = e.target as HTMLInputElement;
    onChange(InputEvent.value);
  };

  return (
    <>
      {label ? <label>{label}</label> : undefined}
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onInput={onInput}
      />
      {isTouched || isSubmitted ? <div>{errorMessage}</div> : undefined}
    </>
  );
};
