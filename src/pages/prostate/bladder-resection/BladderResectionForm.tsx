import { Mode } from "fs";
import { useEffect, useMemo, useState } from "react";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { ModePicker } from "../../../common/ModePicker";
import { ResectionMacroscopy } from "../../../common/ResectionMacroscopy";
import { SelectLymphaticOrVascularInvasion } from "../../../common/SelectLymphaticOrVascularInvasion";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection.helpers";
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
  Stack,
  Summary,
  Text,
  useForm,
} from "../../../ui";
import {
  BladderResectionFormId,
  getGradeOptions,
  LESION_ASPECT_OPTIONS,
  LesionAspect,
  Location,
  LOCATION_OPTIONS,
  NON_TUMORAL_RESULT_GROUPS,
  Treatment,
  TREATMENT_OPTIONS,
  Troolean,
  TROOLEAN_OPTIONS,
  TUMOR_TYPE_OPTIONS,
  TUMORAL_RESULT_GROUPS,
  TumorType,
} from "./helpers";
import { generateReport } from "./report";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";

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
  previousTumorType: TumorType;
  location: Location;
  hadPreviousTreatment: Troolean;
  previousTreatment: Treatment;
  lesionAspect: LesionAspect;

  // Macroscopy
  chipWeight: number; // In grams
  samplingType: SamplingType;
  blockCount: number;
  coloration: ColorationType;

  // Microscopy
  tumorType: TumorType;
  grade: string;
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
  previousTumorType: TUMOR_TYPE_OPTIONS[0].value,
  location: LOCATION_OPTIONS[0].value,
  hadPreviousTreatment: "unspecified",
  previousTreatment: TREATMENT_OPTIONS[0].value,
  lesionAspect: LESION_ASPECT_OPTIONS[0].value,

  // Macroscopy
  chipWeight: 0,
  samplingType: "full",
  blockCount: 0,
  coloration: "HES",

  // Microscopy
  tumorType: TUMOR_TYPE_OPTIONS[0].value,
  grade: "",
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
  const hasErrors = !!macroscopyErrors.length;

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
        <Select
          label="Antécédents de maladie des voies urinaires ou de métastases à distance"
          options={TROOLEAN_OPTIONS}
          value={state.medicalHistory}
          onChange={setField("medicalHistory")}
        />
      </Line>
      {state.medicalHistory === "yes" ? (
        <>
          <Line>
            <Select
              label="Type histologique de la tumeur"
              options={TUMOR_TYPE_OPTIONS}
              value={state.previousTumorType}
              onChange={setField("previousTumorType")}
            />
          </Line>
          <Line>
            <Select
              label="Localisation"
              options={LOCATION_OPTIONS}
              value={state.location}
              onChange={setField("location")}
            />
          </Line>
          <Line>
            <Select
              label="Traitements antérieurs"
              options={TROOLEAN_OPTIONS}
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
  | "hasLymphaticOrVascularInvasion"
  | "muscularisPropria"
  | "otherResults"
>;
const MicroscopySection = ({
  index,
  state,
  setState,
}: {
  index: number;
  state: MicroscopyState;
  setState: (value: MicroscopyState) => void;
}) => {
  const setField = patchState(state, setState);

  const gradeOptions = useMemo(
    () => getGradeOptions(state.tumorType),
    [state.tumorType],
  );

  // When grade options change, reset grade to first available value
  useEffect(
    () => {
      setField("grade")(gradeOptions[0].value ?? "");
    },
    // CAUTION: we disable the check on setField (which is unstable by nature) here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gradeOptions],
  );

  return (
    <Section index={index} title="Microscopie">
      <Line>
        <Select
          label="Type histologique de la tumeur"
          options={TUMOR_TYPE_OPTIONS}
          value={state.tumorType}
          onChange={setField("tumorType")}
        />
      </Line>
      <Line>
        <div
          style={{
            backgroundColor: "pink",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        >
          TODO: tumoral sub-type (to be discussed with Louis)
        </div>
      </Line>
      {state.tumorType === "other" ? (
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
      <Line>
        <div
          style={{
            backgroundColor: "pink",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        >
          TODO: tumoral extension (to be discussed with Louis)
        </div>
      </Line>
      <SelectLymphaticOrVascularInvasion
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
        <Select
          label="Copeaux de résection présentant de la musculeuse"
          options={TROOLEAN_OPTIONS}
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
