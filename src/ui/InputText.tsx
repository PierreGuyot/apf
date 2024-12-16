import { ErrorList } from "./ErrorList";
import { filterNullish, join } from "./helpers/helpers";
import { HelpIcon } from "./HelpIcon";
import css from "./input-text.module.css";
import { InputProps, OnInput } from "./input.types";
import { Label } from "./Label";
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
  errors: errorMessageProp,
  isSubmitted = true,
  isReadOnly,
  onChange,
  onReturn,
}: Props) => {
  const onInput: OnInput<HTMLInputElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLInputElement;
    onChange(inputEvent.value);
  };

  const errorMessage = (
    Array.isArray(errorMessageProp) ? errorMessageProp : [errorMessageProp]
  ).filter(filterNullish);

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" spacing="sm">
      {label ? <Label label={label} size={labelSize} /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <Stack spacing="sm" direction="row" alignItems="center">
          <input
            className={join(
              css.input,
              isFullWidth ? css.isFullWidth : undefined,
            )}
            type={type}
            placeholder={placeholder}
            value={value}
            onInput={onInput}
            onKeyDown={(e) => {
              if (onReturn && e.key === "Enter") {
                onReturn();
              }
            }}
          />
          {isSubmitted && errorMessage.length ? (
            <HelpIcon
              variant="error"
              size="xs"
              content={<ErrorList errors={errorMessage} />}
            />
          ) : undefined}
        </Stack>
      )}
    </Stack>
  );
};
