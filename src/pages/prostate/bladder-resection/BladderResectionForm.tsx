import { Mode } from "fs";
import { useEffect, useState } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { ModePicker } from "../../../common/ModePicker";

import { HasInvasion } from "../../../common/invasion/HasInvasion";
import { ResectionMacroscopy } from "../../../common/resection-macroscopy/ResectionMacroscopy";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection-macroscopy/validation";
import {
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
} from "../../../ui";
import {
  BladderResectionFormId,
  DEFAULT_FULL_LOCATION,
  FullLocation,
  getSublocationOptions,
  LESION_ASPECT_OPTIONS,
  LesionAspect,
  LOCATION_OPTIONS,
  NON_TUMORAL_RESULT_GROUPS,
  Treatment,
  TREATMENT_OPTIONS,
  TUMORAL_RESULT_GROUPS,
} from "./helpers";
import { generateReport } from "./report";
import { TumorInput } from "./tumor-input/TumorInput";
import { DEFAULT_TUMOR, Tumor } from "./tumor-input/helpers";
import { validateTumorInput } from "./tumor-input/validate";

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
  previousTumor: Tumor;

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
  tumor: Tumor;
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
  previousTumor: DEFAULT_TUMOR,
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
  tumor: DEFAULT_TUMOR,
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

const validateMicroscopy = ({ tumor }: { tumor: Tumor }) => {
  const errors = validateTumorInput(tumor);
  return { tumor: errors };
};

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
  | "previousTumor"
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
      <SelectTroolean
        label="Antécédents de maladie des voies urinaires ou de métastases à distance"
        value={state.medicalHistory}
        onChange={setField("medicalHistory")}
      />
      {state.medicalHistory === "yes" ? (
        <>
          <TumorInput
            state={state.previousTumor}
            setState={setField("previousTumor")}
            errors={[]}
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
  | "tumor"
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
  errors: { tumor: string[] };
}) => {
  const setField = patchState(state, setState);

  return (
    <Section index={index} title="Microscopie">
      <TumorInput
        state={state.tumor}
        setState={setField("tumor")}
        hasGrade
        hasExtension
        errors={errors.tumor}
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
      <SelectTroolean
        label="Copeaux de résection présentant de la musculeuse"
        value={state.isPresent}
        onChange={setField("isPresent")}
      />
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
        <SelectList
          label="Tumoraux"
          values={state.tumoral}
          groups={TUMORAL_RESULT_GROUPS}
          onChange={setField("tumoral")}
        />
        <SelectList
          label="Non tumoraux"
          values={state.nonTumoral}
          groups={NON_TUMORAL_RESULT_GROUPS}
          onChange={setField("nonTumoral")}
        />
      </NestedItem>
    </Stack>
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
