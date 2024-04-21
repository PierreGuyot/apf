import { useState } from "react";

const isDebug = true;

type Primitive = string | number | boolean;

type Atom<T extends Primitive> = [T, (value: T) => void];

export const useBoolean = (): Atom<boolean> => {
  const [value, setValue] = useState<boolean>(isDebug);
  return [value, setValue];
};

export const useString = (): Atom<string> => {
  const [value, setValue] = useState<string>("");
  return [value, setValue];
};

export const useNumber = (): Atom<number> => {
  const [value, setValue] = useState<number>(0);
  return [value, setValue];
};
