import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SubSection } from "../../ui/SubSection";
import { Block, Result, ResultOptions } from "./_helpers";

export const BlockSection = ({
  block,
  options,
  onChange,
}: {
  block: Block;
  options: ResultOptions;
  onChange: (value: Block) => void;
}) => {
  const setResult = (updatedResult: Result) =>
    onChange({ ...block, result: updatedResult });

  return (
    <SubSection key={block.index} title={`Bloc ${block.index}`}>
      <Line>
        <Select
          label="Quel est le résultat de l'immunohistochimie ?"
          name="Résultat immunohistochimie"
          options={options}
          value={block.result}
          onChange={setResult}
        />
      </Line>
    </SubSection>
  );
};
