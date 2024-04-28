// TODO: check naming in English with Louis
// TODO: extract a dedicated valueOf helper

import { Option } from "../../ui/options";

export type Location =
  | "base-right"
  | "medium-right"
  | "apex-right"
  | "base-left"
  | "medium-left"
  | "apex-left";

export const LOCATIONS: Option<Location>[] = [
  { value: "base-right", label: "Base droite" },
  { value: "medium-right", label: "Milieu droit" },
  { value: "apex-right", label: "Apex droit" },
  { value: "base-left", label: "Base gauche" },
  { value: "medium-left", label: "Milieu gauche" },
  { value: "apex-left", label: "Apex gauche" },
];

export type PotType = "sextan" | "target";

export const POT_TYPES: Option<PotType>[] = [
  { value: "sextan", label: "Sextant" },
  { value: "target", label: "Cible" },
] as const;

export type Pair = [number, number];

// TODO: flatten type to simplify Table access and update
export type Row = {
  index: number;
  type: PotType;
  location: Location;
  biopsy: {
    count: number;
    size: Pair;
  };
  tumor: {
    count: number;
    size: Pair;
    gleason: Pair;
    epn: boolean;
    tep: boolean;
    pin: boolean;
  };
  otherLesions: string;
};
