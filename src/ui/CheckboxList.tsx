import { useMemo } from "react";
import { Checkbox } from "./Checkbox";
import { Option, OptionValue } from "./helpers/options";
import { Label } from "./Label";

type Props<T extends OptionValue> = {
  title?: string;
  options: readonly Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  // TODO clean: handle isReadOnly prop
};

export function CheckboxList<T extends OptionValue>({
  title,
  values,
  options,
  onChange: _onChange,
}: Props<T>) {
  const valueSet = useMemo(() => new Set(values), [values]);

  return (
    <div>
      {title ? (
        <Label label={title} placement="above" variant="bold"></Label>
      ) : undefined}
      <div>
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
              label={item.label}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
}
