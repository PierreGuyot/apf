// TODO: check naming in English with Louis
// TODO: extract a dedicated valueOf helper
export const LOCALIZATIONS = [
    'base-right',
    'medium-right',
    'apex-right',
    'base-left',
    'medium-left',
    'apex-left',
  ] as const;

export type Localization = (typeof LOCALIZATIONS)[number];
export const POT_TYPES = [
    'sextan',
    'target',
  ] as const;

export type PotType = (typeof POT_TYPES)[number];
  