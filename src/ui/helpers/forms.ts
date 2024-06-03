import skinPath from "./../../images-who/skin.png";
import uroPath from "./../../images-who/uro.png";

export const FORMS = {
  "prostate-biopsy-transrectal": {
    title: "Biopsies prostatiques transrectales écho-guidées",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
    imagePath: uroPath,
  },
  "prostate-biopsy-transperineal": {
    title: "Biopsies prostatiques transpérinéales écho-guidées",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
    imagePath: uroPath,
  },
  "transurethral-prostatic-resection": {
    title: "Résection transurétrale de prostate",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
    imagePath: uroPath,
  },
  dermatology: {
    title: "Dermatologie",
    lastUpdate: new Date(String("Mon May 20 2024")).getTime(),
    imagePath: skinPath,
  },
} as const satisfies {
  [id: string]: {
    title: string;
    lastUpdate: number; // Timestamp in milliseconds
    imagePath: string;
  };
};

// List of all the forms supported in the app
export type FormId = keyof typeof FORMS;

// CAUTION: this cast os type-unsafe
export const FORM_IDS = Object.keys(FORMS) as FormId[];

export const isFormId = (value: string): value is FormId => value in FORMS;
