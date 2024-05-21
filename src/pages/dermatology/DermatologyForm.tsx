import { useMemo } from "react";
import { Banner } from "../../ui/Banner";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Page } from "../../ui/Page";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Title } from "../../ui/Title";
import { FORMS } from "../../ui/helpers/forms";
import { patchArray, range } from "../../ui/helpers/helpers";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { SetState, useForm } from "../../ui/helpers/use-form";
import {
  BIOPSY_TYPES,
  BiopsyType,
  CUTANEOUS_DISEASE_TYPES,
  CutType,
  CutaneousDiseaseType,
  EXERESIS_TYPES,
  ExeresisType,
  INCLUSION_TYPES,
  InclusionType,
  LESION_ASPECT_TYPES,
  LESION_TYPES,
  LesionAspectType,
  LesionType,
  ORIENTATION_TYPES,
  OrientationType,
  TUMOR_TYPES,
  TumorType,
  getCutTypes,
} from "./helpers";

const FORM_ID = "dermatology";

type OperationType =
  | "biopsy"
  | "exeresis"
  | "recoupe" // TODO: translate
  | "shaving";
const OPERATION_TYPES: Option<OperationType>[] = [
  { value: "biopsy", label: "Biopsie" },
  { value: "exeresis", label: "Exérèse" },
  { value: "recoupe", label: "Recoupe" },
  { value: "shaving", label: "Shaving" },
];

type OperationState = {
  type: OperationType;

  // Micro biopsy
  lesionType: LesionType;
  lesionCount: number;
  tumorType: TumorType;
  exeresisType: ExeresisType;
  cutaneousDiseaseType: CutaneousDiseaseType;

  // Macro biopsy
  biopsyType: BiopsyType;
  biopsySize: number;

  // Macro exeresis
  skinFlapDimensions: [number, number, number];
  isLesionVisible: boolean;
  lesionAspectType: LesionAspectType;
  limitDistance: number;
  limitAngle: number; // Hour-like notation
  isOriented: boolean;
  orientationType: OrientationType;
  orientationAngle: number; // Hour-like notation
  cassetteCount: number;
  inclusionType: InclusionType;
  cutType: CutType;
};

// TODO: break into reusable sub-forms
type FormState = {
  clinicalInfo: string;
  containerCount: number;
  operations: OperationState[];
};

const DEFAULT_ANGLE = 12; // Hour-like notation

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
  tumorType: "basal-cell-carcinoma-superficial",
  exeresisType: "complete",
  cutaneousDiseaseType: "eczema",
});

const MAX_OPERATION_COUNT = 5;

// TODO: use first value of option arrays
const getInitialState = (): FormState => ({
  clinicalInfo: "",
  containerCount: 0,
  operations: range(MAX_OPERATION_COUNT).map(getOperation),
});

export const DermatologyForm = () => {
  const form = FORMS[FORM_ID];
  const { state, setState, clearState } = useForm(getInitialState);
  const { clinicalInfo, containerCount, operations } = state;

  return (
    <Page title={form.title}>
      <Banner formId={FORM_ID} onClear={clearState} />

      <Item>
        <InputTextArea
          label="Renseignements cliniques"
          value={clinicalInfo}
          placeholder="TODO"
          onChange={setState("clinicalInfo")}
        />
      </Item>

      <Line>
        Combien de pots avez-vous ?{/* TODO: use SelectNumber? */}
        <InputNumber
          value={containerCount}
          max={5} // TODO with Louis: confirm value
          onChange={setState("containerCount")}
        />
      </Line>

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
    </Page>
  );
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
  const title = "TODO: title";
  const setOperationState: SetState<OperationState> = (key) => (value) =>
    setOperation({ ...operation, [key]: value });

  const Component = useMemo(() => {
    switch (operation.type) {
      case "biopsy": {
        return MacroBiopsyForm;
      }
      case "exeresis": {
        return MacroExeresisForm;
      }
      case "recoupe": {
        return MacroRecoupeForm;
      }
      case "shaving": {
        return MacroShavingForm;
      }
    }
  }, [operation.type]);

  return (
    <>
      <Title title={title} index={index + 1} />
      <Line>
        Quel est le type d'opération ?{" "}
        <Select
          name="Type d'opération"
          value={operation.type}
          options={OPERATION_TYPES}
          onChange={setOperationState("type")}
        />
      </Line>

      <Title title="Macroscopie" size="sm" />
      <Component {...operation} setState={setOperationState} />
      <Title title="Microscopie" size="sm" />
      <MicroscopyForm {...operation} setState={setOperationState} />
    </>
  );
};

const MacroBiopsyForm = ({
  biopsyType,
  biopsySize,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <Item>
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
    </Item>
  );
};

const MacroExeresisForm = ({
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
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <Item>
      <Line>
        {/* TODO: check unit with Louis */}
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
        La lésion est-elle visible ?{" "}
        <Select
          name="Visibilité de la lésion"
          value={isLesionVisible}
          options={YES_NO_OPTIONS}
          onChange={setState("isLesionVisible")}
        />
      </Line>

      <Line>
        Quel est l'aspect de la lésion ?
        <Select
          name="Aspect de la lésion"
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
        <SelectNumber
          name="Angle à la limite"
          value={limitAngle}
          max={12}
          onChange={setState("limitAngle")}
        />
        h
      </Line>

      <Line>
        Votre exérèse est-elle orientée ?
        <Select
          name="Orientation de l'exèrèse"
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
          à{" "}
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
        Combien de cassettes avez-vous réalisées sur cette pièce ?
        <SelectNumber
          name="Nombre de cassettes"
          value={cassetteCount}
          max={10}
          onChange={setState("cassetteCount")}
        />
      </Line>
      <Line>
        La pièce a-t-elle été incluse en totalité ?{" "}
        <Select
          name="Type d'inclusion"
          value={inclusionType}
          options={INCLUSION_TYPES}
          onChange={setState("inclusionType")}
        />
      </Line>
      <Line>
        Comment le prélèvement a-t-il été inclus ?
        <Select
          name="Type de coupe"
          value={cutType}
          options={getCutTypes(isOriented)}
          onChange={setState("cutType")}
        />
      </Line>
    </Item>
  );
};

const MacroShavingForm = ({
  setState,
}: {
  setState: SetState<OperationState>;
}) => {
  return <Item>{/* TODO: complete */}</Item>;
};

// TODO: translate recoupe
const MacroRecoupeForm = ({
  setState,
}: {
  setState: SetState<OperationState>;
}) => {
  return <Item>{/* TODO: complete */}</Item>;
};

const MicroscopyForm = ({
  lesionType,
  lesionCount,
  tumorType,
  exeresisType,
  cutaneousDiseaseType,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <Item>
      <Line>
        Quel est le type de lésion ?{" "}
        <Select
          name="Type de la lésion"
          value={lesionType}
          options={LESION_TYPES}
          onChange={setState("lesionType")}
        />
      </Line>

      {lesionType === "tumor" ? (
        <>
          <Line>
            Combien de lésions sont présentes sur le prélèvement ?{" "}
            <InputNumber
              value={lesionCount}
              min={1}
              max={5}
              onChange={setState("lesionCount")}
            />
          </Line>
          <Line>
            Quel est le type de tumeur cutanée ?{" "}
            <Select
              name="Type de tumeur cutanée"
              value={tumorType}
              options={TUMOR_TYPES}
              onChange={setState("tumorType")}
            />
          </Line>
          <Line>
            Précisez l'exérèse de la lésion :{" "}
            <Select
              name="Type d'exérèse"
              value={exeresisType}
              options={EXERESIS_TYPES}
              onChange={setState("exeresisType")}
            />
          </Line>
        </>
      ) : lesionType === "inflammation" ? (
        <>
          <Line>
            Quel est le type de maladie cutanée ?{" "}
            <Select
              name="Type de maladie cutanée"
              value={cutaneousDiseaseType}
              options={CUTANEOUS_DISEASE_TYPES}
              onChange={setState("cutaneousDiseaseType")}
            />
          </Line>
        </>
      ) : (
        <>{/* TODO: complete */}</>
      )}
    </Item>
  );
};
