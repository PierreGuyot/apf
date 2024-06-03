import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Pill } from "./Pill";
import { Tooltip } from "./Tooltip";
import { noop } from "./helpers/helpers";
import { Option, SelectValue } from "./helpers/options";
import "./select-list.css";
import { FieldProps } from "./helpers/fields";
import { DEFAULT_LANGUAGE, Language, translate } from "./language";

type ItemGroup<T extends SelectValue> = {
  title: string;
  items: Option<T>[];
};

type Props<T extends SelectValue> = FieldProps<T[]> & {
  language?: Language;
  groups: ItemGroup<T>[];
};

export function getSelectedItems<T extends SelectValue>({
  language,
  groups,
  value,
}: {
  language: Language;
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
  const selectedItems = getSelectedItems({ language, groups, value });

  // Internal state of the tooltip
  const [state, setState] = useState<T[]>(value);
  useEffect(() => setState(value), [value]);

  const onCommit = () => onChange(state);

  if (isReadOnly) {
    return selectedItems
      .map((item) => translate(item.label, language))
      .join(" + ");
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
