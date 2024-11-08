import { useEffect } from "react";

import {
  HelpIcon,
  InputNumber,
  InputText,
  Line,
  NestedItem,
  patchState,
  Select,
  Stack,
  Text,
  ValidationErrors,
} from "../../../ui";
import {
  getGradeOptions,
  getTumorSubtypeOptions,
  hasTumoralExtensionSection,
  PTNM_OPTIONS,
  PtnmOption,
  Tumor,
  TUMOR_TYPE_OPTIONS,
  TumoralExtension,
  TumorType,
} from "./helpers";

export const TumorInput = ({
  state,
  setState,
  hasGrade,
  hasExtension,
  errors,
}: {
  state: Tumor;
  setState: (value: Tumor) => void;
  hasGrade?: boolean;
  hasExtension?: boolean;
  errors: string[];
}) => {
  const setField = patchState(state, setState);
  const subtypeOptions = getTumorSubtypeOptions(state.type);
  const gradeOptions = getGradeOptions(state.type);

  // When tumor type changes, reset subtype and grade to first available values
  useEffect(
    () => {
      const firstSubtypeOption = subtypeOptions[0]?.value ?? "none";
      setField("subtype")(firstSubtypeOption);

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
          options={TUMOR_TYPE_OPTIONS}
          value={state.type}
          onChange={setField("type")}
        />
      </Line>
      {subtypeOptions.length ? (
        <Select
          label="Sous-type histologique de la tumeur"
          options={subtypeOptions}
          value={state.subtype}
          onChange={setField("subtype")}
        />
      ) : undefined}
      {state.type === "other" ? (
        <>
          <InputText
            label="Sous-type histologique de la tumeur"
            value={state.otherSubtype}
            onChange={setField("otherSubtype")}
          />
          {hasGrade ? (
            <InputText
              label="Grade tumoral"
              value={state.grade}
              onChange={setField("grade")}
            />
          ) : undefined}
        </>
      ) : (
        <Select
          label="Grade tumoral"
          options={gradeOptions}
          value={state.grade}
          onChange={setField("grade")}
        />
      )}
      {hasExtension ? (
        <InputTumoralExtension
          tumorType={state.type}
          state={state.extension}
          setState={setField("extension")}
          errors={errors}
        />
      ) : undefined}
    </>
  );
};

const InputTumoralExtension = ({
  tumorType,
  state,
  setState,
  errors,
}: {
  tumorType: TumorType;
  state: TumoralExtension;
  setState: (value: TumoralExtension) => void;
  errors: string[];
}) => {
  const setField = patchState(state, setState);

  // For these types, tumoral extension is automatically inferred
  if (!hasTumoralExtensionSection(tumorType)) {
    return undefined;
  }

  return (
    <>
      <Stack direction="row" spacing="md" alignItems="center">
        <Text>Extension tumorale</Text>
        <HelpIcon size="sm" content={PTNM_REFRESHER} />
      </Stack>

      <NestedItem depth={1}>
        <Stack spacing="sm">
          {PTNM_OPTIONS.map((option) => (
            <TumoralExtensionItem
              key={option.value}
              option={option}
              value={state[option.value] ?? 0}
              onChange={setField(option.value)}
            />
          ))}
        </Stack>
      </NestedItem>
      <ValidationErrors errors={errors} />
    </>
  );
};

const TumoralExtensionItem = ({
  option,
  value,
  onChange,
}: {
  option: PtnmOption;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing="md">
      {/* TODO CLEAN: consider having a prop for the label width of inputs  */}
      <div style={{ width: option.value === "other" ? undefined : "40px" }}>
        {option.label}
      </div>
      <InputNumber unit="percent" max={100} value={value} onChange={onChange} />
    </Stack>
  );
};

// TODO CLEAN: improve visuals
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
