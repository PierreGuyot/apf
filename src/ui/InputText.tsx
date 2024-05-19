import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import { join } from "./helpers/helpers";
import "./input-text.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean } from "./helpers/state";

type InputTextProps = InputProps<string> & {
  placeholder?: string;
  isFullWidth?: boolean;
};

export const InputText = ({
  value,
  label,
  placeholder,
  isFullWidth,
  errorMessage,
  isSubmitted,
  isReadOnly,
  onChange,
}: InputTextProps) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    onChange(inputEvent.value);
  };

  return (
    <>
      {label ? <Label label={label} /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <>
          <input
            className={join(
              "input-text",
              isFullWidth ? "input-text--is-full-width" : undefined,
            )}
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
      )}
    </>
  );
};
