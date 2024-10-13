import css from "./checkbox.module.css";
import { noop } from "./helpers/helpers";
import { Stack } from "./Stack";
import { Text } from "./Text";

type Props = {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  // TODO clean: handle isReadOnly prop
};

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  return (
    <Stack direction="row" alignItems="center" onClick={onChange} spacing="sm">
      <input
        type="checkbox"
        className={css.input}
        checked={isChecked}
        onChange={noop}
      />
      <Text shouldWrap={false}>{label}</Text>
    </Stack>
  );
};
