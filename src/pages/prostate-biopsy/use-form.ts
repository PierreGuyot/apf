import { useCallback, useState } from "react";

// TODO: move to /ui folder

export const useForm = <State>(getInitialState: () => State) => {
  const [state, _setState] = useState<State>(getInitialState());

  const setState = useCallback(
    <K extends keyof State>(key: K) =>
      (value: State[K]) =>
        _setState({ ...state, [key]: value }),
    [state],
  );

  const clearState = useCallback(
    () => _setState(getInitialState()),
    [getInitialState],
  );

  return { state, setState, clearState };
};
