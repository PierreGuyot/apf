import { ReactNode, useEffect } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { HasEpn } from "../../../common/epn/HasEpn";
import { FormPage } from "../../../common/FormPage";
import { IhcState } from "../../../common/immunohistochemistry/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { HasInvasion } from "../../../common/invasion/HasInvasion";
import {
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
  EXERESIS_POSITION_OPTIONS,
  ExeresisPosition,
  ExeresisType,
  EXERIS_TYPE_OPTIONS_NOT_ORIENTED,
  EXERIS_TYPE_OPTIONS_ORIENTED,
  GROWTH_PHASE_OPTIONS,
  GrowthPhase,
  INVASIVE_MELANOMA_ANTIBODY_GROUPS,
  INVASIVE_MELANOMA_ANTIBODY_PROPERTIES,
  Laterality,
  LATERALITY_OPTIONS,
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
  OrientationMethod,
  Presence,
  PRESENCE_OPTIONS,
  SAMPLING_TYPE_OPTIONS,
  SamplingType,
  Subtype,
  SUBTYPE_OPTIONS,
} from "./helpers";
import { generateReport } from "./report";

export type FormState = {
  // Clinical info
  lesionSite: string;
  laterality: Laterality;
  samplingType: SamplingType;
  otherSamplingType: string;
  lymphNodeExeresis: LymphNodeExeresis;
  lymphNodeExeresisLocation: string;

  // Macroscopy
  isSpecimenOriented: boolean;
  orientationMethod: OrientationMethod;
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
    depth: number;
  };
  lesionAspect: Aspect;
  otherLesionAspect: string;
  hasSatelliteLesions: boolean;
  hasOtherLesions: boolean;
  otherLesionsDescription: string;
  isIncludedInTotality: Troolean;
  blockCount: number;
  blockDescription: string;

  // Microscopy
  subtype: Subtype;
  subtypeOther: string;
  growthPhase: GrowthPhase;
  thickness: Thickness;
  hasUlceration: Presence;
  mitoticActivity: number;
  hasTumoralRegression: Presence;
  intraTumoralLymphocytes: LymphocyteOption;
  hasMicroSatellites: Presence;
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
  position: ExeresisPosition;
  distanceLateral: number;
  distanceDepth: number;
};

const getInitialState = (): FormState => ({
  lesionSite: "",
  laterality: "unspecified",
  samplingType: "exeresis",
  otherSamplingType: "",
  lymphNodeExeresis: "Ganglion sentinelle",
  lymphNodeExeresisLocation: "",
  isSpecimenOriented: true,
  orientationMethod: "Fil",
  orientation: "à 12H",
  orientationOther: "",
  specimenDimensions: {
    type: "unspecified",
    length: 0,
    width: 0,
    depth: 0,
  },
  lesionDimensions: {
    type: "unspecified",
    length: 0,
    width: 0,
    depth: 0,
  },
  lesionAspect: "unspecified",
  otherLesionAspect: "",
  hasSatelliteLesions: false,
  hasOtherLesions: false,
  otherLesionsDescription: "",
  isIncludedInTotality: "unspecified",
  blockCount: 1,
  blockDescription: "",
  subtype: "other",
  subtypeOther: "",
  growthPhase: "unspecified",
  thickness: {
    clarkThickness: 3,
    breslowThickness: {
      type: "precised",
      distance: 0,
      morphology: "Épithélioïde",
    },
  },
  hasUlceration: "not-identified",
  mitoticActivity: 0,
  hasTumoralRegression: "not-identified",
  intraTumoralLymphocytes: "none",
  hasMicroSatellites: "not-identified",
  microSatelliteMarginState: "unspecified",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherMelanocyticLesions: [],
  specimenExeresis: {
    type: "oriented-complete-with-margins",
    position: "à 12H",
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
  molecularBiology: "New generation sequencing demandé",
  comments: "",
});

type Props = {
  formId: "invasive-melanoma";
};

// FIXME: translate form
export const InvasiveMelanomaForm = ({ formId }: Props) => {
  const { state, setState, clearState, setField } = useForm(getInitialState);
  // FIXME: add validations
  //  - positiveLymphNodeCount must be <= lymphNodeCount
  //  - lesionSite is mandatory
  //  - blockCount must be > 0
  //  - All sizes in mm must be > 0
  //  - mitoticActivity can be 0
  //  - If field is set to other, fieldOther is mandatory
  const hasErrors = false;

  let i = 1;

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <Section index={i++} title="Renseignements cliniques">
          <InputText
            label="Site de la lésion"
            value={state.lesionSite}
            onChange={setField("lesionSite")}
          />
          <Select
            options={LATERALITY_OPTIONS}
            label="Latéralité"
            value={state.laterality}
            onChange={setField("laterality")}
          />

          <Line>
            <Select
              label="Type de prélèvement"
              options={SAMPLING_TYPE_OPTIONS}
              value={state.samplingType}
              onChange={setField("samplingType")}
            />
            {state.samplingType === "other" ? (
              <InputText
                value={state.otherSamplingType}
                onChange={setField("otherSamplingType")}
              />
            ) : undefined}
          </Line>

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
              />
            </NestedItem>
          )}
        </Section>
        <Section index={i++} title="Macroscopie">
          <SelectBoolean
            label="Orientation du prélèvement"
            value={state.isSpecimenOriented}
            onChange={setField("isSpecimenOriented")}
          />
          {state.isSpecimenOriented ? (
            <NestedItem depth={1}>
              <Line>
                <Select
                  options={ORIENTATION_METHOD_OPTIONS}
                  value={state.orientationMethod}
                  onChange={setField("orientationMethod")}
                />
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
                      />
                    ) : undefined}
                  </>
                )}
              </Line>
            </NestedItem>
          ) : undefined}
          <InputSpecimen
            state={state}
            setState={(value) => setState({ ...state, ...value })}
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
          {state.hasOtherLesions ? (
            <NestedItem depth={1}>
              <InputTextArea
                lineCount={2}
                label="Description"
                value={state.otherLesionsDescription}
                onChange={setField("otherLesionsDescription")}
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
          {/* FIXME: rework */}
          <InputTextArea
            label="Description des blocs"
            value={state.blockDescription}
            onChange={setField("blockDescription")}
          />
        </Section>
        <Section index={i++} title="Microscopie">
          <Line>
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
              />
            ) : undefined}
          </Line>
          <Select
            label="Phase de croissance"
            options={GROWTH_PHASE_OPTIONS}
            value={state.growthPhase}
            onChange={setField("growthPhase")}
          />

          <InputThickness
            state={state.thickness}
            setState={setField("thickness")}
          />

          {/* TODO clean: add SelectPresence with grammatical gender */}
          <Select
            label="Ulcération"
            options={PRESENCE_OPTIONS}
            value={state.hasUlceration}
            onChange={setField("hasUlceration")}
          />
          <InputNumber
            label="Activité mitotique"
            unit="mm-2"
            value={state.mitoticActivity}
            onChange={setField("mitoticActivity")}
          />
          <Select
            label="Régression tumorale"
            options={PRESENCE_OPTIONS}
            value={state.hasTumoralRegression}
            onChange={setField("hasTumoralRegression")}
          />
          <Select
            label="Lymphocites intra-tumoraux"
            options={LYMPHOCYTE_OPTIONS}
            value={state.intraTumoralLymphocytes}
            onChange={setField("intraTumoralLymphocytes")}
          />

          <Select
            label="Nodules satellites (micro-satellites)"
            options={PRESENCE_OPTIONS}
            value={state.hasMicroSatellites}
            onChange={setField("hasMicroSatellites")}
          />
          {state.hasMicroSatellites === "present" ? (
            <NestedItem depth={1}>
              <Select
                label="Marges"
                options={MARGIN_STATE_OPTIONS}
                value={state.microSatelliteMarginState}
                onChange={setField("microSatelliteMarginState")}
              />
            </NestedItem>
          ) : undefined}

          <HasInvasion
            value={state.hasLymphaticOrVascularInvasion}
            onChange={setField("hasLymphaticOrVascularInvasion")}
          />
          <HasEpn value={state.hasEpn} onChange={setField("hasEpn")} />
          <SelectList
            label="Autres lésions mélanocytaires associées"
            groups={MELANOCYTIC_LESION_GROUPS}
            values={state.otherMelanocyticLesions}
            onChange={setField("otherMelanocyticLesions")}
          />

          <InputExeresis
            state={state.specimenExeresis}
            isSpecimenOriented={state.isSpecimenOriented}
            setState={setField("specimenExeresis")}
          />
        </Section>
        {state.lymphNodeExeresis === "no" ? undefined : (
          <Section index={i++} title="Statut ganglionnaire">
            <InputNumber
              label="Nombre de ganglions étudiés"
              value={state.lymphNodeCount}
              onChange={setField("lymphNodeCount")}
            />
            <InputNumber
              label="Nombre de ganglions positifs"
              value={state.positiveLymphNodeCount}
              onChange={setField("positiveLymphNodeCount")}
            />
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
                  value={state.largestMetastasisSize}
                  onChange={setField("largestMetastasisSize")}
                />
              </NestedItem>
            ) : undefined}
          </Section>
        )}
        <Section index={i++} title="Techniques complémentaires">
          <Immunohistochemistry
            containerCount={state.blockCount}
            groups={INVASIVE_MELANOMA_ANTIBODY_GROUPS}
            properties={INVASIVE_MELANOMA_ANTIBODY_PROPERTIES}
            state={state.ihc}
            setState={setField("ihc")}
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
          index={i++}
          value={state.comments}
          onChange={setField("comments")}
        />
        {hasErrors ? undefined : (
          <Summary
            getContent={(language) =>
              generateReport({ form: { ...state, formId }, language })
            }
          />
        )}{" "}
      </Stack>
    </FormPage>
  );
};

type SpecimenState = Pick<
  FormState,
  | "specimenDimensions"
  | "lesionDimensions"
  | "lesionAspect"
  | "otherLesionAspect"
>;

const InputSpecimen = ({
  state,
  setState,
}: {
  state: SpecimenState;
  setState: (state: SpecimenState) => void;
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
          <Line>
            <InputNumber
              label="Longueur"
              unit="cm"
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
        </NestedItem>
      )}

      <Line>
        <Select
          label="Description macroscopique de la lésion"
          options={ASPECT_OPTIONS}
          value={state.lesionAspect}
          onChange={setField("lesionAspect")}
        />
        {state.lesionAspect === "other" ? (
          <InputText
            value={state.otherLesionAspect}
            onChange={setField("otherLesionAspect")}
          />
        ) : undefined}
      </Line>

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
          <Line>
            <InputNumber
              label="Longueur"
              unit="mm"
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
              value={state.lesionDimensions.width}
              onChange={(value) =>
                setField("lesionDimensions")({
                  ...state.lesionDimensions,
                  width: value,
                })
              }
            />
          </Line>
        </NestedItem>
      )}
    </>
  );
};

const InputThickness = ({
  state,
  setState,
}: {
  state: Thickness;
  setState: (state: Thickness) => void;
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
        />
      )}
    </>
  );
};

const InputBreslowThickness = ({
  state,
  setState,
}: {
  state: BreslowThickness;
  setState: (state: BreslowThickness) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Line>
      <Select
        options={BRESLOW_THICKNESS_TYPE_OPTIONS}
        label="Épaisseur selon Breslow"
        value={state.type}
        onChange={setField("type")}
      />
      <InputNumber
        value={state.distance}
        unit="mm"
        onChange={setField("distance")}
      />
      {state.distance > 0 ? (
        <Select
          options={MORPHOLOGY_OPTIONS}
          value={state.morphology}
          onChange={setField("morphology")}
        />
      ) : undefined}
    </Line>
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
      options={EXERESIS_POSITION_OPTIONS}
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
          arrivant au contact de la limite latérale {inputDistanceLateral}. La
          limite chirurgicale profonde passe en zone saine avec une marge
          minimale de {inputDistanceDepth}.
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

const InputExeresis = ({
  state,
  setState,
  isSpecimenOriented,
}: {
  state: SpecimenExeresis;
  setState: (state: SpecimenExeresis) => void;
  isSpecimenOriented: boolean;
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
        {/* CAUTION: this div is necessary for wrapping */}
        <div>
          <ExeresisTypeDescription state={state} setState={setState} />
        </div>
      </NestedItem>
    </>
  );
};
