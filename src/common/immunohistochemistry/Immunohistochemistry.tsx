import { useMemo } from "react";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { SubSection } from "../../ui/SubSection";
import { patchState } from "../../ui/helpers/form-state";
import { patchArray, range } from "../../ui/helpers/helpers";
import { YES_NO_OPTIONS } from "../../ui/helpers/options";
import { AntibodySection } from "./_AntibodySection";
import {
  ANTIBODIES_PROPERTIES,
  Antibody,
  AntibodyData,
  AntibodyGroup,
  IhcState,
  OtherAntibody,
  PropertiesByAntibody,
} from "./helpers";

type Props = {
  containerCount: number;
  groups: AntibodyGroup[];
  properties: PropertiesByAntibody;
  state: IhcState;
  setState: (state: IhcState) => void;
};

const anEmptyAntibodyData = ({
  type,
  properties,
}: {
  type: Antibody | "other";
  properties: PropertiesByAntibody;
}): AntibodyData => {
  if (type === "other") {
    return {
      type,
      name: "",
      clone: "",
      result: "",
    } satisfies OtherAntibody;
  }

  const { clones } = ANTIBODIES_PROPERTIES[type];
  const defaultClone = clones[0].value;

  const antibodyProperties = properties[type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }
  const { resultOptions } = antibodyProperties;
  const defaultResult = resultOptions[0].value;

  return {
    type: type,
    clone: defaultClone,
    result: defaultResult,
  };
};

const aNewBlock = (index: number): Block => ({
  index,
  antibodies: [],
});
const getBlockOptions = (count: number) =>
  range(1, count).map((value) => ({
    value,
    label: `Bloc ${value}`,
  }));

type Block = {
  index: number;
  antibodies: AntibodyData[];
};

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

  // FIXME: clean update API (order is not preserved)
  const onSelectBlocks = (newSelection: number[]) => {
    const updatedMap = new Map(blocks.map((block) => [block.index, block]));

    const oldSet = new Set(selectedBlocks);
    const newSet = new Set(newSelection);

    for (const { value } of blockOptions) {
      // Value has been added
      if (!oldSet.has(value) && newSet.has(value)) {
        updatedMap.set(value, aNewBlock(value));
      }

      // Value has been deleted
      if (oldSet.has(value) && !newSet.has(value)) {
        updatedMap.delete(value);
      }
    }

    setField("blocks")(Array.from(updatedMap.values()));
  };

  const blockOptions = getBlockOptions(containerCount);
  const blockGroups = useMemo(
    () => [
      {
        title: "", // TODO clean: fix API
        items: blockOptions,
      },
    ],
    [blockOptions],
  );

  return (
    <>
      <Line>
        <Select
          value={hasIhc}
          options={YES_NO_OPTIONS}
          name="Immunohistochimie"
          label="Avez-vous réalisé une immunohistochimie ?"
          onChange={setField("hasIhc")}
        />
      </Line>
      {hasIhc ? (
        <>
          <Line>
            <SelectList
              label="Sur quels blocs avez-vous réalisé une immunohistochimie ?"
              groups={blockGroups}
              value={selectedBlocks}
              hasList={false}
              onChange={onSelectBlocks}
            />
          </Line>
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
  setBlock,
}: {
  block: Block;
  properties: PropertiesByAntibody;
  antibodyGroups: AntibodyGroup[];
  setBlock: (value: Block) => void;
}) => {
  const { antibodies } = block;
  const setField = patchState(block, setBlock);

  // FIXME: clean update API (order is not preserved)
  const selectedAntibodies = antibodies.map((antibody) => antibody.type);
  const onSelectAntibodies = (newSelection: Array<Antibody | "other">) => {
    const updatedMap = new Map(
      antibodies.map((antibody) => [antibody.type, antibody]),
    );

    const oldSet = new Set(selectedAntibodies);
    const newSet = new Set(newSelection);

    for (const { items } of groups) {
      for (const { value } of items) {
        // Value has been added
        if (!oldSet.has(value) && newSet.has(value)) {
          updatedMap.set(
            value,
            anEmptyAntibodyData({ type: value, properties }),
          );
        }

        // Value has been deleted
        if (oldSet.has(value) && !newSet.has(value)) {
          updatedMap.delete(value);
        }
      }
    }

    setField("antibodies")(Array.from(updatedMap.values()));
  };

  // Patched groups with fallback option `other`
  const groups = useMemo(
    () => [
      ...antibodyGroups,
      {
        title: "Autre",
        items: [{ value: "other" as const, label: "Autre" }],
      },
    ],
    [antibodyGroups],
  );

  return (
    <>
      <SubSection title={`Bloc ${block.index}`}>
        {/* TODO clean: extract clean `Spacing` component with t-shirt sizes (`sm`, `md`, etc.) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Line>
            Quels sont les anticorps utilisés ?
            <SelectList
              groups={groups}
              value={selectedAntibodies}
              hasList={false}
              onChange={onSelectAntibodies}
            />
          </Line>
          {antibodies.map((antibody, index) => {
            const setAntibody = (value: AntibodyData) => {
              const updatedAntibodies = patchArray(
                antibodies,
                index,
                () => value,
              );
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
        </div>
      </SubSection>
    </>
  );
};
