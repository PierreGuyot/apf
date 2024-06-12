import { useMemo } from "react";
import { AdditionalRemarks } from "../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../common/ClinicalInfo";
import { FormPage } from "../../common/FormPage";
import { SelectLymphaticOrVascularInvasion } from "../../common/SelectLymphaticOrVascularInvasion";
import { SelectPerineuralInvasion } from "../../common/SelectPerineuralInvasion";
import { InputNumber } from "../../ui/InputNumber";
import { Line } from "../../ui/Line";
import { Section } from "../../ui/Section";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { SubSection } from "../../ui/SubSection";
import { Summary } from "../../ui/Summary";
import { patchArray, range } from "../../ui/helpers/helpers";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { SetState, useForm } from "../../ui/helpers/use-form";
import { InkingSection, InkingState } from "./InkingSection";
import { SelectClarkInfiltrationLevel } from "./SelectClarkInfiltrationLevel";
import {
  ANGLE_OPTIONS,
  Angle,
  BIOPSY_TYPES,
  BiopsyType,
  CLARK_INFILTRATION_LEVELS,
  CUTANEOUS_DISEASE_TYPES,
  ClarkInfiltrationLevel,
  CutType,
  CutaneousDiseaseType,
  EXCISION_TYPES,
  ExcisionType,
  INCLUSION_TYPES,
  InclusionType,
  LESION_ASPECT_TYPES,
  LESION_TYPES,
  LIMIT_OPTIONS,
  LesionAspectType,
  LesionType,
  Limit,
  ORIENTATION_TYPES,
  OrientationType,
  TUMOR_PROPERTIES,
  TUMOR_TYPE_OPTIONS,
  TumorType,
  getCutTypes,
} from "./helpers";
import { generateReport } from "./report";

const FORM_ID = "dermatology";

// TODO: translate
type OperationType = "biopsy" | "excision" | "recoupe" | "shaving";
const OPERATION_TYPES: Option<OperationType>[] = [
  { value: "biopsy", label: "Biopsie" },
  { value: "excision", label: "Exérèse" },
  { value: "recoupe", label: "Recoupe" },
  { value: "shaving", label: "Shaving" },
];

type MarginPosition = Angle | Limit;
const MARGIN_POSITIONS = [...LIMIT_OPTIONS, ...ANGLE_OPTIONS];

type TumorData = {
  mainTumorType: TumorType;
  secondaryTumorType: TumorType;
  excisionType: ExcisionType;

  minDepthMargin: number;
  minSideMargin: number;
  marginPosition: MarginPosition;

  // Dynamic fields
  hasLymphaticOrVascularInvasion: boolean;
  hasEpn: boolean;
  infiltrationLevel: ClarkInfiltrationLevel;
};

type OperationState = {
  type: OperationType;

  // Micro biopsy
  lesionType: LesionType;
  lesionCount: number;
  cutaneousDiseaseType: CutaneousDiseaseType;
  tumors: TumorData[];

  // Macro biopsy
  biopsyType: BiopsyType;
  biopsySize: number;

  // Macro excision
  skinFlapDimensions: [number, number, number];
  isLesionVisible: boolean;
  lesionAspectType: LesionAspectType;
  limitDistance: number;
  // TODO: use Angle type
  limitAngle: number; // Hour-like notation
  isOriented: boolean;
  orientationType: OrientationType;
  // TODO: use Angle type
  orientationAngle: number; // Hour-like notation
  cassetteCount: number;
  inclusionType: InclusionType;
  cutType: CutType;
  inkings: InkingState;
};

export type FormState = {
  clinicalInfo: string;
  containerCount: number;
  operations: OperationState[];
  comment: string;
};

const anEmptyTumor = (): TumorData => ({
  mainTumorType: "Angioléiomyome",
  secondaryTumorType: "Angioléiomyome",
  excisionType: "complete",
  minDepthMargin: 0,
  minSideMargin: 0,
  marginPosition: MARGIN_POSITIONS[0].value,

  // Dynamic fields
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  infiltrationLevel: CLARK_INFILTRATION_LEVELS[0].value,
});

const DEFAULT_ANGLE = 12; // Hour-like notation

// We use unreasonably high maximums to cover all cases
const MAX_OPERATION_COUNT = 20;
const MAX_CONTAINER_COUNT = 20;
const MAX_LESION_COUNT = 20;

const getOperation = (): OperationState => ({
  type: "biopsy",

  biopsyType: "punch",
  biopsySize: 0,

  skinFlapDimensions: [0, 0, 0],
  isLesionVisible: false,
  lesionAspectType: "Nodulaire",
  limitDistance: 0,
  limitAngle: DEFAULT_ANGLE,
  isOriented: false,
  orientationType: "thread-one",
  orientationAngle: DEFAULT_ANGLE,
  cassetteCount: 0,
  inclusionType: "full",
  cutType: "transverse",

  lesionType: "tumor",
  lesionCount: 1,
  cutaneousDiseaseType: "eczema",
  tumors: range(MAX_LESION_COUNT).map(anEmptyTumor),
  inkings: {
    hasInking: false,
    inkings: [],
  },
});

const getInitialState = (): FormState => ({
  clinicalInfo: "",
  containerCount: 1,
  operations: range(MAX_OPERATION_COUNT).map(getOperation),
  comment: "",
});

export const DermatologyForm = () => {
  const { state, setState, clearState } = useForm(getInitialState);
  const { clinicalInfo, containerCount, operations } = state;

  return (
    <FormPage formId={FORM_ID} onClear={clearState}>
      <ClinicalInfo value={clinicalInfo} onChange={setState("clinicalInfo")} />

      <Section>
        {/* TODO: use SelectNumber? */}
        {/* TODO with Louis: confirm min and max values */}
        <Line>
          Combien de pots avez-vous ?{}
          <InputNumber
            value={containerCount}
            min={1}
            max={MAX_CONTAINER_COUNT}
            onChange={setState("containerCount")}
          />
        </Line>
      </Section>

      {operations.slice(0, containerCount).map((operation, index) => {
        const setOperation = (value: OperationState) =>
          setState("operations")(
            patchArray(state.operations, index, () => value),
          );

        return (
          <OperationForm
            key={index}
            index={index}
            operation={operation}
            setOperation={setOperation}
          />
        );
      })}

      <AdditionalRemarks
        index={containerCount + 1}
        value={state.comment}
        onChange={setState("comment")}
      />

      <Summary
        getContent={(language) =>
          generateReport({ ...state, formId: FORM_ID, language })
        }
      />
    </FormPage>
  );
};

// TODO: un-mock
const getTitle = (operation: OperationState): string => {
  return "TODO: title";
};

const OperationForm = ({
  index,
  operation,
  setOperation,
}: {
  operation: OperationState;
  setOperation: (value: OperationState) => void;
  index: number;
}) => {
  const title = getTitle(operation);

  // TODO clean: extract dedicated state helper
  const setOperationState: SetState<OperationState> = (key) => (value) =>
    setOperation({ ...operation, [key]: value });

  const Component = useMemo(() => {
    switch (operation.type) {
      case "biopsy": {
        return MacroBiopsyForm;
      }

      case "excision":
      case "shaving": {
        return MacroExcisionForm;
      }

      case "recoupe": {
        return MacroRecoupeForm;
      }
    }
  }, [operation.type]);

  return (
    <Section title={title} index={index + 1}>
      <Line>
        <Select
          name="Type d'opération"
          label="Quel est le type d'opération ?"
          value={operation.type}
          options={OPERATION_TYPES}
          onChange={setOperationState("type")}
        />
      </Line>

      <SubSection title="Macroscopie">
        <Component {...operation} setState={setOperationState} />
      </SubSection>
      <SubSection title="Microscopie">
        <MicroscopyForm {...operation} setState={setOperationState} />
      </SubSection>
    </Section>
  );
};

const MacroBiopsyForm = ({
  biopsyType,
  biopsySize,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <>
      <Line>
        Une biopsie au{" "}
        <Select
          name="Type de biopsie"
          value={biopsyType}
          options={BIOPSY_TYPES}
          onChange={setState("biopsyType")}
        />{" "}
        de <InputNumber value={biopsySize} onChange={setState("biopsySize")} />
        mm a été incluse en totalité (formol tamponné)
      </Line>
    </>
  );
};

const MacroExcisionForm = ({
  skinFlapDimensions,
  isLesionVisible,
  lesionAspectType,
  limitDistance,
  limitAngle,
  isOriented,
  orientationType,
  orientationAngle,
  cassetteCount,
  inclusionType,
  cutType,
  inkings,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <>
      <Line>
        {/* TODO: check unit and translation with Louis */}
        Combien mesure le lambeau cutané ?
        <InputNumber
          value={skinFlapDimensions[0]}
          onChange={(value) =>
            setState("skinFlapDimensions")([
              value,
              skinFlapDimensions[1],
              skinFlapDimensions[2],
            ])
          }
        />
        x{" "}
        <InputNumber
          value={skinFlapDimensions[1]}
          onChange={(value) =>
            setState("skinFlapDimensions")([
              skinFlapDimensions[0],
              value,
              skinFlapDimensions[2],
            ])
          }
        />{" "}
        x{" "}
        <InputNumber
          value={skinFlapDimensions[2]}
          onChange={(value) =>
            setState("skinFlapDimensions")([
              skinFlapDimensions[0],
              skinFlapDimensions[1],
              value,
            ])
          }
        />{" "}
        cm
      </Line>
      <Line>
        <Select
          name="Visibilité de la lésion"
          label="La lésion est-elle visible ?"
          value={isLesionVisible}
          options={YES_NO_OPTIONS}
          onChange={setState("isLesionVisible")}
        />
      </Line>

      {isLesionVisible ? (
        <>
          <Line>
            <Select
              name="Aspect de la lésion"
              label="Quel est l'aspect de la lésion ?"
              value={lesionAspectType}
              options={LESION_ASPECT_TYPES}
              onChange={setState("lesionAspectType")}
            />
          </Line>
          <Line>
            Quelle est la limite au plus proche ? Située à{" "}
            <InputNumber
              value={limitDistance}
              onChange={setState("limitDistance")}
            />
            cm de la limite à{" "}
            {/* TODO: extract SelectAngle component (including `à`) */}
            <SelectNumber
              name="Angle à la limite"
              value={limitAngle}
              max={12}
              onChange={setState("limitAngle")}
            />
            h
          </Line>
        </>
      ) : undefined}

      <Line>
        <Select
          name="Orientation de l'exèrèse"
          label="Votre exérèse est-elle orientée ?"
          value={isOriented}
          options={YES_NO_OPTIONS}
          onChange={setState("isOriented")}
        />
      </Line>

      {isOriented ? (
        <Line>
          Quelle est l'orientation de votre prélèvement ?
          <Select
            name="Orientation du prélèvement"
            value={orientationType}
            options={ORIENTATION_TYPES}
            onChange={setState("orientationType")}
          />
          à {/* TODO: extract SelectAngle component (including `à`) */}
          <SelectNumber
            name="Angle du prèlèvement limite"
            value={orientationAngle}
            max={12}
            onChange={setState("orientationAngle")}
          />
          h
        </Line>
      ) : undefined}

      <Line>
        <SelectNumber
          name="Nombre de cassettes"
          label="Combien de cassettes avez-vous réalisées sur cette pièce ?"
          value={cassetteCount}
          max={10}
          onChange={setState("cassetteCount")}
        />
      </Line>
      <Line>
        <Select
          name="Type d'inclusion"
          label="La pièce a-t-elle été incluse en totalité ?"
          value={inclusionType}
          options={INCLUSION_TYPES}
          onChange={setState("inclusionType")}
        />
      </Line>
      <Line>
        <Select
          label="Comment le prélèvement a-t-il été inclus ?"
          name="Type de coupe"
          value={cutType}
          options={getCutTypes(isOriented)}
          onChange={setState("cutType")}
        />
      </Line>

      <InkingSection state={inkings} setState={setState("inkings")} />
    </>
  );
};

// TODO: translate recoupe (re-cut?)
const MacroRecoupeForm = ({
  setState,
}: {
  setState: SetState<OperationState>;
}) => {
  return <>TODO: MacroRecoupeForm</>;
};

const MicroscopyForm = ({
  isOriented,
  type: operationType,
  lesionType,
  lesionCount,
  tumors,
  cutaneousDiseaseType,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <>
      <Line>
        <Select
          name="Type de la lésion"
          label="Quel est le type de lésion ?"
          value={lesionType}
          options={LESION_TYPES}
          onChange={setState("lesionType")}
        />
      </Line>

      {lesionType === "tumor" ? (
        <>
          <Line>
            <InputNumber
              label="Combien de lésions sont présentes sur le prélèvement ?"
              value={lesionCount}
              min={1}
              max={MAX_LESION_COUNT}
              onChange={setState("lesionCount")}
            />
          </Line>

          {tumors.slice(0, lesionCount).map((tumor, index) => (
            <TumoralLesionSection
              key={index}
              index={index}
              isOriented={isOriented}
              operationType={operationType}
              state={tumor}
              setState={(value) => {
                const updatedTumors = [...tumors];
                updatedTumors[index] = value;
                setState("tumors")(updatedTumors);
              }}
            />
          ))}
        </>
      ) : lesionType === "inflammation" ? (
        <>
          <Line>
            <Select
              name="Type de maladie cutanée"
              label="Quel est le type de maladie cutanée ?"
              value={cutaneousDiseaseType}
              options={CUTANEOUS_DISEASE_TYPES}
              onChange={setState("cutaneousDiseaseType")}
            />
          </Line>
          <>TODO: complete Inflammation</>
        </>
      ) : (
        <>TODO: complete ForeignBody</>
      )}
    </>
  );
};

const TumoralLesionSection = ({
  index,
  operationType,
  isOriented,
  state,
  setState: _setState,
}: {
  index: number;
  operationType: OperationType;
  isOriented: boolean;
  state: TumorData;
  setState: (tumor: TumorData) => void;
}) => {
  const {
    mainTumorType,
    secondaryTumorType,
    excisionType,
    minDepthMargin,
    minSideMargin,
    marginPosition,
    hasLymphaticOrVascularInvasion,
    hasEpn,
    infiltrationLevel,
  } = state;

  // TODO clean: extract dedicated state helper
  const setState: SetState<TumorData> = (key) => (value) =>
    _setState({ ...state, [key]: value });

  const {
    hasSelectLymphaticOrVascularInvasion,
    hasSelectPerineuralInvasion,
    hasSelectClarkInfiltrationLevel,
  } = TUMOR_PROPERTIES[mainTumorType];

  return (
    <SubSection>
      {/* TODO clean: improve styling */}
      <Line>
        <b>Lésion {index + 1}</b>
      </Line>
      <Line>
        <Select
          name="Type de la tumeur cutanée principale"
          label="Quel est le type de la tumeur cutanée principale ?"
          value={mainTumorType}
          options={TUMOR_TYPE_OPTIONS}
          onChange={setState("mainTumorType")}
        />
      </Line>
      <Line>
        <Select
          name="Type des tumeurs cutanées adjacentes"
          label="Quel est le type des tumeurs cutanées adjacentes ?"
          value={secondaryTumorType}
          options={TUMOR_TYPE_OPTIONS}
          onChange={setState("secondaryTumorType")}
        />
      </Line>
      <Line>
        <Select
          name="Type d'exérèse"
          label="Préciser l'exérèse de la lésion :"
          value={excisionType}
          options={EXCISION_TYPES}
          onChange={setState("excisionType")}
        />
      </Line>

      {/*
        Only display this section if the:
        - Operation type is not a biopsy
        - Excision type has margins
      */}
      {operationType !== "biopsy" && excisionType !== "complete" ? (
        <>
          <Line>
            <InputNumber
              label="Taille de la marge latérale minimale"
              value={minDepthMargin}
              onChange={setState("minDepthMargin")}
              unit="mm"
            />
            {isOriented ? (
              <Select
                name="Position de la marge latérale minimale"
                options={MARGIN_POSITIONS}
                value={marginPosition}
                onChange={setState("marginPosition")}
              />
            ) : undefined}
          </Line>
          <Line>
            <InputNumber
              label="Préciser la marge profonde minimale"
              value={minSideMargin}
              onChange={setState("minSideMargin")}
              unit="mm"
            />
          </Line>
        </>
      ) : undefined}

      {hasSelectLymphaticOrVascularInvasion ? (
        <Line>
          <SelectLymphaticOrVascularInvasion
            value={hasLymphaticOrVascularInvasion}
            onChange={setState("hasLymphaticOrVascularInvasion")}
          />
        </Line>
      ) : undefined}
      {hasSelectPerineuralInvasion ? (
        <Line>
          <SelectPerineuralInvasion
            value={hasEpn}
            onChange={setState("hasEpn")}
          />
        </Line>
      ) : undefined}
      {hasSelectClarkInfiltrationLevel ? (
        <Line>
          <SelectClarkInfiltrationLevel
            value={infiltrationLevel}
            onChange={setState("infiltrationLevel")}
          />
        </Line>
      ) : undefined}
    </SubSection>
  );
};
