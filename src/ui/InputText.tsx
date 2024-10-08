import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import { join } from "./helpers/helpers";
import "./input-text.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean } from "./helpers/state";

type Props = InputProps<string> & {
  placeholder?: string;
  labelSize?: "sm" | "md";
  isFullWidth?: boolean;
};

export const InputText = ({
  value,
  label,
  labelSize = "md",
  placeholder,
  isFullWidth,
  errorMessage,
  isSubmitted,
  isReadOnly,
  onChange,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    onChange(inputEvent.value);
  };

  return (
    /* TODO clean: extract label style */
    <div
      className={join(
        "input-text-container",
        `input-text-container--${labelSize}`,
      )}
    >
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
    </div>
  );
};
