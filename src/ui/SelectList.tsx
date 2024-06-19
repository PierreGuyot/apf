import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Pill } from "./Pill";
import { Tooltip } from "./Tooltip";
import { FieldProps } from "./helpers/fields";
import { noop } from "./helpers/helpers";
import { Option, OptionValue } from "./helpers/options";
import { DEFAULT_LANGUAGE, Language, translate } from "./language";
import "./select-list.css";

type ItemGroup<T extends OptionValue> = {
  title: string;
  items: Option<T>[];
};

type Props<T extends OptionValue> = FieldProps<T[]> & {
  emptyState?: string;
  language?: Language;
  groups: ItemGroup<T>[];
};

export function getSelectedItems<T extends OptionValue>({
  groups,
  value,
}: {
  groups: ItemGroup<T>[];
  value: T[];
}) {
  return groups
    .flatMap((group) => group.items)
    .filter((item) => value.includes(item.value));
}

// TODO clean: add label prop?

export function SelectList<T extends OptionValue>({
  language = DEFAULT_LANGUAGE,
  emptyState,
  groups,
  value,
  isReadOnly,
  onChange,
}: Props<T>) {
  const selectedItems = getSelectedItems({ groups, value });

  // Internal state of the tooltip
  const [state, setState] = useState<T[]>(value);
  useEffect(() => setState(value), [value]);

  const onCommit = () => onChange(state);

  if (isReadOnly) {
    return selectedItems
      .map((item) => translate(item.label, language))
      .join(" + ");
  }

  // TODO clean: add a label prop?

  return (
    <div className="select-list">
      <Tooltip
        mode="click"
        content={
          <div className="select-list-tooltip">
            {groups.map((group) => (
              <CheckboxList
                language={language}
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
        <Pill
          key={String(item.value)}
          label={translate(item.label, language)}
        />
      ))}
      {selectedItems.length ? undefined : (
        <div className="select-list-empty-state">{emptyState}</div>
      )}
    </div>
  );
}
