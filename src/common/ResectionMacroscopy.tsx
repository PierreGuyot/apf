import {
  InputNumber,
  Line,
  patchState,
  Section,
  Select,
  ValidationErrors,
} from "../ui";

import {
  COLORATION_OPTIONS,
  ColorationType,
  SAMPLING_TYPES,
  SamplingType,
} from "./resection.helpers";

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
  errors: string[];
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
      <Line>
        <InputNumber
          label="Poids des copeaux :"
          value={chipWeight}
          unit="g"
          isDecimal
          onChange={setField("chipWeight")}
        />
      </Line>
      <Line>
        <Select
          options={SAMPLING_TYPES}
          value={samplingType}
          onChange={setField("samplingType")}
        />{" "}
        <InputNumber value={blockCount} onChange={setField("blockCount")} />{" "}
        blocs (fixation : formol tamponné 4%, coloration:{" "}
        <Select
          options={COLORATION_OPTIONS}
          value={coloration}
          onChange={setField("coloration")}
        />
        )
      </Line>
      <ValidationErrors
        header="La section Macroscopie comporte les erreurs suivantes :"
        errors={errors}
      />
    </Section>
  );
};
