import { useEffect } from "react";
import {
  HelpIcon,
  InputText,
  Line,
  patchState,
  Select,
  SelectComposition,
  Stack,
  Text,
} from "../../../../ui";
import { CARCINOMA_SUBTYPES } from "../helpers";
import {
  getGradeOptions,
  getTumorCategory,
  hasTumoralExtension,
  Ptnm,
  PTNM_OPTIONS,
  Tumor,
  TUMOR_TYPE_GROUPS,
  TumorType,
} from "./helpers";

export const TumorInput = ({
  state,
  setState,
  hasGrade,
  hasExtension,
  hasComposition,
  error,
}: {
  state: Tumor;
  setState: (value: Tumor) => void;
  hasGrade?: boolean;
  hasExtension?: boolean;
  hasComposition?: boolean;
  error?: string;
}) => {
  const setField = patchState(state, setState);
  const gradeOptions = getGradeOptions(state.type);

  // When tumor type changes, reset grade to first available value
  useEffect(
    () => {
      const firstGradeOption = gradeOptions[0]?.value ?? "";
      setField("grade")(firstGradeOption);
    },
    // TODO CLEAN: find a way to clean this
    // CAUTION: we disable the check on setField (which is unstable by nature) here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.type],
  );

  return (
    <>
      <Line>
        <Select
          label="Type histologique de la tumeur"
          options={TUMOR_TYPE_GROUPS}
          value={state.type}
          onChange={setField("type")}
        />
        {state.type === "other" ? (
          <InputText value={state.typeOther} onChange={setField("typeOther")} />
        ) : undefined}
      </Line>

      {hasComposition &&
      getTumorCategory(state.type) === "Carcinome urothélial invasif" ? (
        <SelectComposition
          items={CARCINOMA_SUBTYPES}
          value={state.carcinomaComposition}
          onChange={setField("carcinomaComposition")}
          error={error}
        />
      ) : undefined}

      {hasGrade ? (
        state.type === "other" ? (
          <InputText
            label="Grade tumoral"
            value={state.grade}
            onChange={setField("grade")}
          />
        ) : (
          <Select
            label="Grade tumoral"
            options={gradeOptions}
            value={state.grade}
            onChange={setField("grade")}
          />
        )
      ) : undefined}
      {hasExtension ? (
        <InputTumoralExtension
          tumorType={state.type}
          value={state.extension}
          onChange={setField("extension")}
        />
      ) : undefined}
    </>
  );
};

const InputTumoralExtension = ({
  tumorType,
  value,
  onChange,
}: {
  tumorType: TumorType;
  value: Ptnm;
  onChange: (value: Ptnm) => void;
}) => {
  // For these types, tumoral extension is automatically inferred
  if (!hasTumoralExtension(tumorType)) {
    return undefined;
  }

  return (
    <Stack direction="row" spacing="md" alignItems="center">
      <Select
        label="Extension tumorale"
        options={PTNM_OPTIONS}
        value={value}
        onChange={onChange}
      />
      <HelpIcon size="sm" content={PTNM_REFRESHER} />
    </Stack>
  );
};

// TODO clean: improve visuals
const PTNM_REFRESHER = (
  <Stack minWidth="400px" spacing="sm">
    {PTNM_OPTIONS.map((option) => {
      if (!option.tooltip) {
        return undefined;
      }

      return (
        <div key={option.value}>
          <Text variant="bold">{option.value}</Text> : {option.tooltip}
        </div>
      );
    })}
  </Stack>
);
