// TODO: add translations

import { OTHER_ITEM, toOption } from "../../../ui";

const SURGERY_TYPES = [
  "Thyroïdectomie totale",
  "Lobectomie droite",
  "Lobo-isthmectomie droite",
  "Lobectomie gauche",
  "Lobo-isthmectomie gauche",
  "Isthmectomie",
] as const;
export const SURGERY_TYPE_OPTIONS = SURGERY_TYPES.map(toOption);
export type SurgeryType = (typeof SURGERY_TYPE_OPTIONS)[number]["value"];

const FOCALITIES = ["Unifocal", "Multifocal"] as const;
export const FOCALITY_OPTIONS = FOCALITIES.map(toOption);
export type Focality = (typeof FOCALITIES)[number];

const SITES = [
  "Lobe droit",
  "Lobe droit, tiers supérieur",
  "Lobe droit, tiers moyen",
  "Lobe droit, tiers inférieur",
  "Lobe gauche",
  "Lobe gauche, tiers supérieur",
  "Lobe gauche, tiers moyen",
  "Lobe gauche, tiers inférieur",
  "Isthme",
] as const;
export const SITE_OPTIONS = SITES.map(toOption);
export type Site = (typeof SITE_OPTIONS)[number]["value"];

const TUMOR_TYPES = [
  "Carcinome papillaire de la thyroïde, classique ",
  "Carcinome papillaire de la thyroïde, variante à cellules cylindriques",
  "Carcinome papillaire de la thyroïde, variante cribriforme-morulaire",
  "Carcinome papillaire de la thyroïde, variante diffuse sclérosante",
  "Carcinome papillaire de la thyroïde, variante encapsulée",
  "Carcinome papillaire de la thyroïde, variante folliculaire encapsulée avec invasion minime",
  "Carcinome papillaire de la thyroïde, variante folliculaire encapsulée avec invasion vasculaire focale",
  "Carcinome papillaire de la thyroïde, variante folliculaire encapsulée avec invasion vasculaire extensive",
  "Carcinome papillaire de la thyroïde, variante folliculaire encapsulée avec invasion massive",
  "Carcinome papillaire de la thyroïde, variante folliculaire infiltrante",
  "Carcinome papillaire de la thyroïde, variante en clou de tapissier",
  "Microcarcinome papillaire de la thyroïde",
  "Carcinome papillaire de la thyroïde, variante oncocytaire",
  "Carcinome papillaire de la thyroïde, variante solide",
  "Carcinome papillaire de la thyroïde, variante à cellules hautes",
  "Carcinome papillaire de la thyroïde, variante Whartin-like",
  "Carcinome folliculaire de la thyroïde avec invasion minime",
  "Carcinome folliculaire de la thyroïde avec invasion vasculaire focale",
  "Carcinome folliculaire de la thyroïde avec invasion vasculaire extensive",
  "Carcinome folliculaire de la thyroïde avec invasion massive",
  "Carcinome à cellules oncocytaires de la thyroïde avec invasion minime",
  "Carcinome à cellules oncocytaires de la thyroïde avec invasion vasculaire focale",
  "Carcinome à cellules oncocytaires de la thyroïde avec invasion vasculaire extensive",
  "Carcinome à cellules oncocytaires de la thyroïde avec invasion massive",
  "Carcinome peu différencié de la thyroïde",
  "Carcinome anaplasique de la thyroïde",
  "Carcinome épidermoïde ",
  "Carcinome médullaire de la thyroïde",
  "Carcinome mixte médullaire et folliculaire de la thyroïde",
  "Carcinome muco-épidermoïde ",
  "Carcinome muco-épidermoïde sclérosant avec éosinophiles",
  "Carcinome mucineux",
  "Tumeur épithéliale fusiforme avec différenciation thymique-like",
  "Carcinome thymique intra-thyroïdien",
] as const;
export const TUMOR_TYPE_OPTIONS = [...TUMOR_TYPES.map(toOption), OTHER_ITEM];
export type TumorType = (typeof TUMOR_TYPE_OPTIONS)[number]["value"];
