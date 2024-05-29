import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Tooltip } from "./Tooltip";
import { noop } from "./helpers/helpers";
import { FieldProps } from "./helpers/helpers.types";
import { Option, SelectValue } from "./helpers/options";
import { Pill } from "./Pill";
import "./select-list.css";
import { useEffect, useState } from "react";

type Props<T extends SelectValue> = FieldProps<T[]> & {
  items: Option<T>[];
};

export function SelectList<T extends SelectValue>({
  items,
  value,
  isReadOnly,
  onChange,
}: Props<T>) {
  const selectedItems = items.filter((item) => value.includes(item.value));

  // Internal state of the tooltip
  const [state, setState] = useState<T[]>(value);
  useEffect(() => setState(value), [value]);

  const onCommit = () => onChange(state);

  if (isReadOnly) {
    return selectedItems.map((item) => item.label).join(" + ");
  }

  return (
    <div>
      <div className="select-list">
        <Tooltip
          mode="click"
          content={
            <CheckboxList items={items} values={state} onChange={setState} />
          }
          onClose={onCommit}
        >
          <Button label="+" onClick={noop} />
        </Tooltip>
        {selectedItems.map((item) => (
          <Pill key={String(item.value)} label={item.label} />
        ))}
      </div>
    </div>
  );
}
