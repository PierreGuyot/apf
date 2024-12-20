import { useCallback, useMemo, useState } from "react";

/**
 * A helper to convert a setter from React to a callback than can edit one field at a time
 *
 * For instance:
 *
 * With a basic setter from React:
 * const [form, setForm] = useState<Form>(...);
 * setForm({...form, name: value})
 *
 * With the patched setter:
 * const setField = patchState(form, setForm);
 * setField('name')(value)
 *
 * This might seem to be a bit complex at first, but it's actually very straightforward, simple sugar.
 * It allows for way cleaner form syntax, especially when composing them.
 */
// TODO CLEAN: consider renaming
// TODO CLEAN: explore nested update (hard to implement has it requires recursive types)
export const patchState =
  <State>(state: State, setState: (value: State) => void): SetState<State> =>
  (key) =>
  (value) =>
    setState({ ...state, [key]: value });

type SetState<State> = <K extends keyof State>(
  key: K,
) => (value: State[K]) => void;

// TODO CLEAN: consider creating a `useValue` helper ({value: T, errors: string[], set: (value: T) => void })
// to facilitate adding in-line validations
// This would mean passing a validation function to useForm

export const useForm = <State>(getInitialState: () => State) => {
  const [state, setState] = useState<State>(getInitialState());

  const setField = useMemo(() => patchState(state, setState), [state]);

  const clearState = useCallback(
    () => setState(getInitialState()),
    [getInitialState],
  );

  // TODO CLEAN: consider changing setState type everywhere to match React's setState function signature:
  // setState: (value: State) => void)
  //   would become
  // setState: (updater: (currentState: State) => State) => void)
  return { state, setState, setField, clearState };
};
