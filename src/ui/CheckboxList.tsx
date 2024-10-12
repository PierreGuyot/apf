import { useMemo } from "react";
import { Checkbox } from "./Checkbox";
import css from "./checkbox-list.module.css";
import { Option, OptionValue } from "./helpers/options";
import { Language, translate } from "./language";

type Props<T extends OptionValue> = {
  language: Language;
  title?: string;
  options: Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  // TODO clean: handle isReadOnly prop
};

export function CheckboxList<T extends OptionValue>({
  language,
  title,
  values,
  options,
  onChange: _onChange,
}: Props<T>) {
  const valueSet = useMemo(() => new Set(values), [values]);

  return (
    <div>
      {title ? (
        // TODO clean: use Label component
        <div className={css.label}>{translate(title, language)}</div>
      ) : undefined}
      {options.map((item) => {
        const isChecked = valueSet.has(item.value);

        // CAUTION: this not preserve option order
        const onChange = () => {
          const updatedValueSet = new Set(valueSet);
          if (isChecked) {
            updatedValueSet.delete(item.value);
          } else {
            updatedValueSet.add(item.value);
          }

          _onChange(Array.from(updatedValueSet));
        };

        return (
          <Checkbox
            key={String(item.value)}
            isChecked={isChecked}
            label={translate(item.label, language)}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}
