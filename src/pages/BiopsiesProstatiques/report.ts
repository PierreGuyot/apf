import { Language } from "../../ui/helpers.types";
import { Row, Score } from "./helpers";

const EMPTY_LINE = "";

// TODO: un-mock
const mockGetContent = ({
  score,
  rows,
  comment,
  language,
}: {
  score: Score;
  rows: Row[];
  comment: string;
  language: Language;
}) =>
  [
    language,
    EMPTY_LINE,
    JSON.stringify(score, null, 2),
    JSON.stringify(rows),
    EMPTY_LINE,
    comment,
  ].join("\n");

// TODO: test thoroughly
export const generateReport = ({
  score,
  rows,
  comment,
  language,
}: {
  score: Score;
  rows: Row[];
  comment: string;
  language: Language;
}): string => {
  switch (language) {
    case "FR": {
      return mockGetContent({ score, rows, comment, language });
    }

    case "EN": {
      return mockGetContent({ score, rows, comment, language });
    }
  }
};
