import { ErrorMessage, InputNumber, NestedItem, Option, patchState } from "./";

type Composition<T extends string> = Partial<Record<T, number>>;

type Props<T extends string> = {
  items: readonly Option<T>[];
  value: Composition<T>;
  onChange: (value: Composition<T>) => void;
  error?: string;
};

// TODO clean: rework visuals
export function SelectComposition<T extends string>({
  items,
  value,
  onChange,
  error,
}: Props<T>) {
  const setField = patchState(value, onChange);
  return (
    <NestedItem>
      {items.map((item) => (
        <InputNumber
          label={item.label}
          min={0}
          max={100}
          key={item.value}
          value={value[item.value] ?? 0}
          onChange={setField(item.value)}
        />
      ))}
      {error ? <ErrorMessage errorMessage={error} /> : undefined}
    </NestedItem>
  );
}
