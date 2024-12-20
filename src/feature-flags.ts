const FEATURE_FLAGS = {
  // Forms: each form has an individual feature flag
  "prostate-biopsy-transrectal": true,
  "prostate-biopsy-transperineal": true,
  "prostate-transurethral-resection": true,
  "prostate-holmium-laser-enucleation": true,
  "bladder-transurethral-resection": true,
  "invasive-melanoma": true,
  thyroid: false,
  dermatology: true,
} as const;

type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const isFeatureFlagEnabled = (value: FeatureFlag) =>
  FEATURE_FLAGS[value];
