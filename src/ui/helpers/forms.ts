import { isFeatureFlagEnabled } from "../../feature-flags";
import skinPath from "./../../images-who/skin.png";
import uroPath from "./../../images-who/uro.png";

// For a good reading experience, line width must be capped
export const FORM_MAX_WIDTH = "800px";

// TODO CLEAN: clarify naming conventions
type Category = "maleGenitalia" | "skin";

export const FORM_IDS = [
  "prostate-biopsy-transrectal",
  "prostate-biopsy-transperineal",
  "prostate-transurethral-resection",
  "prostate-holmium-laser-enucleation",
  "bladder-transurethral-resection",
  "dermatology",
] as const;

export type FormId = (typeof FORM_IDS)[number];

export const isFormId = (value: string): value is FormId =>
  FORM_IDS.some((item) => item === value);

export const FORMS: Record<
  FormId,
  {
    title: string;
    category: Category;
    isPrototype: boolean;
    lastUpdate: number; // Timestamp in milliseconds
  }
> = {
  "prostate-biopsy-transrectal": {
    title: "Biopsies prostatiques transrectales écho-guidées",
    category: "maleGenitalia",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
  "prostate-biopsy-transperineal": {
    title: "Biopsies prostatiques transpérinéales écho-guidées",
    category: "maleGenitalia",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
  "prostate-transurethral-resection": {
    title: "Résection transurétrale de prostate",
    category: "maleGenitalia",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
  "prostate-holmium-laser-enucleation": {
    title: "Enucléation au laser holnium de la prostate",
    category: "maleGenitalia",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
  "bladder-transurethral-resection": {
    title: "Résection transurétrale de vessie",
    category: "maleGenitalia",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
  dermatology: {
    title: "Dermatologie",
    category: "skin",
    isPrototype: true,
    lastUpdate: new Date(String("Sat Oct 19 2024")).getTime(),
  },
};

const getFormCategories = () => {
  // TODO CLEAN: generate from a list of categories
  const categories: Record<Category, FormId[]> = {
    maleGenitalia: [],
    skin: [],
  };

  for (const id in FORMS) {
    if (isFormId(id) && isFeatureFlagEnabled(id)) {
      const { category } = FORMS[id];
      categories[category].push(id);
    }
  }

  return Object.entries(categories)
    .filter(([_category, routes]) => routes.length)
    .map(([category, routes]) => ({
      // CAUTION: this cast is type-unsafe
      category: category as Category,
      routes,
    }));
};

export const FORM_CATEGORIES = getFormCategories();

const PROPS_BY_CATEGORY: Record<
  Category,
  { label: string; imagePath: string }
> = {
  skin: { label: "Peau", imagePath: skinPath },
  maleGenitalia: { label: "Appareil urogénital masculin", imagePath: uroPath },
};

export const getCategoryProps = (category: Category) =>
  PROPS_BY_CATEGORY[category];
