import { useMemo } from "react";
import { Checkbox } from "./Checkbox";
import "./checkbox-list.css";
import { Option, OptionValue } from "./helpers/options";
import { Language, translate } from "./language";

type Props<T extends OptionValue> = {
  language: Language;
  title?: string;
  values: T[];
  items: Option<T>[];
  onChange: (value: T[]) => void;
};

export function CheckboxList<T extends OptionValue>({
  language,
  title,
  values,
  items,
  onChange: _onChange,
}: Props<T>) {
  const valueSet = useMemo(() => new Set(values), [values]);

  return (
    <div>
      {title ? (
        <div className="checkbox-list-title">{translate(title, language)}</div>
      ) : undefined}
      {items.map((item) => {
        const isChecked = valueSet.has(item.value);

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
