import { useMemo } from "react";
import {
  DEFAULT_LANGUAGE,
  ErrorMessage,
  InputNumber,
  Line,
  naturalJoin,
  NestedItem,
  patchState,
  pluralize,
  range,
  Select,
  SelectNumber,
  SelectTroolean,
  Stack,
  Text,
} from "../../../../ui";
import {
  BLOCK_SAMPLING_OPTIONS_MULTIPLE,
  BLOCK_SAMPLING_OPTIONS_SINGLE,
  getOppositeDirection,
  ORIENTATION_OPTIONS,
} from "../helpers";
import { MacroscopyState } from "./state";

type BlockDescriptionState = Pick<
  MacroscopyState,
  | "isSpecimenOriented"
  | "isIncludedInTotality"
  | "blockCount"
  | "blockSampling"
  | "position"
  | "blockIndex"
  | "secondBlockIndex"
>;

const getRemainingBlocks = (blockCount: number, valuesToRemove: number[]) =>
  range(blockCount).filter((value) => !valuesToRemove.includes(value));

type Props = {
  state: BlockDescriptionState;
  setState: (value: BlockDescriptionState) => void;
  errors: { secondBlockIndex?: string };
};

export const BlockDescription = ({ state, setState, errors }: Props) => {
  const setField = patchState(state, setState);

  const blockSamplingOptions = useMemo(
    () =>
      state.blockCount === 1
        ? BLOCK_SAMPLING_OPTIONS_SINGLE
        : BLOCK_SAMPLING_OPTIONS_MULTIPLE,
    [state.blockCount],
  );

  return (
    <>
      <Line>Description des blocs</Line>
      <NestedItem depth={1}>
        <SelectTroolean
          label="Inclusion en totalité"
          value={state.isIncludedInTotality}
          onChange={setField("isIncludedInTotality")}
        />
        <InputNumber
          label="Nombre de blocs"
          min={1}
          value={state.blockCount}
          onChange={setField("blockCount")}
        />
        <Select
          label="Type de prélèvement "
          options={blockSamplingOptions}
          value={state.blockSampling}
          onChange={setField("blockSampling")}
        />
        {state.blockCount === 1 ? undefined : (
          <SamplingDescription
            state={state}
            setState={setState}
            errors={errors}
          />
        )}
      </NestedItem>
    </>
  );
};

const SamplingDescription = ({
  state,
  setState,
  errors,
}: {
  state: BlockDescriptionState;
  setState: (value: BlockDescriptionState) => void;
  errors: { secondBlockIndex?: string };
}) => {
  const setField = patchState(state, setState);

  const selectBlockIndex = (
    <SelectNumber
      isInline
      min={1}
      max={state.blockCount}
      value={state.blockIndex}
      onChange={setField("blockIndex")}
    />
  );

  const selectSecondBlockIndex = (
    <SelectNumber
      isInline
      min={1}
      max={state.blockCount}
      value={state.secondBlockIndex}
      onChange={setField("secondBlockIndex")}
    />
  );

  const selectPosition = (
    <Select
      isInline
      options={ORIENTATION_OPTIONS}
      value={state.position}
      onChange={setField("position")}
    />
  );

  // Oriented

  if (state.isSpecimenOriented) {
    const oppositePosition = getOppositeDirection(state.position);
    const remainingBlocks = getRemainingBlocks(state.blockCount, [
      state.blockIndex,
      state.secondBlockIndex,
    ]);
    const remainingBlockParts = remainingBlocks.length ? (
      <>
        , lésion ({pluralize(remainingBlocks.length, "bloc")}{" "}
        {remainingBlocks.join(", ")})
      </>
    ) : undefined;

    return (
      <Stack spacing="sm">
        <Line>
          <Text size="md">
            Pointe {selectPosition} (bloc {selectBlockIndex} ), pointe{" "}
            {oppositePosition} (bloc {selectSecondBlockIndex})
            {remainingBlockParts}
          </Text>
        </Line>
        {/* TODO clean: consider adding the error directly on selectSecondBlockIndex */}
        <ErrorMessage errorMessage={errors.secondBlockIndex} />
      </Stack>
    );
  }

  // Non-oriented

  const remainingBlocks = getRemainingBlocks(state.blockCount, [
    state.blockIndex,
  ]);
  const remainingBlockParts = remainingBlocks.length ? (
    <>, lésion (blocs {naturalJoin(remainingBlocks, DEFAULT_LANGUAGE)})</>
  ) : undefined;

  return (
    <>
      <Line>
        <Text size="md">
          Pointes (bloc {selectBlockIndex} ){remainingBlockParts}
        </Text>
      </Line>
    </>
  );
};
