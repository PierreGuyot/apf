import { InputNumber, Line, patchState, Section, Select } from "../../ui";

import {
  COLORATION_OPTIONS,
  ColorationType,
  SAMPLING_TYPES,
  SamplingType,
} from "./validation";

type MacroscopyState = {
  chipWeight: number; // In grams
  samplingType: SamplingType;
  blockCount: number;
  coloration: ColorationType;
};

type Props = {
  index: number;
  state: MacroscopyState;
  setState: (value: MacroscopyState) => void;
  errors: {
    chipWeight?: string;
    blockCount?: string;
  };
};

export const ResectionMacroscopy = ({
  index,
  state,
  setState,
  errors,
}: Props) => {
  const { chipWeight, samplingType, blockCount, coloration } = state;
  const setField = patchState(state, setState);

  return (
    <Section title="Macroscopie" index={index}>
      <InputNumber
        label="Poids des copeaux :"
        value={chipWeight}
        unit="g"
        isDecimal
        onChange={setField("chipWeight")}
        errors={errors.chipWeight}
      />
      <Line>
        <Select
          options={SAMPLING_TYPES}
          value={samplingType}
          onChange={setField("samplingType")}
        />{" "}
        <InputNumber
          min={1}
          value={blockCount}
          onChange={setField("blockCount")}
          errors={errors.blockCount}
        />{" "}
        blocs (fixation : formol tamponné 4%, coloration:{" "}
        <Select
          options={COLORATION_OPTIONS}
          value={coloration}
          onChange={setField("coloration")}
        />
        )
      </Line>
    </Section>
  );
};
