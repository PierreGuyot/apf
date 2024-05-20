export const FORMS = {
  "prostate-biopsy": {
    title: "Biopsies prostatiques transrectales",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
  },
  dermatology: {
    title: "Dermatologie",
    lastUpdate: new Date(String("Mon May 20 2024")).getTime(),
  },
} as const satisfies {
  [id: string]: {
    title: string;
    lastUpdate: number; // Timestamp in milliseconds
  };
};

// List of all the forms supported in the app
export type FormId = keyof typeof FORMS;
