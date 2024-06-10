import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Pill } from "./Pill";
import { Tooltip } from "./Tooltip";
import { FieldProps } from "./helpers/fields";
import { noop } from "./helpers/helpers";
import { Option, SelectValue } from "./helpers/options";
import { DEFAULT_LANGUAGE, Language, translate } from "./language";
import "./select-list.css";

type ItemGroup<T extends SelectValue> = {
  title: string;
  items: Option<T>[];
};

type Props<T extends SelectValue> = FieldProps<T[]> & {
  language?: Language;
  groups: ItemGroup<T>[];
};

export function getSelectedItems<T extends SelectValue>({
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

export function SelectList<T extends SelectValue>({
  language = DEFAULT_LANGUAGE,
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

  // TODO: add an emptyState: string prop
  // TODO: add a hasList?: boolean = true prop
  // TODO: add a label prop?

  return (
    <div>
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
      </div>
    </div>
  );
}
