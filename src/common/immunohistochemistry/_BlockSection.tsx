import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SubSection } from "../../ui/SubSection";
import {
  ANTIBODIES_PROPERTIES,
  Antibody,
  AntibodyTarget,
  Block,
  RESULT_OPTIONS,
  Result,
} from "./_helpers";

export const BlockSection = ({
  block,
  antibody,
  onChange,
}: {
  block: Block;
  onChange: (value: Block) => void;
  antibody: Antibody;
}) => {
  const { targets } = ANTIBODIES_PROPERTIES[antibody];

  // TODO clean: simplify by reworking data structure
  const resultOptions = RESULT_OPTIONS.map((item) => {
    const matchingTargetOption = targets.find((t) => t.value === block.target);
    if (!matchingTargetOption) {
      throw new Error("Invalid value");
    }

    const conclusion = matchingTargetOption.conclusions[block.result];
    return { value: item.value, label: `${item.label} (${conclusion})` };
  });

  const setTarget = (updatedTarget: AntibodyTarget) =>
    onChange({ ...block, target: updatedTarget });
  const setResult = (updatedResult: Result) =>
    onChange({ ...block, result: updatedResult });

  return (
    <SubSection key={block.index} title={`Bloc ${block.index}`}>
      <Line>
        <Select
          label="Sur quel type de cellules ?"
          name="Cible anticorps"
          options={targets}
          value={block.target}
          onChange={setTarget}
        />
      </Line>
      <Line>
        <Select
          label="Quel est le résultat de l'immunohistochimie ?"
          name="Résultat immunohistochimie"
          options={resultOptions}
          value={block.result}
          onChange={setResult}
        />
      </Line>
    </SubSection>
  );
};
