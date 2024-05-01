import { Language } from "../../ui/helpers.types";
import { PiradsItem, Row, Score } from "./helpers";

type FormState = {
  hasInfo: boolean;
  hasTarget: boolean;
  targetCount: number;
  hasMri: boolean;
  psaRate: number;
  containerCount: number;
  piradsItems: PiradsItem[];
  score: Score;
  rows: Row[];
  comment: string;
  language: Language;
};

// TODO: un-mock
const mockGetContent = (form: FormState & {}) => JSON.stringify(form, null, 2);

// TODO: test thoroughly
export const generateReport = (form: FormState): string => {
  switch (form.language) {
    case "FR": {
      return mockGetContent(form);
    }

    case "EN": {
      return mockGetContent(form);
    }
  }
};
