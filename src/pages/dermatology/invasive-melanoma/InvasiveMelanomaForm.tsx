import { ReactNode, useEffect } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { HasEpn } from "../../../common/epn/HasEpn";
import { FormPage } from "../../../common/FormPage";
import {
  IhcState,
  validateIhc,
} from "../../../common/immunohistochemistry/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { HasLymphoVascularInvasion } from "../../../common/invasion/HasLymphoVascularInvasion";
import {
  ErrorMessage,
  filterNullish,
  InputNumber,
  InputText,
  InputTextArea,
  Line,
  NestedItem,
  patchState,
  Section,
  Select,
  SelectBoolean,
  SelectList,
  SelectPresence,
  SelectTroolean,
  Stack,
  Summary,
  Troolean,
  useForm,
} from "../../../ui";
import {
  Aspect,
  ASPECT_OPTIONS,
  BRESLOW_THICKNESS_TYPE_OPTIONS,
  BreslowThicknessType,
  CLARK_INFILTRATION_LEVELS,
  ClarkInfiltrationLevel,
  Dimension2d,
  Dimension3d,
  DIMENSION_2D_OPTIONS,
  DIMENSION_3D_OPTIONS,
  ExeresisType,
  EXERIS_TYPE_OPTIONS_NOT_ORIENTED,
  EXERIS_TYPE_OPTIONS_ORIENTED,
  GROWTH_PHASE_OPTIONS,
  GrowthPhase,
  Inking,
  INKING_COLORS_OPTIONS,
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
  Orientation,
  ORIENTATION_METHOD_OPTIONS,
  ORIENTATION_OPTIONS,
  ORIENTATION_OPTIONS_FULL,
  OrientationFull,
  OrientationMethod,
  SAMPLING_TYPE_OPTIONS,
  SamplingType,
  Subtype,
  SUBTYPE_OPTIONS,
} from "./helpers";
import { generateReport } from "./report";

export type FormState = {
  // Clinical info
  lesionSite: string;
  samplingType: SamplingType;
  samplingTypeOther: string;
  lymphNodeExeresis: LymphNodeExeresis;
  lymphNodeExeresisLocation: string;

  // Macroscopy
  isSpecimenOriented: boolean;
  orientationMethod: OrientationMethod;
  orientationMethodOther: string;
  orientation: Orientation;
  orientationOther: string;
  specimenDimensions: {
    type: Dimension3d;
    length: number;
    width: number;
    depth: number;
  };
  lesionDimensions: {
    type: Dimension2d;
    length: number;
    width: number;
  };
  lesionAspect: Aspect;
  lesionAspectOther: string;
  hasSatelliteLesions: boolean;
  hasOtherLesions: boolean;
  otherLesionsDescription: string;
  inking: Inking;
  isIncludedInTotality: Troolean;
  blockCount: number;
  blockDescription: string;

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
  isSpecimenOriented: true,
  orientationMethod: "Fil",
  orientationMethodOther: "",
  orientation: "à 12h",
  orientationOther: "",
  specimenDimensions: {
    type: "specified-with-depth",
    length: 0,
    width: 0,
    depth: 0,
  },
  lesionDimensions: {
    type: "specified-without-depth",
    length: 0,
    width: 0,
  },
  lesionAspect: "Pigmentée",
  lesionAspectOther: "",
  hasSatelliteLesions: false,
  hasOtherLesions: false,
  otherLesionsDescription: "",
  inking: {
    hasInking: false,
    color: "blue",
    orientation: "other",
    orientationOther: "",
  },
  isIncludedInTotality: "unspecified",
  blockCount: 1,
  blockDescription: "",
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

// TODO: clean and extract validation helpers
type Error = string | string[] | undefined;
const reduceErrors = (errors: Record<string, Error> | Error[]) =>
  !!Object.values(errors).filter((value) =>
    Array.isArray(value) ? !!value.length : !!value,
  ).length;
const validateDimensions = ({
  type,
  length,
  width,
  depth = 0,
}: {
  type: Dimension3d;
  length: number;
  width: number;
  depth?: number;
}): string[] => {
  switch (type) {
    case "unspecified": {
      return [];
    }
    case "specified-with-depth": {
      return [
        length ? undefined : "Le champ Longueur doit être renseigné.",
        width ? undefined : "Le champ Largeur doit être renseigné.",
        depth ? undefined : "Le champ Profondeur doit être renseigné.",
      ].filter(filterNullish);
    }
    case "specified-without-depth": {
      return [
        length ? undefined : "Le champ Longueur doit être renseigné.",
        width ? undefined : "Le champ Largeur doit être renseigné.",
      ].filter(filterNullish);
    }
  }
};

const validateSpecimenExeresis = (value: SpecimenExeresis) => {
  const inputDistanceLateral = value.distanceLateral
    ? undefined
    : "La distance latérale doit être renseignée.";
  const inputDistanceDepth = value.distanceDepth
    ? undefined
    : "La profondeur doit être renseignée.";

  switch (value.type) {
    case "oriented-complete-with-margins":
    case "simple-complete-with-margins": {
      return [inputDistanceLateral, inputDistanceDepth].filter(filterNullish);
    }

    case "oriented-incomplete-laterally": {
      return [inputDistanceDepth].filter(filterNullish);
    }

    default:
      return [];
  }
};

const ERROR_MANDATORY_FIELD = "Champ obligatoire";

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

  // Macroscopy
  orientationMethodOther:
    state.orientationMethod !== "other" || state.orientationMethodOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  orientationOther:
    state.orientation !== "other" || state.orientationOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  specimenDimensions: validateDimensions(state.specimenDimensions),
  lesionDimensions: validateDimensions(state.lesionDimensions),
  lesionAspectOther:
    state.lesionAspect !== "other" || state.lesionAspectOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  otherLesionsDescription:
    !state.hasOtherLesions || state.otherLesionsDescription
      ? undefined
      : ERROR_MANDATORY_FIELD,
  inkingOrientationOther:
    state.inking.orientation !== "other" || state.inking.orientationOther
      ? undefined
      : ERROR_MANDATORY_FIELD,
  blockDescription: state.blockDescription ? undefined : ERROR_MANDATORY_FIELD,

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
            errorMessage={errors.lesionSite}
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
                errorMessage={errors.samplingType}
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
                errorMessage={errors.lymphNodeExeresisLocation}
              />
            </NestedItem>
          )}
        </Section>

        {/* TODO: extract to a separate file for dermatology */}
        <Section index={index++} title="Macroscopie">
          <SelectBoolean
            label="Orientation du prélèvement"
            value={state.isSpecimenOriented}
            onChange={setField("isSpecimenOriented")}
          />
          {state.isSpecimenOriented ? (
            <NestedItem depth={1}>
              <Stack direction="row" alignItems="start" spacing="sm">
                <Select
                  options={ORIENTATION_METHOD_OPTIONS}
                  value={state.orientationMethod}
                  onChange={setField("orientationMethod")}
                />
                {state.orientationMethod === "other" ? (
                  <InputText
                    value={state.orientationMethodOther}
                    onChange={setField("orientationMethodOther")}
                    errorMessage={errors.orientationMethodOther}
                  />
                ) : undefined}
                {state.orientationMethod === "Liège" ? undefined : (
                  <>
                    <Select
                      label="situé"
                      options={ORIENTATION_OPTIONS}
                      value={state.orientation}
                      onChange={setField("orientation")}
                    />
                    {state.orientation === "other" ? (
                      <InputText
                        value={state.orientationOther}
                        onChange={setField("orientationOther")}
                        errorMessage={errors.orientationOther}
                      />
                    ) : undefined}
                  </>
                )}
              </Stack>
            </NestedItem>
          ) : undefined}
          <InputSpecimen
            state={state}
            setState={(value) => setState({ ...state, ...value })}
            errors={errors}
          />
          <SelectBoolean
            label="Lésions satellites"
            value={state.hasSatelliteLesions}
            onChange={setField("hasSatelliteLesions")}
          />
          <SelectBoolean
            label="Autres lésions"
            value={state.hasOtherLesions}
            onChange={setField("hasOtherLesions")}
          />
          <InputInking
            value={state.inking}
            onChange={setField("inking")}
            error={errors.inkingOrientationOther}
          />
          {state.hasOtherLesions ? (
            <NestedItem depth={1}>
              <InputTextArea
                lineCount={2}
                label="Description"
                placeholder="Décrivez ici les autres lésions."
                value={state.otherLesionsDescription}
                onChange={setField("otherLesionsDescription")}
                errorMessage={errors.otherLesionsDescription}
              />
            </NestedItem>
          ) : undefined}
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
          {/* TODO: update block description */}
          <InputTextArea
            label="Description des blocs"
            placeholder="Décrivez ici les blocs."
            value={state.blockDescription}
            onChange={setField("blockDescription")}
          />
        </Section>
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
                errorMessage={errors.subtypeOther}
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
              errorMessage={errors.lymphNodeCount}
            />
            <Stack spacing="xs">
              <InputNumber
                label="Nombre de ganglions positifs"
                value={state.positiveLymphNodeCount}
                onChange={setField("positiveLymphNodeCount")}
              />
              <ErrorList errors={errors.positiveLymphNodeCount} />
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
                  errorMessage={errors.largestMetastasisSize}
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

type SpecimenState = Pick<
  FormState,
  | "specimenDimensions"
  | "lesionDimensions"
  | "lesionAspect"
  | "lesionAspectOther"
>;

const InputSpecimen = ({
  state,
  setState,
  errors,
}: {
  state: SpecimenState;
  setState: (state: SpecimenState) => void;
  errors: {
    specimenDimensions: string[];
    lesionDimensions: string[];
    lesionAspectOther?: string;
  };
}) => {
  // TODO clean: extract dimension helpers
  const setField = patchState(state, setState);

  return (
    <>
      <Select
        label="Taille du prélèvement"
        options={DIMENSION_3D_OPTIONS}
        value={state.specimenDimensions.type}
        onChange={(value) =>
          setField("specimenDimensions")({
            ...state.specimenDimensions,
            type: value,
          })
        }
      />
      {state.specimenDimensions.type === "unspecified" ? undefined : (
        <NestedItem depth={1}>
          <Stack spacing="sm">
            <Line>
              <InputNumber
                label="Longueur"
                unit="cm"
                isDecimal
                value={state.specimenDimensions.length}
                onChange={(value) =>
                  setField("specimenDimensions")({
                    ...state.specimenDimensions,
                    length: value,
                  })
                }
              />
              x{" "}
              <InputNumber
                label="Largeur"
                unit="cm"
                isDecimal
                value={state.specimenDimensions.width}
                onChange={(value) =>
                  setField("specimenDimensions")({
                    ...state.specimenDimensions,
                    width: value,
                  })
                }
              />
              {state.specimenDimensions.type === "specified-with-depth" ? (
                <>
                  x{" "}
                  <InputNumber
                    label="Profondeur"
                    unit="cm"
                    isDecimal
                    value={state.specimenDimensions.depth}
                    onChange={(value) =>
                      setField("specimenDimensions")({
                        ...state.specimenDimensions,
                        depth: value,
                      })
                    }
                  />
                </>
              ) : undefined}
            </Line>
            <ErrorList errors={errors.specimenDimensions} />
          </Stack>
        </NestedItem>
      )}

      <Stack direction="row" spacing="sm" alignItems="start">
        <Select
          label="Description macroscopique de la lésion"
          options={ASPECT_OPTIONS}
          value={state.lesionAspect}
          onChange={setField("lesionAspect")}
        />
        {state.lesionAspect === "other" ? (
          <InputText
            value={state.lesionAspectOther}
            onChange={setField("lesionAspectOther")}
            errorMessage={errors.lesionAspectOther}
          />
        ) : undefined}
      </Stack>

      <Select
        label="Taille de la lésion"
        options={DIMENSION_2D_OPTIONS}
        value={state.lesionDimensions.type}
        onChange={(value) =>
          setField("lesionDimensions")({
            ...state.lesionDimensions,
            type: value,
          })
        }
      />
      {state.lesionDimensions.type === "unspecified" ? undefined : (
        <NestedItem depth={1}>
          <Stack spacing="sm">
            <Line>
              <InputNumber
                label="Longueur"
                unit="mm"
                isDecimal
                value={state.lesionDimensions.length}
                onChange={(value) =>
                  setField("lesionDimensions")({
                    ...state.lesionDimensions,
                    length: value,
                  })
                }
              />
              x{" "}
              <InputNumber
                label="Largeur"
                unit="mm"
                isDecimal
                value={state.lesionDimensions.width}
                onChange={(value) =>
                  setField("lesionDimensions")({
                    ...state.lesionDimensions,
                    width: value,
                  })
                }
              />
            </Line>
            <ErrorList errors={errors.lesionDimensions} />
          </Stack>
        </NestedItem>
      )}
    </>
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
        errorMessage={error}
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
}: {
  state: SpecimenExeresis;
  setState: (value: SpecimenExeresis) => void;
}): Exclude<ReactNode, undefined> => {
  const setField = patchState(state, setState);
  const inputDistanceLateral = (
    <InputNumber
      isDecimal
      isInline
      unit="mm"
      value={state.distanceLateral}
      onChange={setField("distanceLateral")}
    />
  );
  const inputDistanceDepth = (
    <InputNumber
      isDecimal
      isInline
      unit="mm"
      value={state.distanceDepth}
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
  errors: string[];
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
            <ExeresisTypeDescription state={state} setState={setState} />
          </div>
          <ErrorList errors={errors} />
        </Stack>
      </NestedItem>
    </>
  );
};

// TODO: clean and extract
const ErrorList = ({ errors = [] }: { errors?: string[] }) => (
  <Stack>
    {errors.map((error) => (
      <ErrorMessage key={error} errorMessage={error} />
    ))}
  </Stack>
);

const InputInking = ({
  value,
  onChange,
  error,
}: {
  value: Inking;
  onChange: (value: Inking) => void;
  error?: string;
}) => {
  const setField = patchState(value, onChange);

  return (
    <>
      <SelectBoolean
        label="Encrage"
        value={value.hasInking}
        onChange={setField("hasInking")}
      />
      {value.hasInking ? (
        <NestedItem depth={1}>
          <Select
            options={INKING_COLORS_OPTIONS}
            label="Couleur"
            value={value.color}
            onChange={setField("color")}
          />
          <Stack direction="row" spacing="sm" alignItems="start">
            <Select
              options={ORIENTATION_OPTIONS}
              label="Orientation"
              value={value.orientation}
              onChange={setField("orientation")}
            />
            {value.orientation === "other" ? (
              <InputText
                value={value.orientationOther}
                onChange={setField("orientationOther")}
                errorMessage={error}
              />
            ) : undefined}
          </Stack>
        </NestedItem>
      ) : undefined}
    </>
  );
};
