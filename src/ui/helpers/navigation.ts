import { useCallback, useEffect, useState } from "react";
import { FORM_IDS, FormId } from "./forms";

const getTrimmedHash = () => {
  const parts = window.location.hash.split("#");
  return parts[1];
};

const goTo = (newHash: Route) => {
  if (newHash !== window.location.hash) {
    window.location.hash = newHash;
  }
};

export const useHash = () => {
  const [hash, setHash] = useState(getTrimmedHash);

  const onHashChange = useCallback(() => setHash(getTrimmedHash()), []);
  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [onHashChange]);

  const updateHash = useCallback(goTo, [hash]);

  return { hash, updateHash };
};

export const INDEX_ROUTE = "";
export const goToIndex = () => goTo(INDEX_ROUTE);

export const FORM_ROUTES = FORM_IDS;

type Route = FormId | typeof INDEX_ROUTE;
