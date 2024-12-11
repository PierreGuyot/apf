import {
  AntibodyData,
  Block,
  IhcState,
} from "../../common/immunohistochemistry/helpers";
import {
  COLON_CHARACTER,
  Language,
  Lines,
  pad,
  reportSection,
  translate,
} from "../../ui";
import { getResultOption } from "./helpers";

export const reportImmunohistochemistry = (
  ihc: IhcState,
  language: Language,
  hasMultipleBlocks: boolean,
): Lines => {
  if (!ihc.hasIhc) {
    return [];
  }

  return reportSection({
    title: "Immunohistochimie",
    language,
    content: ihc.blocks.flatMap((block) =>
      renderBlock(block, language, hasMultipleBlocks),
    ),
  });
};

const renderBlock = (block: Block, language: Language, hasTitle: boolean) => {
  const antibodies = block.antibodies.flatMap((antibody) =>
    renderAntibody(antibody, language),
  );

  if (!hasTitle) {
    return antibodies;
  }

  const t = (value: string) => translate(value, language);
  const colon = t(COLON_CHARACTER);

  return [`${t("Bloc")} ${block.index}${colon}`, ...antibodies.map(pad)];
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
