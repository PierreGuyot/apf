import { useMemo } from "react";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { SubSection } from "../../ui/SubSection";
import { patchArray, range } from "../../ui/helpers/helpers";
import { SetState } from "../../ui/helpers/use-form";
import { BlockSection } from "./_BlockSection";
import {
  ANTIBODIES_PROPERTIES,
  Antibody,
  AntibodyData,
  Block,
} from "./_helpers";

const aNewBlock = (index: number, antibody: Antibody): Block => {
  const { targets } = ANTIBODIES_PROPERTIES[antibody];
  return {
    index,
    target: targets[0].value,
    result: "negative",
  };
};

const getBlockOptions = (count: number) =>
  range(1, count).map((value) => ({
    value,
    label: `Bloc ${value}`,
  }));

type Props = {
  containerCount: number;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
};

export const AntibodySection = ({
  containerCount,
  state,
  setState: _setData,
}: Props) => {
  const { type, clone, blocks } = state;
  // TODO clean: extract dedicated state helper
  const setState: SetState<AntibodyData> = (key) => (value) =>
    _setData({ ...state, [key]: value });

  const options = getBlockOptions(containerCount);
  const { clones } = ANTIBODIES_PROPERTIES[type];
  const selectedBlocks = blocks.map((block) => block.index);
  const groups = useMemo(
    () => [
      {
        title: "", // TODO: fix API
        items: options,
      },
    ],
    [options],
  );

  const onSelectBlocks = (newSelection: number[]) => {
    const updatedMap = new Map(blocks.map((block) => [block.index, block]));

    const oldSet = new Set(selectedBlocks);
    const newSet = new Set(newSelection);

    for (const { value } of options) {
      // Value has been added
      if (!oldSet.has(value) && newSet.has(value)) {
        updatedMap.set(value, aNewBlock(value, type));
      }

      // Value has been deleted
      if (oldSet.has(value) && !newSet.has(value)) {
        updatedMap.delete(value);
      }
    }

    setState("blocks")(Array.from(updatedMap.values()));
  };

  return (
    <SubSection title={type}>
      {/* TODO: style */}
      {/* TODO: add button to clear directly from here? */}
      {/* TODO: make section foldable? */}
      <Line>
        <Select
          label="Quel est le clone utilisé ?"
          name="Clone utilisé"
          options={clones}
          value={clone}
          onChange={setState("clone")}
        />
      </Line>
      <Line>
        {/* TODO: fix wording */}
        Sur quels blocs avez-vous réalisé cet anticorps ?
        <SelectList
          groups={groups}
          value={selectedBlocks}
          onChange={onSelectBlocks}
        />
      </Line>
      {blocks.map((block, index) => {
        const onChange = (updatedBlock: Block) => {
          const updatedBlocks = patchArray(blocks, index, (_) => updatedBlock);
          setState("blocks")(updatedBlocks);
        };

        return (
          <BlockSection
            key={index}
            block={block}
            antibody={type}
            onChange={onChange}
          />
        );
      })}
    </SubSection>
  );
};
