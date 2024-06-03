import skinPath from "./../../images-who/skin.png";
import uroPath from "./../../images-who/uro.png";

export const FORMS = {
  "prostate-biopsy": {
    title: "Biopsies prostatiques transrectales écho-guidées",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
    path: uroPath,
  },
  dermatology: {
    title: "Dermatologie",
    lastUpdate: new Date(String("Mon May 20 2024")).getTime(),
    path: skinPath,
  },
} as const satisfies {
  [id: string]: {
    title: string;
    lastUpdate: number; // Timestamp in milliseconds
    path: string;
  };
};

// List of all the forms supported in the app
export type FormId = keyof typeof FORMS;

// CAUTION: this cast os type-unsafe
export const FORM_IDS = Object.keys(FORMS) as FormId[];

export const isFormId = (value: string): value is FormId => value in FORMS;
