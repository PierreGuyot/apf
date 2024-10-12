import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { Pill } from "./Pill";
import { Tooltip } from "./Tooltip";
import { FieldProps } from "./helpers/fields";
import { noop } from "./helpers/helpers";
import { Option, OptionValue } from "./helpers/options";
import { DEFAULT_LANGUAGE, Language, translate } from "./language";
import css from "./select-list.module.css";
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
  // Internal state of the tooltip
  const [state, setState] = useState<T[]>(value);
  useEffect(() => setState(value), [value]);

  const content = useMemo(() => {
    const selectedOptions = getSelectedOptions({ groups, value });

    if (isReadOnly) {
      return selectedOptions
        .map((option) => translate(option.label, language))
        .join(" + ");
    }

    const onCommit = () => onChange(state);

    return (
      <>
        <Tooltip
          mode="click"
          content={
            <div className={css.tooltip}>
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
          <Button _className={css.button} label="+" onClick={noop} />
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
              <div className={css.emptyState}>{emptyState}</div>
            )}
          </>
        ) : undefined}
      </>
    );
  }, [
    emptyState,
    groups,
    hasList,
    isReadOnly,
    language,
    onChange,
    state,
    value,
  ]);

  return (
    /* TODO clean: mutualize style with InputText */
    <div className={css.main}>
      {label ? <Label label={label} /> : undefined}
      {content}
    </div>
  );
}
