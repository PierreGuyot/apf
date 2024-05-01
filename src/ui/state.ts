import { useState } from "react";

const isDebug = true;

type Primitive = string | number | boolean;

type Atom<T extends Primitive> = [T, (value: T) => void];

export const useBoolean = (): Atom<boolean> => {
  const [value, setValue] = useState<boolean>(isDebug);
  return [value, setValue];
};

export const useString = (defaultValue: string = ""): Atom<string> => {
  const [value, setValue] = useState<string>(defaultValue);
  return [value, setValue];
};

export const useNumber = (defaultValue: number = 0): Atom<number> => {
  const [value, setValue] = useState<number>(defaultValue);
  return [value, setValue];
};
