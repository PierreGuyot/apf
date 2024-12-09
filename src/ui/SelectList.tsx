import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { CheckboxList } from "./CheckboxList";
import { noop } from "./helpers/helpers";
import { OptionGroup, OptionValue } from "./helpers/options";
import { Label } from "./Label";
import { Pill } from "./Pill";
import css from "./select-list.module.css";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Tooltip } from "./Tooltip";
import { DEFAULT_LANGUAGE, Language, translate } from "./translation";

type Props<T extends OptionValue> = {
  values: T[];
  onChange: (values: T[]) => void;
  isReadOnly?: boolean;
  label?: string;
  emptyState?: string;
  hasList?: boolean;
  language?: Language;
  // TODO: use OptionOrGroup instead
  groups: OptionGroup<T>[];
};

export function getSelectedOptions<T extends OptionValue>({
  groups,
  values,
}: {
  // TODO: use OptionOrGroup instead
  groups: OptionGroup<T>[];
  values: T[];
}) {
  return groups
    .flatMap((group) => group.options)
    .filter((item) => values.includes(item.value));
}

export function SelectList<T extends OptionValue>({
  language = DEFAULT_LANGUAGE,
  label,
  emptyState,
  hasList = true,
  groups,
  values,
  isReadOnly,
  onChange,
}: Props<T>) {
  // Internal state of the tooltip
  const [_values, _setValues] = useState<T[]>(values);
  useEffect(() => _setValues(values), [values]);

  const content = useMemo(() => {
    const selectedOptions = getSelectedOptions({ groups, values: _values });

    if (isReadOnly) {
      return selectedOptions
        .map((option) => translate(option.label, language))
        .join(" + ");
    }

    const onCommit = () => {
      // CAUTION: this must match option orders
      onChange(selectedOptions.map((option) => option.value));
    };

    return (
      <>
        <Tooltip
          mode="click"
          content={
            <Stack spacing="md">
              {groups.map((group) => (
                <CheckboxList
                  key={group.title}
                  title={group.title}
                  options={group.options}
                  values={_values}
                  onChange={_setValues}
                />
              ))}
            </Stack>
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
              <div className={css.emptyState}>
                <Text size="sm" color="secondary">
                  {emptyState}
                </Text>
              </div>
            )}
          </>
        ) : undefined}
      </>
    );
  }, [emptyState, groups, hasList, isReadOnly, language, onChange, _values]);

  return (
    // TODO clean: mutualize style with other inputs and selects
    <Stack direction="row" alignItems="center" wrap="wrap" spacing="sm">
      {label ? <Label label={label} /> : undefined}
      {content}
    </Stack>
  );
}
