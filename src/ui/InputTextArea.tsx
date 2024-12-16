import { ErrorList } from "./ErrorList";
import { filterNullish } from "./helpers";
import { HelpIcon } from "./HelpIcon";
import css from "./input-text-area.module.css";
import { InputProps, OnInput } from "./input.types";
import { Label } from "./Label";
import { Stack } from "./Stack";

type Props = InputProps<string> & {
  placeholder?: string;
  // TODO clean: use T-shirt sizes
  lineCount?: number;
};

const DEFAULT_LINE_COUNT = 6;

export const InputTextArea = ({
  value,
  label,
  placeholder,
  lineCount = DEFAULT_LINE_COUNT,
  errors: errorMessageProp,
  isSubmitted = true,
  isReadOnly,
  onChange,
}: Props) => {
  const onInput: OnInput<HTMLTextAreaElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLTextAreaElement;
    onChange(inputEvent.value);
  };

  const errorMessage = (
    Array.isArray(errorMessageProp) ? errorMessageProp : [errorMessageProp]
  ).filter(filterNullish);

  return (
    <Stack spacing="xs">
      <Stack direction="row" alignItems="center" spacing="sm">
        {label ? (
          <Label label={label} size="md" placement="above" />
        ) : undefined}
        {isSubmitted && errorMessage.length ? (
          <HelpIcon
            variant="error"
            size="xs"
            content={<ErrorList errors={errorMessage} />}
          />
        ) : undefined}
      </Stack>

      {isReadOnly ? (
        value
      ) : (
        <textarea
          className={css.input}
          value={value}
          rows={lineCount}
          placeholder={placeholder}
          onInput={onInput}
        />
      )}
    </Stack>
  );
};
