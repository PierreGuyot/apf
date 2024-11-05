import { Language, translate } from "../../ui";
import {
  ColorationType,
  getSamplingTypeOption,
  SamplingType,
} from "./validation";

export const getResectionMacroscopySection = (
  form: {
    chipWeight: number; // In grams
    blockCount: number;
    samplingType: SamplingType;
    coloration: ColorationType;
  },
  language: Language,
) => {
  const t = (value: string) => translate(value, language);

  const { label: samplingTypeLabel } = getSamplingTypeOption(form.samplingType);

  return [
    `${t("Poids des copeaux")} : ${form.chipWeight}g`,
    // NOTE: inline translation
    language === "FR"
      ? `${t(samplingTypeLabel)} en ${form.blockCount} blocs (fixation : formol tamponné 4%, coloration ${form.coloration})`
      : `${t(samplingTypeLabel)} in ${form.blockCount} blocks (fixation : buffered formalin 4%, stain ${form.coloration})`,
  ];
};
