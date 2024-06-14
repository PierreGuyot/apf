import { useMemo } from "react";
import { InputText } from "../../ui/InputText";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { SubSection } from "../../ui/SubSection";
import { patchState } from "../../ui/helpers/form-state";
import { patchArray, range } from "../../ui/helpers/helpers";
import {
  ANTIBODIES_PROPERTIES,
  AntibodyData,
  Block,
  OTHER_RESULT_OPTIONS,
  PropertiesByAntibody,
  Result,
  ResultOptions,
} from "./_helpers";

const aNewBlock = (index: number, options: ResultOptions): Block => ({
  index,
  result: options[0].value,
});

const getBlockOptions = (count: number) =>
  range(1, count).map((value) => ({
    value,
    label: `Bloc ${value}`,
  }));

type Props = {
  containerCount: number;
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
};

export const AntibodySection = ({
  containerCount,
  properties,
  state,
  setState,
}: Props) => {
  const blockOptions = getBlockOptions(containerCount);
  const groups = useMemo(
    () => [
      {
        title: "", // TODO clean: fix API
        items: blockOptions,
      },
    ],
    [blockOptions],
  );

  const { type, blocks } = state;

  const resultOptions: ResultOptions = useMemo(() => {
    if (type === "other") {
      return OTHER_RESULT_OPTIONS;
    }

    // TODO clean: consider activating noUncheckedIndexedAccess in tsconfig.json
    // TODO clean: consider using ErrorBoundary
    const antibodyProperties = properties[state.type];
    if (!antibodyProperties) {
      throw new Error("Missing antibody properties");
    }

    return antibodyProperties.resultOptions;
  }, [properties, state.type, type]);

  const setField = patchState(state, setState);
  const selectedBlocks = blocks.map((block) => block.index);
  const onSelectBlocks = (newSelection: number[]) => {
    const updatedMap = new Map(blocks.map((block) => [block.index, block]));

    const oldSet = new Set(selectedBlocks);
    const newSet = new Set(newSelection);

    for (const { value } of blockOptions) {
      // Value has been added
      if (!oldSet.has(value) && newSet.has(value)) {
        updatedMap.set(value, aNewBlock(value, resultOptions));
      }

      // Value has been deleted
      if (oldSet.has(value) && !newSet.has(value)) {
        updatedMap.delete(value);
      }
    }

    setField("blocks")(Array.from(updatedMap.values()));
  };

  const title =
    type === "other"
      ? state.name
        ? `Autre (${state.name})`
        : "Autre"
      : ANTIBODIES_PROPERTIES[type].label;

  return (
    <SubSection title={title}>
      {/* TODO clean: style */}
      {/* TODO feature: add button to clear directly from here? */}
      {/* TODO feature: make section foldable? */}
      <AntibodyForm state={state} setState={setState} />
      <Line>
        {/* FIXME: fix wording */}
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
          setField("blocks")(updatedBlocks);
        };

        const setResult = (updatedResult: Result) =>
          onChange({ ...block, result: updatedResult });

        return (
          <Line key={block.index}>
            Bloc {block.index} :
            <Select
              name="Résultat immunohistochimie"
              options={resultOptions}
              value={block.result}
              onChange={setResult}
            />
          </Line>
        );
      })}
    </SubSection>
  );
};

const AntibodyForm = ({
  state,
  setState,
}: {
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
}) => {
  const setField = patchState(state, setState);

  if (state.type === "other") {
    const { name, clone } = state;

    return (
      <>
        <Line>
          <InputText
            label="Nom de l'anticorps"
            value={name}
            onChange={(value) => setState({ ...state, name: value })}
          />
        </Line>
        <Line>
          <InputText
            label="Nom du clone utilisé"
            value={clone}
            onChange={setField("clone")}
          />
        </Line>
      </>
    );
  }

  const { type, clone } = state;
  const { clones } = ANTIBODIES_PROPERTIES[type];

  return (
    <Line>
      <Select
        label="Nom du clone utilisé ?"
        name="Clone utilisé"
        options={clones}
        value={clone}
        onChange={setField("clone")}
      />
    </Line>
  );
};
