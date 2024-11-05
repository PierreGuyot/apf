import { Mode } from "fs";
import { useEffect, useMemo, useState } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { ModePicker } from "../../../common/ModePicker";

import {
  Checkbox,
  HelpIcon,
  InputNumber,
  InputText,
  InputTextArea,
  Line,
  NestedItem,
  noop,
  patchState,
  Section,
  Select,
  SelectList,
  SelectTroolean,
  Stack,
  sum,
  Summary,
  Text,
  Troolean,
  useForm,
  ValidationErrors,
} from "../../../ui";
import {
  BladderResectionFormId,
  DEFAULT_FULL_LOCATION,
  DEFAULT_FULL_TUMOR_TYPE,
  FullLocation,
  FullTumorType,
  getGradeOptions,
  getSublocationOptions,
  getTumorSubtypeOptions,
  Item,
  LESION_ASPECT_OPTIONS,
  LesionAspect,
  LOCATION_OPTIONS,
  NON_TUMORAL_RESULT_GROUPS,
  PTNM_OPTIONS,
  Treatment,
  TREATMENT_OPTIONS,
  TUMOR_TYPE_OPTIONS,
  TUMORAL_RESULT_GROUPS,
  TumoralExtension,
  TumorType,
  PtnmOption,
  DEFAULT_TUMORAL_EXTENSION_ITEM,
} from "./helpers";
import { generateReport } from "./report";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection-macroscopy/validation";
import { ResectionMacroscopy } from "../../../common/resection-macroscopy/ResectionMacroscopy";
import { HasInvasion } from "../../../common/invasion/HasInvasion";

type MuscularisPropria = {
  isPresent: Troolean;
  chipCount: number;
  notes: string;
};

type OtherResults = {
  tumoral: string[];
  nonTumoral: string[];
};

export type FormState = {
  // Clinical info
  // Standard mode
  clinicalInfo: string;

  // Expert mode
  medicalHistory: Troolean;
  previousTumorType: FullTumorType;

  location: FullLocation;
  hadPreviousTreatment: Troolean;
  previousTreatment: Treatment;
  lesionAspect: LesionAspect;
  otherLesionAspect: string;

  // Macroscopy
  chipWeight: number; // In grams
  samplingType: SamplingType;
  blockCount: number;
  coloration: ColorationType;

  // Microscopy
  tumorType: FullTumorType;
  grade: string;
  tumoralExtension: TumoralExtension;
  hasLymphaticOrVascularInvasion: boolean;
  muscularisPropria: MuscularisPropria;
  otherResults: OtherResults;

  // Additional notes
  comments: string;
};

const getInitialState = (): FormState => ({
  // Clinical info
  // Standard mode
  clinicalInfo: "",

  // Expert mode
  medicalHistory: "unspecified",
  previousTumorType: DEFAULT_FULL_TUMOR_TYPE,
  location: DEFAULT_FULL_LOCATION,
  hadPreviousTreatment: "unspecified",
  previousTreatment: TREATMENT_OPTIONS[0].value,
  lesionAspect: LESION_ASPECT_OPTIONS[0].value,
  otherLesionAspect: "",

  // Macroscopy
  chipWeight: 0,
  samplingType: "full",
  blockCount: 0,
  coloration: "HES",

  // Microscopy
  tumorType: DEFAULT_FULL_TUMOR_TYPE,
  grade: "",
  tumoralExtension: {},
  hasLymphaticOrVascularInvasion: false,
  muscularisPropria: {
    isPresent: "unspecified",
    chipCount: 0,
    notes: "",
  },
  otherResults: {
    tumoral: [],
    nonTumoral: [],
  },

  // Additional notes
  comments: "",
});

type Props = {
  formId: BladderResectionFormId;
};

// TODO clean: add tests
const validateTumoralExtension = ({
  tumorType,
  tumoralExtension,
}: {
  tumorType: TumorType;
  tumoralExtension: TumoralExtension;
}) => {
  if (hasTumoralExtensionSection(tumorType)) {
    return [];
  }

  const errors: string[] = [];

  const totalPercentage = sum(
    Object.values(tumoralExtension).map((item) => item.percentage),
  );
  if (totalPercentage !== 100) {
    errors.push(
      `Le pourcentage total d'extension tumorale doit être égal à 100% (${totalPercentage} actuellement).`,
    );
  }

  return errors;
};

const validateMicroscopy = ({
  tumorType,
  tumoralExtension,
}: {
  tumorType: FullTumorType;
  tumoralExtension: TumoralExtension;
}) => {
  const errors = validateTumoralExtension({
    tumorType: tumorType.type,
    tumoralExtension,
  });
  return { tumoralExtension: errors };
};

// TODO CLEAN: refactor ModePicker
export const BladderResectionForm = ({ formId }: Props) => {
  const [mode, setMode] = useState<Mode>();

  if (typeof mode === "undefined") {
    return (
      <FormPage formId={formId} isPickingMode onClear={noop}>
        <ModePicker onPick={setMode} />
      </FormPage>
    );
  }

  return <BladderResectionFormContent formId={formId} mode={mode} />;
};

export const BladderResectionFormContent = ({
  formId,
  mode,
}: {
  formId: BladderResectionFormId;
  mode: Mode;
}) => {
  const { state, clearState, setField, setState } = useForm(getInitialState);
  const { clinicalInfo } = state;
  const isExpertMode = mode === "expert";

  const macroscopyErrors = validateMacroscopy(state);
  const microscopyErrors = validateMicroscopy(state);
  const hasErrors =
    !!macroscopyErrors.length ||
    sum(Object.values(microscopyErrors).map((errors) => errors.length));

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        {isExpertMode ? (
          <ClinicalInfoExpert
            state={state}
            setState={(value) => setState({ ...state, ...value })}
          />
        ) : (
          <ClinicalInfo
            index={1}
            value={clinicalInfo}
            onChange={setField("clinicalInfo")}
          />
        )}

        <ResectionMacroscopy
          index={2}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={macroscopyErrors}
        />

        <MicroscopySection
          index={3}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={microscopyErrors}
        />

        <AdditionalRemarks
          index={4}
          value={state.comments}
          onChange={setField("comments")}
        />

        {hasErrors ? undefined : (
          <Summary
            getContent={(language) =>
              generateReport({ ...state, formId }, language, isExpertMode)
            }
          />
        )}
      </Stack>
    </FormPage>
  );
};

type ClinicalInfoState = Pick<
  FormState,
  | "medicalHistory"
  | "previousTumorType"
  | "location"
  | "hadPreviousTreatment"
  | "previousTreatment"
  | "lesionAspect"
  | "otherLesionAspect"
>;
const ClinicalInfoExpert = ({
  state,
  setState,
}: {
  state: ClinicalInfoState;
  setState: (value: ClinicalInfoState) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Section title="Renseignements cliniques" index={1}>
      <Line>
        <SelectTroolean
          label="Antécédents de maladie des voies urinaires ou de métastases à distance"
          value={state.medicalHistory}
          onChange={setField("medicalHistory")}
        />
      </Line>
      {state.medicalHistory === "yes" ? (
        <>
          <TumorTypeInput
            state={state.previousTumorType}
            setState={setField("previousTumorType")}
          />
          <LocationInput
            state={state.location}
            setState={setField("location")}
          />
          <Line>
            <SelectTroolean
              label="Traitements antérieurs"
              value={state.hadPreviousTreatment}
              onChange={setField("hadPreviousTreatment")}
            />
            {state.hadPreviousTreatment === "yes" ? (
              <>
                <Select
                  value={state.previousTreatment}
                  options={TREATMENT_OPTIONS}
                  onChange={setField("previousTreatment")}
                />
              </>
            ) : undefined}
          </Line>

          <Line>
            <Select
              label="Aspect cystoscopique de la lésion actuelle"
              value={state.lesionAspect}
              options={LESION_ASPECT_OPTIONS}
              onChange={setField("lesionAspect")}
            />
            {state.lesionAspect === "other" ? (
              <InputText
                // No label
                value={state.otherLesionAspect}
                onChange={setField("otherLesionAspect")}
              />
            ) : undefined}
          </Line>
        </>
      ) : undefined}
    </Section>
  );
};

type MicroscopyState = Pick<
  FormState,
  | "tumorType"
  | "grade"
  | "tumoralExtension"
  | "hasLymphaticOrVascularInvasion"
  | "muscularisPropria"
  | "otherResults"
>;
const MicroscopySection = ({
  index,
  state,
  setState,
  errors,
}: {
  index: number;
  state: MicroscopyState;
  setState: (value: MicroscopyState) => void;
  errors: { tumoralExtension: string[] };
}) => {
  const setField = patchState(state, setState);

  const gradeOptions = useMemo(
    () => getGradeOptions(state.tumorType.type),
    [state.tumorType],
  );

  // When grade options change, reset grade to first available value
  useEffect(
    () => {
      setField("grade")(gradeOptions[0]?.value ?? "");
    },
    // TODO CLEAN: find a way to clean this
    // CAUTION: we disable the check on setField (which is unstable by nature) here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.tumorType.type],
  );

  return (
    <Section index={index} title="Microscopie">
      <TumorTypeInput
        state={state.tumorType}
        setState={setField("tumorType")}
      />
      {/* TODO CLEAN: nest and restyle after grade has been moved to InputTumorType */}
      {state.tumorType.type === "other" ? (
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
      )}
      <InputTumoralExtension
        tumorType={state.tumorType.type}
        state={state.tumoralExtension}
        setState={setField("tumoralExtension")}
        errors={errors.tumoralExtension}
      />

      <HasInvasion
        value={state.hasLymphaticOrVascularInvasion}
        onChange={setField("hasLymphaticOrVascularInvasion")}
      />
      <InputMuscularisPropria
        state={state.muscularisPropria}
        setState={setField("muscularisPropria")}
      />
      <InputOtherResults
        state={state.otherResults}
        setState={setField("otherResults")}
      />
    </Section>
  );
};

const InputMuscularisPropria = ({
  state,
  setState,
}: {
  state: MuscularisPropria;
  setState: (value: MuscularisPropria) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Line>
        <SelectTroolean
          label="Copeaux de résection présentant de la musculeuse"
          value={state.isPresent}
          onChange={setField("isPresent")}
        />
      </Line>
      {state.isPresent === "yes" ? (
        <NestedItem depth={1}>
          <InputNumber
            label="Nombre de copeaux"
            value={state.chipCount}
            onChange={setField("chipCount")}
          />
        </NestedItem>
      ) : state.isPresent === "unspecified" ? (
        <NestedItem depth={1}>
          <InputTextArea
            label="Commentaire"
            placeholder="Ajoutez vos commentaires dans ce champ."
            lineCount={2}
            value={state.notes}
            onChange={setField("notes")}
          />
        </NestedItem>
      ) : undefined}
    </>
  );
};

const InputOtherResults = ({
  state,
  setState,
}: {
  state: OtherResults;
  setState: (value: OtherResults) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Stack spacing="md">
      <Text variant="bold">Autres résultats</Text>
      <NestedItem depth={1}>
        <Line>
          <SelectList
            label="Tumoraux"
            values={state.tumoral}
            groups={TUMORAL_RESULT_GROUPS}
            onChange={setField("tumoral")}
          />
        </Line>
        <Line>
          <SelectList
            label="Non tumoraux"
            values={state.nonTumoral}
            groups={NON_TUMORAL_RESULT_GROUPS}
            onChange={setField("nonTumoral")}
          />
        </Line>
      </NestedItem>
    </Stack>
  );
};

// TODO CLEAN: move tumorGrade inside this component
const TumorTypeInput = ({
  state,
  setState,
}: {
  state: FullTumorType;
  setState: (value: FullTumorType) => void;
}) => {
  const setField = patchState(state, setState);
  const subtypeOptions = getTumorSubtypeOptions(state.type);

  // When tumor type options change, reset tumor subtype to first available value
  useEffect(
    () => {
      const firstOption = subtypeOptions[0]?.value ?? "none";
      setField("subtype")(firstOption);
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
        <InputText
          label="Sous-type histologique de la tumeur"
          value={state.otherSubtype}
          onChange={setField("otherSubtype")}
        />
      ) : undefined}
    </>
  );
};

const LocationInput = ({
  state,
  setState,
}: {
  state: FullLocation;
  setState: (value: FullLocation) => void;
}) => {
  const setField = patchState(state, setState);
  const sublocationOptions = getSublocationOptions(state.location);

  // When sublocation options change, reset sublocation to first available value
  useEffect(
    () => {
      const firstOption = sublocationOptions[0]?.value ?? "none";
      setField("sublocation")(firstOption);
    },
    // TODO CLEAN: find a way to clean this
    // CAUTION: we disable the check on setField (which is unstable by nature) here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.location],
  );

  return (
    <>
      <Line>
        <Select
          label="Localisation"
          options={LOCATION_OPTIONS}
          value={state.location}
          onChange={setField("location")}
        />
        {sublocationOptions.length && state.location !== "unspecified" ? (
          <Select
            // No label
            options={sublocationOptions}
            value={state.sublocation}
            onChange={setField("sublocation")}
          />
        ) : undefined}
      </Line>
    </>
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

const hasTumoralExtensionSection = (type: TumorType) =>
  type === "Carcinome urothélial papillaire, non invasif" ||
  type === "Carcinome urothélial in situ";

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
  if (hasTumoralExtensionSection(tumorType)) {
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
              state={state[option.value] ?? DEFAULT_TUMORAL_EXTENSION_ITEM}
              setState={setField(option.value)}
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
  state,
  setState,
}: {
  option: PtnmOption;
  state: Item;
  setState: (value: Item) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Stack direction="row" alignItems="center" spacing="md">
      <div style={{ width: option.value === "other" ? undefined : "60px" }}>
        <Checkbox
          label={option.label}
          isChecked={state.isChecked}
          onChange={() => setField("isChecked")(!state.isChecked)}
        />
      </div>
      <InputNumber
        unit="percent"
        max={100}
        value={state.percentage}
        onChange={setField("percentage")}
      />
    </Stack>
  );
};
