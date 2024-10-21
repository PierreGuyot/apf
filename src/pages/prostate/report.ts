import {
  AntibodyData,
  Block,
  IhcState,
} from "../../common/immunohistochemistry/helpers";
import { COLON_CHARACTER, joinLines, Language, pad, translate } from "../../ui";
import { getResultOption } from "./helpers";

export const getImmunohistochemistrySection = (
  ihc: IhcState,
  language: Language,
  hasMultipleBlocks: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  if (!ihc.hasIhc) {
    return undefined;
  }

  return joinLines([
    `${t("Immunohistochimie")}${colon}`,
    ...ihc.blocks.flatMap((block) =>
      renderBlock(block, language, hasMultipleBlocks),
    ),
  ]);
};

const renderBlock = (
  block: Block,
  language: Language,
  hasMultipleBlocks: boolean,
) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return [
    hasMultipleBlocks ? `${t("Bloc")} ${block.index}${colon}` : undefined,
    ...block.antibodies
      .flatMap((antibody) => renderAntibody(antibody, language))
      .map(pad),
  ];
};

const renderAntibody = (antibody: AntibodyData, language: Language) => {
  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  if (antibody.type === "others") {
    return antibody.values.map(
      (value) =>
        `${value.name} (clone ${value.clone})${colon} ${t(value.result)}`,
    );
  }

  const { label } = getResultOption(antibody.result);

  return [
    `${t(antibody.type)} (${t("clone")} ${antibody.clone})${colon} ${t(label).toLocaleLowerCase()}`,
  ];
};
