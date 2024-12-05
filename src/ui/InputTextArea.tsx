import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import css from "./input-text-area.module.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean } from "./helpers/state";
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
  errorMessage,
  isSubmitted,
  isReadOnly,
  onChange,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
  const onBlur = () => setIsTouched(true);
  const onInput: OnInput<HTMLTextAreaElement> = (e) => {
    // CAUTION: this cast is type-unsafe
    const inputEvent = e.target as HTMLTextAreaElement;
    onChange(inputEvent.value);
  };

  return (
    <Stack spacing="xs">
      {label ? <Label label={label} placement="above" /> : undefined}
      {isReadOnly ? (
        value
      ) : (
        <>
          <textarea
            className={css.input}
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
      )}
    </Stack>
  );
};
