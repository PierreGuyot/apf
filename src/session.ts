import { useCallback, useEffect, useState } from "react";
import { ONE_DAY } from "./ui";

const SESSION_KEY = "apf-session";

type SessionItem = { timestamp: number };

export const PASS_CODE = "b!chat";

export const log = () => {
  let now = Date.now();
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ timestamp: now } satisfies SessionItem),
  );
};

const getValue = () => {
  try {
    const item = sessionStorage.getItem(SESSION_KEY);
    if (!item) {
      return false;
    }
    const parsedItem: unknown = JSON.parse(item);

    // Tedious but straightforward check of the object structure (type-safe)
    if (
      parsedItem &&
      typeof parsedItem == "object" &&
      "timestamp" in parsedItem &&
      typeof parsedItem.timestamp === "number"
    ) {
      const timestamp = parsedItem.timestamp;
      const now = Date.now();
      return now - timestamp < ONE_DAY;
    }

    return false;
  } catch (e: unknown) {
    console.error(e);
    return false;
  }
};

export const useIsLogged = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const updateValue = useCallback(() => {
    const value = getValue();
    setIsLogged(value);
  }, []);

  useEffect(() => {
    updateValue();
    window.addEventListener("storage", updateValue);
    return () => window.removeEventListener("storage", updateValue);
  }, [updateValue]);

  return isLogged;
};
