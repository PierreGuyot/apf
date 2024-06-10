import { useState } from "react";
import { Line } from "../../../ui/Line";
import { Select } from "../../../ui/Select";
import { SelectList } from "../../../ui/SelectList";
import { SubSection } from "../../../ui/SubSection";
import { patchArray, range } from "../../../ui/helpers/helpers";
import { Option, YES_NO_OPTIONS } from "../../../ui/helpers/options";
import { useForm } from "../../../ui/helpers/use-form";

// TODO with Louis: un-mock
// TODO with louis: translate
type Antibody = "P504S" | "P63" | "BCC";
type AntibodyTarget = "cible_1" | "cible_2";
type AntibodyClone = "P504S" | "BCC" | "ventana-0123" | "clone_1";
const ANTIBODIES_OPTIONS: Option<Antibody>[] = [
  { value: "P504S", label: "P504S" },
  { value: "P63", label: "P63" },
  { value: "BCC", label: "BCC" },
];

type Conclusions = Record<Result, string>;
const MOCK_CONCLUSIONS = (
  antibody: Antibody,
  target: AntibodyTarget,
): Conclusions => ({
  positive: `conclusion_positive_${antibody}_${target}`,
  negative: `conclusion_negative_${antibody}_${target}`,
});

// TODO: clean data structure for better search (compute options afterwards from this)
type Targets = Array<
  Option<AntibodyTarget> & {
    conclusions: Conclusions;
  }
>;

const ANTIBODIES_PROPERTIES: Record<
  Antibody,
  {
    clones: Option<AntibodyClone>[];
    targets: Targets;
  }
> = {
  P504S: {
    clones: [
      { value: "P504S", label: "P504S" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("P504S", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("P504S", "cible_2"),
      },
    ],
  },
  P63: {
    clones: [
      { value: "ventana-0123", label: "P63 (clone Ventana 0123)" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("P63", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("P63", "cible_2"),
      },
    ],
  },
  BCC: {
    clones: [
      { value: "BCC", label: "BCC" },
      { value: "clone_1", label: "MOCK" },
    ],
    targets: [
      {
        value: "cible_1",
        label: "MOCK 1",
        conclusions: MOCK_CONCLUSIONS("BCC", "cible_1"),
      },
      {
        value: "cible_2",
        label: "MOCK 2",
        conclusions: MOCK_CONCLUSIONS("BCC", "cible_2"),
      },
    ],
  },
};
const ANTIBODY_GROUPS = [{ title: "", items: ANTIBODIES_OPTIONS }];
type Result = "positive" | "negative";
const RESULT_OPTIONS: Option<Result>[] = [
  { value: "positive", label: "Positif" },
  { value: "negative", label: "Négative" },
];
type Block = {
  index: number;
  target: AntibodyTarget;
  result: Result;
};
const aNewBlock = (index: number, antibody: Antibody): Block => {
  const { targets } = ANTIBODIES_PROPERTIES[antibody];
  return {
    index,
    target: targets[0].value,
    result: "negative",
  };
};

const AntibodySection = ({ antibody }: { antibody: Antibody }) => {
  const { clones, targets } = ANTIBODIES_PROPERTIES[antibody];

  // TODO: un-mock state
  const containerCount = 9;
  const [clone, setClone] = useState<AntibodyClone>(clones[0].value);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const selectedBlockGroups = [
    {
      title: "", // TODO: fix API
      items: range(1, containerCount).map((value) => ({
        value,
        label: String(value),
      })),
    },
  ];
  const [blocks, setBlocks] = useState<Block[]>(
    range(containerCount).map((index) => aNewBlock(index, antibody)),
  );

  return (
    <SubSection title={antibody}>
      {/* TODO: style */}
      {/* TODO: add button to clear directly from here? */}
      {/* TODO: make section foldable? */}
      <Line>
        <Select
          label="Quel est le clone utilisé ?"
          name="Clone utilisé"
          options={clones}
          value={clone}
          onChange={setClone}
        />
      </Line>
      <Line>
        Sur quels blocs avez-vous réalisé cet anticorps ?{" "}
        <SelectList
          groups={selectedBlockGroups}
          value={selectedBlocks}
          onChange={setSelectedBlocks}
        />
      </Line>
      {blocks.map((block, index) => {
        // TODO: extract and clean

        if (!selectedBlocks.includes(block.index)) {
          return null;
        }

        const setTarget = (updatedTarget: AntibodyTarget) => {
          const updatedBlocks = patchArray(blocks, index, (b) => ({
            ...b,
            target: updatedTarget,
          }));
          return setBlocks(updatedBlocks);
        };

        const setResult = (updatedResult: Result) => {
          const updatedBlocks = patchArray(blocks, index, (b) => ({
            ...b,
            result: updatedResult,
          }));
          return setBlocks(updatedBlocks);
        };

        const resultOptions = RESULT_OPTIONS.map((item) => {
          const matchingTargetOption = targets.find(
            (t) => t.value === block.target,
          );
          if (!matchingTargetOption) {
            throw new Error("Invalid value");
          }

          const conclusion = matchingTargetOption.conclusions[block.result];
          return { value: item.value, label: `${item.label} (${conclusion})` };
        });

        return (
          <SubSection title={`Bloc ${block.index}`}>
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
      })}
    </SubSection>
  );
};

type FormState = {
  hasDoneImmunohistochemistry: boolean;
  antibodies: Antibody[];
};

const getInitialState = (): FormState => ({
  hasDoneImmunohistochemistry: true,
  antibodies: [],
});

type Props = {
  // TODO: un-mock
};

export const Immunohistochemistry = (
  {
    // TODO: pass state
  }: Props,
) => {
  // State
  const { state, setState } = useForm(getInitialState);
  const { hasDoneImmunohistochemistry, antibodies } = state;

  return (
    <>
      <Line>
        <Select
          value={hasDoneImmunohistochemistry}
          options={YES_NO_OPTIONS}
          name="Immunohistochimie"
          label="Avez-vous réalisé une immunohistochimie ?"
          onChange={setState("hasDoneImmunohistochemistry")}
        />
      </Line>
      {hasDoneImmunohistochemistry ? (
        <>
          <Line>
            <div>Quels anticorps avez-vous réalisés ?</div>
            <SelectList
              value={antibodies}
              groups={ANTIBODY_GROUPS}
              onChange={setState("antibodies")}
            />
          </Line>
          {antibodies.map((antibody) => (
            <AntibodySection antibody={antibody} />
          ))}
        </>
      ) : undefined}
    </>
  );
};
