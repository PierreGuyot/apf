import { useCallback, useState } from "react";

export type SetState<State> = <K extends keyof State>(
  key: K,
) => (value: State[K]) => void;

export const useForm = <State>(getInitialState: () => State) => {
  const [state, _setState] = useState<State>(getInitialState());

  const setState: SetState<State> = useCallback(
    (key) => (value) => _setState({ ...state, [key]: value }),
    [state],
  );

  const clearState = useCallback(
    () => _setState(getInitialState()),
    [getInitialState],
  );

  return { state, setState, clearState };
};
