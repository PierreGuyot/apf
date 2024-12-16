import { useMemo } from "react";
import {
  patchArray,
  patchState,
  range,
  SelectBoolean,
  SelectList,
  Stack,
  SubSection,
  ValidationErrors,
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
  errors: string[];
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
  errors,
}: Props) => {
  const { hasIhc, blocks } = state;
  const setField = patchState(state, setState);

  const selectedBlocks = blocks.map((block) => block.index);
  const blocksByIndex = useMemo(
    () => Object.fromEntries(blocks.map((block) => [block.index, block])),
    [blocks],
  );

  const hasMultipleBlocks = typeof containerCount === "number";

  const blockOptions = getBlockOptions(containerCount || 1); // There should be at least one block
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
      <SelectBoolean
        value={hasIhc}
        label="Étude immunohistochimique"
        onChange={setField("hasIhc")}
      />
      {hasIhc ? (
        <>
          {hasMultipleBlocks ? (
            <SelectList
              label="Blocs utilisés"
              groups={blockGroups}
              values={selectedBlocks}
              hasList={false}
              onChange={onSelectBlocks}
            />
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
      {/* FIXME: inline errors when possible */}
      <ValidationErrors errors={errors} />
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
      <SelectList
        label="Anticorps utilisés"
        groups={groups}
        values={selectedAntibodies}
        hasList={false}
        onChange={onSelectAntibodies}
      />
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
