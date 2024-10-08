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
import { Label } from "./Label";

export type ItemGroup<T extends OptionValue> = {
  title: string;
  options: Option<T>[];
};

type Props<T extends OptionValue> = FieldProps<T[]> & {
  label?: string;
  emptyState?: string;
  hasList?: boolean;
  language?: Language;
  groups: ItemGroup<T>[];
};

export function getSelectedOptions<T extends OptionValue>({
  groups,
  value,
}: {
  groups: ItemGroup<T>[];
  value: T[];
}) {
  return groups
    .flatMap((group) => group.options)
    .filter((item) => value.includes(item.value));
}

export function SelectList<T extends OptionValue>({
  language = DEFAULT_LANGUAGE,
  label,
  emptyState,
  hasList = true,
  groups,
  value,
  isReadOnly,
  onChange,
}: Props<T>) {
  const selectedOptions = getSelectedOptions({ groups, value });

  // Internal state of the tooltip
  const [state, setState] = useState<T[]>(value);
  useEffect(() => setState(value), [value]);

  const onCommit = () => onChange(state);

  if (isReadOnly) {
    return selectedOptions
      .map((option) => translate(option.label, language))
      .join(" + ");
  }

  // TODO clean: add a label prop?

  return (
    <div className="select-list">
      {label ? <Label label={label} /> : undefined}
      <Tooltip
        mode="click"
        content={
          <div className="select-list-tooltip">
            {groups.map((group) => (
              <CheckboxList
                language={language}
                key={group.title}
                title={group.title}
                options={group.options}
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
      {hasList ? (
        <>
          {selectedOptions.map((item) => (
            <Pill
              key={String(item.value)}
              label={translate(item.label, language)}
            />
          ))}
          {selectedOptions.length ? undefined : (
            <div className="select-list-empty-state">{emptyState}</div>
          )}
        </>
      ) : undefined}
    </div>
  );
}
