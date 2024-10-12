import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";
import css from "./input-text-area.module.css";
import { InputProps, OnInput } from "./input.types";
import { useBoolean } from "./helpers/state";

type Props = InputProps<string> & {
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
  isReadOnly,
  onChange,
}: Props) => {
  const [isTouched, setIsTouched] = useBoolean(false);
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
    <div style={{ display: "flex", flexDirection: "column" }}>
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
    </div>
  );
};
