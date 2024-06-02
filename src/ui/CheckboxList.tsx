import { useMemo } from "react";
import { Checkbox } from "./Checkbox";
import "./checkbox-list.css";
import { Option, SelectValue } from "./helpers/options";

type Props<T extends SelectValue> = {
  title?: string;
  values: T[];
  items: Option<T>[];
  onChange: (value: T[]) => void;
};

export function CheckboxList<T extends SelectValue>({
  title,
  values,
  items,
  onChange: _onChange,
}: Props<T>) {
  const valueSet = useMemo(() => new Set(values), [values]);

  return (
    <div>
      <div className="checkbox-list-title">{title}</div>
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
            label={item.label}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}
