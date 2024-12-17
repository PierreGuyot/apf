import { ReactNode, useEffect } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { HasEpn } from "../../../common/epn/HasEpn";
import { FormPage } from "../../../common/FormPage";
import { IhcState } from "../../../common/immunohistochemistry/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { HasLymphoVascularInvasion } from "../../../common/invasion/HasLymphoVascularInvasion";
import {
  filterNullish,
  InputNumber,
  InputText,
  NestedItem,
  patchState,
  Section,
  Select,
  SelectBoolean,
  SelectList,
  SelectPresence,
  Stack,
  Summary,
  useForm,
} from "../../../ui";
import { ERROR_MANDATORY_FIELD, reduceErrors } from "../../../validation";
import {
  BRESLOW_THICKNESS_TYPE_OPTIONS,
  BreslowThicknessType,
  CLARK_INFILTRATION_LEVELS,
  ClarkInfiltrationLevel,
  ExeresisType,
  EXERIS_TYPE_OPTIONS_NOT_ORIENTED,
  EXERIS_TYPE_OPTIONS_ORIENTED,
  GROWTH_PHASE_OPTIONS,
  GrowthPhase,
  INVASIVE_MELANOMA_ANTIBODY_GROUPS,
  INVASIVE_MELANOMA_ANTIBODY_PROPERTIES,
  LYMPH_NODE_EXERESIS_OPTIONS,
  LymphNodeExeresis,
  LYMPHOCYTE_OPTIONS,
  LymphocyteOption,
  MARGIN_STATE_OPTIONS,
  MarginState,
  MELANOCYTIC_LESION_GROUPS,
  MelanocyticLesion,
  MOLECULAR_BIOLOGY_OPTIONS,
  MolecularBiology,
  Morphology,
  MORPHOLOGY_OPTIONS,
  ORIENTATION_OPTIONS_FULL,
  OrientationFull,
  SAMPLING_TYPE_OPTIONS,
  SamplingType,
  Subtype,
  SUBTYPE_OPTIONS,
} from "./helpers";
import { Macroscopy } from "./macroscopy/Macroscopy";
import { getMacroscopyState, MacroscopyState } from "./macroscopy/state";
import { validateMacroscopy } from "./macroscopy/validation";
import { generateReport } from "./report";
import { validateIhc } from "../../../common/immunohistochemistry/validation";

export type FormState = MacroscopyState & {
  // Clinical info
  lesionSite: string;
  samplingType: SamplingType;
  samplingTypeOther: string;
  lymphNodeExeresis: LymphNodeExeresis;
  lymphNodeExeresisLocation: string;

  // Microscopy
  subtype: Subtype;
  subtypeOther: string;
  growthPhase: GrowthPhase;
  thickness: Thickness;
  hasUlceration: boolean;
  mitoticActivity: number;
  hasTumoralRegression: boolean;
  intraTumoralLymphocytes: LymphocyteOption;
  hasMicroSatellites: boolean;
  microSatelliteMarginState: MarginState;
  hasLymphaticOrVascularInvasion: boolean;
  hasEpn: boolean;
  otherMelanocyticLesions: MelanocyticLesion[];
  specimenExeresis: SpecimenExeresis;

  // Lymph node status
  lymphNodeCount: number;
  positiveLymphNodeCount: number;
  hasExtranodalExtension: boolean;
  largestMetastasisSize: number;

  // Ancillary studies
  ihc: IhcState;
  hasMolecularBiology: boolean;
  molecularBiology: MolecularBiology;

  // Additional remarks
  comments: string;
};

type Thickness = {
  clarkThickness: ClarkInfiltrationLevel;
  breslowThickness: BreslowThickness;
};

type BreslowThickness = {
  type: BreslowThicknessType;
  distance: number;
  morphology: Morphology;
};

type SpecimenExeresis = {
  type: ExeresisType;
  position: OrientationFull;
  distanceLateral: number;
  distanceDepth: number;
};

const getInitialState = (): FormState => ({
  lesionSite: "",
  samplingType: "exeresis",
  samplingTypeOther: "",
  lymphNodeExeresis: "no",
  lymphNodeExeresisLocation: "",

  ...getMacroscopyState(),

  subtype: "Mélanome à extension superficielle (SSM)",
  subtypeOther: "",
  growthPhase: "horizontal",
  thickness: {
    clarkThickness: 1,
    breslowThickness: {
      type: "precised",
      distance: 0,
      morphology: "Épithélioïde",
    },
  },
  hasUlceration: false,
  mitoticActivity: 0,
  hasTumoralRegression: false,
  intraTumoralLymphocytes: "none",
  hasMicroSatellites: false,
  microSatelliteMarginState: "unspecified",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherMelanocyticLesions: [],
  specimenExeresis: {
    type: "oriented-complete-with-margins",
    position: "à 12h",
    distanceLateral: 0,
    distanceDepth: 0,
  },
  lymphNodeCount: 0,
  positiveLymphNodeCount: 0,
  hasExtranodalExtension: false,
  largestMetastasisSize: 0,
  ihc: {
    hasIhc: false,
    blocks: [],
  },
  hasMolecularBiology: false,
  molecularBiology: "New Generation Sequencing",
  comments: "",
});

type Props = {
  formId: "invasive-melanoma";
};

const validateSpecimenExeresis = (value: SpecimenExeresis) => {
  const inputDistanceLateral = value.distanceLateral
    ? undefined
    : ERROR_MANDATORY_FIELD;
  const inputDistanceDepth = value.distanceDepth
    ? undefined
    : ERROR_MANDATORY_FIELD;

  switch (value.type) {
    case "oriented-complete-with-margins":
    case "simple-complete-with-margins": {
      return { inputDistanceLateral, inputDistanceDepth };
    }

    case "oriented-incomplete-laterally": {
      return { inputDistanceDepth };
    }

    default:
      return {};
  }
};

const validateForm = (state: FormState) => ({
  // Clinical info
  lesionSite: state.lesionSite ? undefined : ERROR_MANDATORY_FIELD,
  samplingType:
    state.samplingType !== "other" || state.samplingTypeOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  lymphNodeExeresisLocation: state.lymphNodeExeresisLocation
    ? undefined
    : ERROR_MANDATORY_FIELD,

  ...validateMacroscopy(state),

  // Microscopy
  subtypeOther:
    state.subtype !== "other" || state.subtypeOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  breslowThickness: state.thickness.breslowThickness.distance
    ? undefined
    : ERROR_MANDATORY_FIELD,
  // NOTE: mitoticActivity can be 0
  specimenExeresis: validateSpecimenExeresis(state.specimenExeresis),

  // Lymph node status
  ...validateLymphNodeStatus(state),

  // Immunohistochemistry
  ihc: validateIhc({
    ihc: state.ihc,
    containerCount: state.blockCount,
  }),
});

const validateLymphNodeStatus = (state: FormState) => {
  if (state.lymphNodeExeresis === "no") {
    return {};
  }

  return {
    lymphNodeCount: state.lymphNodeCount ? undefined : ERROR_MANDATORY_FIELD,
    positiveLymphNodeCount: [
      state.positiveLymphNodeCount ? undefined : ERROR_MANDATORY_FIELD,
      state.lymphNodeCount >= state.positiveLymphNodeCount
        ? undefined
        : "Le nombre de ganglions positifs doit être inférieur ou égal au nombre de ganglions étudiés.",
    ].filter(filterNullish),
    largestMetastasisSize:
      state.positiveLymphNodeCount === 0 || state.largestMetastasisSize
        ? undefined
        : ERROR_MANDATORY_FIELD,
  };
};

// FIXME: translate form
export const InvasiveMelanomaForm = ({ formId }: Props) => {
  const { state, setState, clearState, setField } = useForm(getInitialState);

  const errors = validateForm(state);
  const hasErrors = reduceErrors(errors);

  let index = 1;

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <Section index={index++} title="Renseignements cliniques">
          <InputText
            label="Site de la lésion"
            value={state.lesionSite}
            onChange={setField("lesionSite")}
            errors={errors.lesionSite}
          />
          <Stack direction="row" spacing="sm" alignItems="start">
            <Select
              label="Type de prélèvement"
              options={SAMPLING_TYPE_OPTIONS}
              value={state.samplingType}
              onChange={setField("samplingType")}
            />
            {state.samplingType === "other" ? (
              <InputText
                value={state.samplingTypeOther}
                onChange={setField("samplingTypeOther")}
                errors={errors.samplingType}
              />
            ) : undefined}
          </Stack>

          <Select
            label="Exérèse ganglionnaire"
            options={LYMPH_NODE_EXERESIS_OPTIONS}
            value={state.lymphNodeExeresis}
            onChange={setField("lymphNodeExeresis")}
          />
          {state.lymphNodeExeresis === "no" ? undefined : (
            <NestedItem depth={1}>
              <InputText
                label="Localisation"
                value={state.lymphNodeExeresisLocation}
                onChange={setField("lymphNodeExeresisLocation")}
                errors={errors.lymphNodeExeresisLocation}
              />
            </NestedItem>
          )}
        </Section>

        <Macroscopy
          index={index++}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={errors}
        />

        <Section index={index++} title="Microscopie">
          <Stack direction="row" alignItems="start" spacing="sm">
            <Select
              label="Sous-type de mélanome"
              options={SUBTYPE_OPTIONS}
              value={state.subtype}
              onChange={setField("subtype")}
            />
            {state.subtype === "other" ? (
              <InputText
                value={state.subtypeOther}
                onChange={setField("subtypeOther")}
                errors={errors.subtypeOther}
              />
            ) : undefined}
          </Stack>
          <Select
            label="Phase de croissance"
            options={GROWTH_PHASE_OPTIONS}
            value={state.growthPhase}
            onChange={setField("growthPhase")}
          />
          <InputThickness
            state={state.thickness}
            setState={setField("thickness")}
            error={errors.breslowThickness}
          />
          <SelectPresence
            label="Ulcération"
            grammaticalForm={{ gender: "feminine", number: "singular" }}
            value={state.hasUlceration}
            onChange={setField("hasUlceration")}
          />
          <InputNumber
            label="Activité mitotique"
            unit="mitoses-per-mm-2"
            isDecimal
            value={state.mitoticActivity}
            onChange={setField("mitoticActivity")}
          />
          <SelectPresence
            label="Régression tumorale"
            grammaticalForm={{ gender: "feminine", number: "singular" }}
            value={state.hasTumoralRegression}
            onChange={setField("hasTumoralRegression")}
          />
          <Select
            label="Lymphocytes intra-tumoraux"
            options={LYMPHOCYTE_OPTIONS}
            value={state.intraTumoralLymphocytes}
            onChange={setField("intraTumoralLymphocytes")}
          />
          <HasEpn value={state.hasEpn} onChange={setField("hasEpn")} />
          <HasLymphoVascularInvasion
            value={state.hasLymphaticOrVascularInvasion}
            onChange={setField("hasLymphaticOrVascularInvasion")}
          />
          <SelectList
            label="Autres lésions mélanocytaires associées"
            groups={MELANOCYTIC_LESION_GROUPS}
            values={state.otherMelanocyticLesions}
            onChange={setField("otherMelanocyticLesions")}
          />
          <SelectPresence
            grammaticalForm={{ gender: "masculine", number: "plural" }}
            label="Nodules satellites (micro-satellites)"
            value={state.hasMicroSatellites}
            onChange={setField("hasMicroSatellites")}
          />
          {state.hasMicroSatellites ? (
            <NestedItem depth={1}>
              <Select
                label="Marges"
                options={MARGIN_STATE_OPTIONS}
                value={state.microSatelliteMarginState}
                onChange={setField("microSatelliteMarginState")}
              />
            </NestedItem>
          ) : undefined}
          <InputExeresis
            state={state.specimenExeresis}
            isSpecimenOriented={state.isSpecimenOriented}
            setState={setField("specimenExeresis")}
            errors={errors.specimenExeresis}
          />
        </Section>
        {state.lymphNodeExeresis === "no" ? undefined : (
          <Section index={index++} title="Statut ganglionnaire">
            <InputNumber
              label="Nombre de ganglions étudiés"
              value={state.lymphNodeCount}
              onChange={setField("lymphNodeCount")}
              errors={errors.lymphNodeCount}
            />
            <Stack spacing="xs">
              <InputNumber
                label="Nombre de ganglions positifs"
                value={state.positiveLymphNodeCount}
                onChange={setField("positiveLymphNodeCount")}
                errors={errors.positiveLymphNodeCount}
              />
            </Stack>
            {state.positiveLymphNodeCount > 0 ? (
              <NestedItem depth={1}>
                <SelectBoolean
                  label="Extension extra-ganglionnaire"
                  value={state.hasExtranodalExtension}
                  onChange={setField("hasExtranodalExtension")}
                />
                <InputNumber
                  label="Diamètre de la plus grande métastase ganglionnaire"
                  unit="mm"
                  isDecimal
                  value={state.largestMetastasisSize}
                  onChange={setField("largestMetastasisSize")}
                  errors={errors.largestMetastasisSize}
                />
              </NestedItem>
            ) : undefined}
          </Section>
        )}
        <Section index={index++} title="Techniques complémentaires">
          <Immunohistochemistry
            containerCount={state.blockCount}
            groups={INVASIVE_MELANOMA_ANTIBODY_GROUPS}
            properties={INVASIVE_MELANOMA_ANTIBODY_PROPERTIES}
            state={state.ihc}
            setState={setField("ihc")}
            errors={errors.ihc}
          />

          {/* FIXME: complete list */}
          <SelectBoolean
            label="Avez-vous fait une demande de biologie moléculaire?"
            value={state.hasMolecularBiology}
            onChange={setField("hasMolecularBiology")}
          />
          {state.hasMolecularBiology ? (
            <NestedItem depth={1}>
              <Select
                label="Type"
                options={MOLECULAR_BIOLOGY_OPTIONS}
                value={state.molecularBiology}
                onChange={setField("molecularBiology")}
              />
            </NestedItem>
          ) : undefined}
        </Section>
        <AdditionalRemarks
          index={index++}
          value={state.comments}
          onChange={setField("comments")}
        />
        {hasErrors ? undefined : (
          <Summary
            getContent={(language) =>
              generateReport({ form: { ...state, formId }, language })
            }
          />
        )}
      </Stack>
    </FormPage>
  );
};

const InputThickness = ({
  state,
  setState,
  error,
}: {
  state: Thickness;
  setState: (state: Thickness) => void;
  error?: string;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Select
        label="Épaisseur selon Clark"
        options={CLARK_INFILTRATION_LEVELS}
        value={state.clarkThickness}
        onChange={setField("clarkThickness")}
      />
      {state.clarkThickness === 1 ? undefined : (
        <InputBreslowThickness
          state={state.breslowThickness}
          setState={setField("breslowThickness")}
          error={error}
        />
      )}
    </>
  );
};

const InputBreslowThickness = ({
  state,
  setState,
  error,
}: {
  state: BreslowThickness;
  setState: (state: BreslowThickness) => void;
  error?: string;
}) => {
  const setField = patchState(state, setState);

  return (
    <Stack direction="row" alignItems="start" spacing="sm">
      <Select
        options={BRESLOW_THICKNESS_TYPE_OPTIONS}
        label="Épaisseur selon Breslow"
        value={state.type}
        onChange={setField("type")}
      />
      <InputNumber
        value={state.distance}
        unit="mm"
        isDecimal
        onChange={setField("distance")}
        errors={error}
      />
      {state.distance > 0 ? (
        <Select
          options={MORPHOLOGY_OPTIONS}
          value={state.morphology}
          onChange={setField("morphology")}
        />
      ) : undefined}
    </Stack>
  );
};

// TODO clean: handle read-only mode
const ExeresisTypeDescription = ({
  state,
  setState,
  errors,
}: {
  state: SpecimenExeresis;
  setState: (value: SpecimenExeresis) => void;
  errors: ReturnType<typeof validateSpecimenExeresis>;
}): Exclude<ReactNode, undefined> => {
  const setField = patchState(state, setState);
  const inputDistanceLateral = (
    <InputNumber
      isDecimal
      isInline
      unit="mm"
      value={state.distanceLateral}
      errors={errors.inputDistanceLateral}
      onChange={setField("distanceLateral")}
    />
  );
  const inputDistanceDepth = (
    <InputNumber
      isDecimal
      isInline
      unit="mm"
      value={state.distanceDepth}
      errors={errors.inputDistanceDepth}
      onChange={setField("distanceDepth")}
    />
  );
  const selectPosition = (
    <Select
      isInline
      options={ORIENTATION_OPTIONS_FULL}
      value={state.position}
      onChange={setField("position")}
    />
  );

  switch (state.type) {
    case "oriented-complete-with-margins": {
      return (
        <>
          Les limites chirurgicales latérales et profondes, passent en zone
          saine, arrivant au plus proche à {inputDistanceLateral} de la limite
          latérale {selectPosition} et {inputDistanceDepth} en profondeur.
        </>
      );
    }

    case "oriented-incomplete-laterally": {
      return (
        <>
          Les limites chirurgicales latérales passent en zone lésionnelle,
          arrivant au contact de la limite latérale {selectPosition}. La limite
          chirurgicale profonde passe en zone saine avec une marge minimale de{" "}
          {inputDistanceDepth}.
        </>
      );
    }

    case "non-assessable-specimen": {
      return (
        <>
          La nature du prélèvement ne permet pas d'évaluer la qualité de
          l'exérèse.
        </>
      );
    }

    case "non-assessable-specimen-inclusion": {
      return (
        <>
          L'inclusion tangentielle du prélèvement ne permet pas d'évaluer la
          qualité de l'exérèse.
        </>
      );
    }

    case "simple-complete": {
      return (
        <>
          Les limites chirurgicales, latérales et profondes, passent en zone
          saine.
        </>
      );
    }

    case "simple-complete-with-margins": {
      return (
        <>
          Les limites chirurgicales, latérales et profondes, passent en zone
          saine, arrivant au plus proche à {inputDistanceLateral} latéralement
          et {inputDistanceDepth} en profondeur.
        </>
      );
    }

    case "simple-incomplete-laterally": {
      return (
        <>
          Les limites chirurgicales latérales passent en zone lésionnelle. La
          limite chirurgicale profonde passe en zone saine.
        </>
      );
    }

    case "simple-incomplete-depth": {
      return (
        <>
          Les limites chirurgicales latérales passent en zone saine. La limite
          chirurgicale profonde passe en zone lésionnelle.
        </>
      );
    }
  }
};

// TODO: extract to a separate file for dermatology
const InputExeresis = ({
  state,
  setState,
  isSpecimenOriented,
  errors,
}: {
  state: SpecimenExeresis;
  setState: (state: SpecimenExeresis) => void;
  isSpecimenOriented: boolean;
  errors: ReturnType<typeof validateSpecimenExeresis>;
}) => {
  const setField = patchState(state, setState);

  const options = isSpecimenOriented
    ? EXERIS_TYPE_OPTIONS_ORIENTED
    : EXERIS_TYPE_OPTIONS_NOT_ORIENTED;

  // When options change, reset type to first available value
  useEffect(
    () => {
      const firstOption = options[0]?.value ?? "simple-complete";
      setField("type")(firstOption);
    },
    // TODO CLEAN: find a way to clean this
    // CAUTION: we disable the check on setField (which is unstable by nature) here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );

  return (
    <>
      <Select
        label="Exérèse du prélèvement"
        options={options}
        value={state.type}
        onChange={setField("type")}
      />
      <NestedItem depth={1}>
        <Stack spacing="xs">
          {/* CAUTION: this div is necessary for wrapping */}
          <div>
            <ExeresisTypeDescription
              state={state}
              setState={setState}
              errors={errors}
            />
          </div>
        </Stack>
      </NestedItem>
    </>
  );
};
