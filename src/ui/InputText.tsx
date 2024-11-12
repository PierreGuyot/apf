import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import { join } from "./helpers/helpers";
import css from "./input-text.module.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean } from "./helpers/state";
import { Stack } from "./Stack";

type InputType = "text" | "password";

type Props = InputProps<string> & {
  type?: InputType;
  placeholder?: string;
  labelSize?: "sm" | "md";
  isFullWidth?: boolean;
  onReturn?: () => void;
};

export const InputText = ({
  type = "text",
  value,
  label,
  labelSize = "md",
  placeholder,
  isFullWidth,
  errorMessage,
  isSubmitted,
  isReadOnly,
  onChange,
  onReturn,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    onChange(inputEvent.value);
  };

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" alignItems="center" spacing="sm">
      {label ? <Label label={label} size={labelSize} /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <>
          <input
            className={join(
              css.input,
              isFullWidth ? css.isFullWidth : undefined,
            )}
            type={type}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onInput={onInput}
            onKeyDown={(e) => {
              if (onReturn && e.key === "Enter") {
                onReturn();
              }
            }}
          />
          {isTouched || isSubmitted ? (
            <ErrorMessage errorMessage={errorMessage} />
          ) : undefined}
        </>
      )}
    </Stack>
  );
};
