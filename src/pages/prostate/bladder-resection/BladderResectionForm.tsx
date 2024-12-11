import { Mode } from "fs";
import { useEffect, useState } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { ModePicker } from "../../../common/ModePicker";

import { HasLymphoVascularInvasion } from "../../../common/invasion/HasLymphoVascularInvasion";
import { ResectionMacroscopy } from "../../../common/resection-macroscopy/ResectionMacroscopy";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection-macroscopy/validation";
import {
  InputNumber,
  InputText,
  Line,
  NestedItem,
  noop,
  patchState,
  Section,
  Select,
  SelectBoolean,
  SelectList,
  SelectPresence,
  Stack,
  Summary,
  Text,
  useForm,
} from "../../../ui";
import {
  BLADDER_RESECTION_ANTIBODY_GROUPS,
  BLADDER_RESECTION_ANTIBODY_PROPERTIES,
  BladderResectionFormId,
  DEFAULT_FULL_LOCATION,
  FullLocation,
  getSublocationOptions,
  LESION_ASPECT_OPTIONS,
  LesionAspect,
  LOCATION_OPTIONS,
  NON_TUMORAL_RESULT_GROUPS,
  Treatment,
  TREATMENT_GROUPS,
  TUMORAL_RESULT_GROUPS,
} from "./helpers";
import { generateReport } from "./report";
import { TumorInput } from "./tumor-input/TumorInput";
import { DEFAULT_TUMOR, Ptnm, Tumor } from "./tumor-input/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { IhcState } from "../../../common/immunohistochemistry/helpers";

type MuscularisPropria = {
  isPresent: boolean;
  chipCount: number;
  invadedChipCount: number;
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
  medicalHistory: boolean;
  previousTumor: Tumor;

  location: FullLocation;
  previousTreatments: Treatment[];
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

  // Immunohistochemistry
  ihc: IhcState;

  // Additional notes
  comments: string;
};

const getInitialState = (): FormState => ({
  // Clinical info
  // Standard mode
  clinicalInfo: "",

  // Expert mode
  medicalHistory: false,
  previousTumor: DEFAULT_TUMOR,
  location: DEFAULT_FULL_LOCATION,
  previousTreatments: [],
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
    isPresent: false,
    chipCount: 0,
    invadedChipCount: 0,
    notes: "",
  },
  otherResults: {
    tumoral: [],
    nonTumoral: [],
  },

  // Immunohistochemistry
  ihc: {
    hasIhc: false,
    blocks: [],
  },

  // Additional notes
  comments: "",
});

type Props = {
  formId: BladderResectionFormId;
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
  const hasErrors = !!macroscopyErrors.length;

  let index = 1;

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        {isExpertMode ? (
          <ClinicalInfoExpert
            index={index++}
            state={state}
            setState={(value) => setState({ ...state, ...value })}
          />
        ) : (
          <ClinicalInfo
            index={index++}
            value={clinicalInfo}
            onChange={setField("clinicalInfo")}
          />
        )}

        <ResectionMacroscopy
          index={index++}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={macroscopyErrors}
        />

        <MicroscopySection
          index={index++}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
        />

        <Section index={index++} title="Immunohistochimie">
          <Immunohistochemistry
            containerCount={state.blockCount}
            groups={BLADDER_RESECTION_ANTIBODY_GROUPS}
            properties={BLADDER_RESECTION_ANTIBODY_PROPERTIES}
            state={state.ihc}
            setState={setField("ihc")}
          />{" "}
        </Section>

        <AdditionalRemarks
          index={index++}
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
  | "previousTreatments"
  | "lesionAspect"
  | "otherLesionAspect"
>;
const ClinicalInfoExpert = ({
  index,
  state,
  setState,
}: {
  index: number;
  state: ClinicalInfoState;
  setState: (value: ClinicalInfoState) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Section title="Renseignements cliniques" index={index}>
      <SelectBoolean
        label="Antécédents de maladie des voies urinaires ou de métastases à distance"
        value={state.medicalHistory}
        onChange={setField("medicalHistory")}
      />
      {state.medicalHistory ? (
        <>
          {/* TODO clean: fix line height */}
          <TumorInput
            state={state.previousTumor}
            setState={setField("previousTumor")}
            hasGrade
            hasExtension
          />
          <LocationInput
            state={state.location}
            setState={setField("location")}
          />
          <Line>
            <SelectList
              label="Traitements antérieurs"
              groups={TREATMENT_GROUPS}
              values={state.previousTreatments}
              onChange={setField("previousTreatments")}
            />
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
}: {
  index: number;
  state: MicroscopyState;
  setState: (value: MicroscopyState) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Section index={index} title="Microscopie">
      <TumorInput
        state={state.tumor}
        setState={setField("tumor")}
        hasGrade
        hasExtension
      />
      <HasLymphoVascularInvasion
        value={state.hasLymphaticOrVascularInvasion}
        onChange={setField("hasLymphaticOrVascularInvasion")}
      />
      <InputMuscularisPropria
        tumorExtension={state.tumor.extension}
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
  tumorExtension,
  state,
  setState,
}: {
  tumorExtension: Ptnm;
  state: MuscularisPropria;
  setState: (value: MuscularisPropria) => void;
}) => {
  const setField = patchState(state, setState);
  const hasTumorInvasion =
    tumorExtension !== "pT1" &&
    tumorExtension !== "pT1a" &&
    tumorExtension !== "pT1b";

  return (
    <>
      <SelectPresence
        label="Copeaux de résection présentant de la musculeuse"
        grammaticalForm={{ gender: "masculine", number: "plural" }}
        value={state.isPresent}
        onChange={setField("isPresent")}
      />
      {state.isPresent ? (
        <NestedItem depth={1}>
          <InputNumber
            label="Nombre de copeaux"
            value={state.chipCount}
            onChange={setField("chipCount")}
          />
          {hasTumorInvasion ? (
            <InputNumber
              label="Nombre de copeaux présentant une invasion tumorale"
              value={state.invadedChipCount}
              onChange={setField("invadedChipCount")}
            />
          ) : undefined}
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
