import { useMemo } from "react";
import {
  Line,
  patchArray,
  patchState,
  range,
  SelectBoolean,
  SelectList,
  Stack,
  SubSection,
} from "../../ui";
import { AntibodySection } from "./_AntibodySection";
import {
  aNewAntibody,
  aNewBlock,
  AntibodyData,
  AntibodyGroup,
  Block,
  IhcState,
  PropertiesByAntibody,
} from "./helpers";

type Props = {
  containerCount?: number;
  groups: AntibodyGroup[];
  properties: PropertiesByAntibody;
  state: IhcState;
  setState: (state: IhcState) => void;
};

const getBlockOptions = (count: number) =>
  range(1, count).map((value) => ({
    value,
    label: `Bloc ${value}`,
  }));

export const Immunohistochemistry = ({
  containerCount,
  groups: antibodyGroups,
  properties,
  state,
  setState,
}: Props) => {
  const { hasIhc, blocks } = state;
  const setField = patchState(state, setState);

  const selectedBlocks = blocks.map((block) => block.index);
  const blocksByIndex = useMemo(
    () => Object.fromEntries(blocks.map((block) => [block.index, block])),
    [blocks],
  );

  const hasMultipleBlocks = typeof containerCount === "number";

  const blockOptions = getBlockOptions(containerCount ?? 1);
  const blockGroups = useMemo(
    () => [
      {
        title: "", // TODO clean: fix API
        options: blockOptions,
      },
    ],
    [blockOptions],
  );

  const onSelectBlocks = (newSelection: number[]) => {
    const newBlocks = newSelection.map(
      (index) => blocksByIndex[index] ?? aNewBlock(index),
    );
    setField("blocks")(newBlocks);
  };

  return (
    <>
      <Line>
        <SelectBoolean
          value={hasIhc}
          label="Avez-vous réalisé une immunohistochimie ?"
          onChange={setField("hasIhc")}
        />
      </Line>
      {hasIhc ? (
        <>
          {hasMultipleBlocks ? (
            <Line>
              <SelectList
                label="Sur quels blocs avez-vous réalisé une immunohistochimie ?"
                groups={blockGroups}
                values={selectedBlocks}
                hasList={false}
                onChange={onSelectBlocks}
              />
            </Line>
          ) : undefined}
          {blocks.map((block, index) => {
            const setBlock = (value: Block) => {
              const updatedBlocks = patchArray(blocks, index, () => value);
              setField("blocks")(updatedBlocks);
            };

            return (
              <BlockSection
                key={index}
                antibodyGroups={antibodyGroups}
                block={block}
                properties={properties}
                isNested={hasMultipleBlocks}
                setBlock={setBlock}
              />
            );
          })}
        </>
      ) : undefined}
    </>
  );
};

const BlockSection = ({
  block,
  properties,
  antibodyGroups,
  isNested,
  setBlock,
}: {
  block: Block;
  properties: PropertiesByAntibody;
  antibodyGroups: AntibodyGroup[];
  isNested: boolean;
  setBlock: (value: Block) => void;
}) => {
  const { antibodies } = block;
  const setField = patchState(block, setBlock);

  const selectedAntibodies = antibodies.map((antibody) => antibody.type);
  const antibodiesByType = Object.fromEntries(
    antibodies.map((antibody) => [antibody.type, antibody]),
  );

  const onSelectAntibodies = (newSelection: AntibodyData["type"][]) => {
    const newAntibodies = newSelection.map(
      (type) => antibodiesByType[type] ?? aNewAntibody({ type, properties }),
    );
    setField("antibodies")(newAntibodies);
  };

  // Patched groups with fallback option `other`
  const groups = useMemo(
    () => [
      ...antibodyGroups,
      {
        title: "Autres",
        options: [{ value: "others" as const, label: "Autres" }],
      },
    ],
    [antibodyGroups],
  );

  const content = (
    <Stack spacing="md">
      <Line>
        <SelectList
          label="Quels sont les anticorps utilisés ?"
          groups={groups}
          values={selectedAntibodies}
          hasList={false}
          onChange={onSelectAntibodies}
        />
      </Line>
      {antibodies.map((antibody, index) => {
        const setAntibody = (value: AntibodyData) => {
          const updatedAntibodies = patchArray(antibodies, index, () => value);
          setField("antibodies")(updatedAntibodies);
        };

        return (
          <AntibodySection
            key={index}
            properties={properties}
            state={antibody}
            setState={setAntibody}
          />
        );
      })}
    </Stack>
  );

  return isNested ? (
    <SubSection title={`Bloc ${block.index}`}>{content}</SubSection>
  ) : (
    content
  );
};
