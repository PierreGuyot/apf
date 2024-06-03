import { Language, translate } from "../language";
import skinPath from "./../../images-who/skin.png";
import uroPath from "./../../images-who/uro.png";

type Category = "prostate" | "skin";

type FormItem = {
  title: string;
  lastUpdate: number; // Timestamp in milliseconds
  category: Category;
};

export const FORMS = {
  "prostate-biopsy-transrectal": {
    title: "Biopsies prostatiques transrectales écho-guidées",
    category: "prostate",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
  },
  "prostate-biopsy-transperineal": {
    title: "Biopsies prostatiques transpérinéales écho-guidées",
    category: "prostate",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
  },
  "transurethral-prostatic-resection": {
    title: "Résection transurétrale de prostate",
    category: "prostate",
    lastUpdate: new Date(String("Wed May 01 2024")).getTime(),
  },
  dermatology: {
    title: "Dermatologie",
    category: "skin",
    lastUpdate: new Date(String("Mon May 20 2024")).getTime(),
  },
} as const satisfies {
  [id: string]: FormItem;
};

const getRoutesByCategory = () => {
  const groupedForms: Record<Category, FormId[]> = {
    prostate: [],
    skin: [],
  };

  Object.entries(FORMS).forEach(([id, { category }]) => {
    // CAUTION: this cast is type-unsafe
    groupedForms[category] = groupedForms[category].concat(id as FormId);
  });

  return Object.entries(groupedForms).map(([category, routes]) => ({
    // CAUTION: this cast is type-unsafe
    category: category as Category,
    routes,
  }));
};

export const FORM_ROUTES = getRoutesByCategory();

// List of all the forms supported in the app
export type FormId = keyof typeof FORMS;

// CAUTION: this cast os type-unsafe
export const FORM_IDS = Object.keys(FORMS) as FormId[];

export const isFormId = (value: string): value is FormId => value in FORMS;

const PROPS_BY_CATEGORY: Record<
  Category,
  { label: string; imagePath: string }
> = {
  skin: { label: "Dermatologie", imagePath: skinPath },
  prostate: { label: "Prostate", imagePath: uroPath },
};

export const getCategoryProps = (category: Category) =>
  PROPS_BY_CATEGORY[category];

// Report helpers

export const getFormTitle = (formId: FormId, language: Language) =>
  translate(FORMS[formId].title, language).toLocaleUpperCase();
