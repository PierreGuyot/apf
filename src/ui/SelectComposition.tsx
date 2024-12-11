import { InputNumber, Option, patchState } from "./";

type Composition<T extends string> = Partial<Record<T, number>>;

type Props<T extends string> = {
  items: readonly Option<T>[];
  state: Composition<T>;
  setState: (value: Composition<T>) => void;
};

// TODO clean: rework visuals
// TODO clean: add to documentation
export function SelectComposition<T extends string>({
  items,
  state,
  setState,
}: Props<T>) {
  const setField = patchState(state, setState);
  return (
    <>
      {items.map((item) => (
        <InputNumber
          label={item.label}
          min={0}
          max={100}
          key={item.value}
          value={state[item.value] ?? 0}
          onChange={setField(item.value)}
        />
      ))}
      {/* TODO: insert validation on total */}
    </>
  );
}
