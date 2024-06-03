import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Pill } from "./Pill";
import { Tooltip } from "./Tooltip";
import { noop } from "./helpers/helpers";
import { Option, SelectValue } from "./helpers/options";
import "./select-list.css";
import { FieldProps } from "./helpers/fields";

type ItemGroup<T extends SelectValue> = {
  title: string;
  items: Option<T>[];
};

type Props<T extends SelectValue> = FieldProps<T[]> & {
  groups: ItemGroup<T>[];
};

export function SelectList<T extends SelectValue>({
  groups,
  value,
  isReadOnly,
  onChange,
}: Props<T>) {
  const selectedItems = groups
    .flatMap((group) => group.items)
    .filter((item) => value.includes(item.value));

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
        {/* TODO: fix display when stuck to the right of the border */}
        <Tooltip
          mode="click"
          content={
            <div className="select-list-tooltip">
              {groups.map((group) => (
                <CheckboxList
                  key={group.title}
                  title={group.title}
                  items={group.items}
                  values={state}
                  onChange={setState}
                />
              ))}
            </div>
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
