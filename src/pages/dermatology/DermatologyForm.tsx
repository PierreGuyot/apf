import { useMemo } from "react";
import { AdditionalRemarks } from "../../common/AdditionalRemarks";
import { Banner } from "../../ui/Banner";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Line } from "../../ui/Line";
import { Page } from "../../ui/Page";
import { Section } from "../../ui/Section";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { SubSection } from "../../ui/SubSection";
import { Summary } from "../../ui/Summary";
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
  EXCISION_TYPES,
  ExcisionType,
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
import { generateReport } from "./report";
import { ClinicalInfo } from "../../common/ClinicalInfo";

const FORM_ID = "dermatology";

// TODO: translate
type OperationType = "biopsy" | "excision" | "recoupe" | "shaving";
const OPERATION_TYPES: Option<OperationType>[] = [
  { value: "biopsy", label: "Biopsie" },
  { value: "excision", label: "Exérèse" },
  { value: "recoupe", label: "Recoupe" },
  { value: "shaving", label: "Shaving" },
];

type OperationState = {
  type: OperationType;

  // Micro biopsy
  lesionType: LesionType;
  lesionCount: number;
  tumorType: TumorType;
  excisionType: ExcisionType;
  cutaneousDiseaseType: CutaneousDiseaseType;

  // Macro biopsy
  biopsyType: BiopsyType;
  biopsySize: number;

  // Macro excision
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

export type FormState = {
  clinicalInfo: string;
  containerCount: number;
  operations: OperationState[];
  comment: string;
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
  excisionType: "complete",
  cutaneousDiseaseType: "eczema",
});

const MAX_OPERATION_COUNT = 5;

const getInitialState = (): FormState => ({
  clinicalInfo: "",
  containerCount: 1,
  operations: range(MAX_OPERATION_COUNT).map(getOperation),
  comment: "",
});

export const DermatologyForm = () => {
  const form = FORMS[FORM_ID];
  const { state, setState, clearState } = useForm(getInitialState);
  const { clinicalInfo, containerCount, operations } = state;

  return (
    <Page title={form.title}>
      <Banner formId={FORM_ID} onClear={clearState} />

      <ClinicalInfo value={clinicalInfo} onChange={setState("clinicalInfo")} />

      <Section>
        {/* TODO: use SelectNumber? */}
        {/* TODO with Louis: confirm min and max values */}
        <Line>
          Combien de pots avez-vous ?{}
          <InputNumber
            value={containerCount}
            min={1}
            max={5}
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
    </Page>
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
  const setOperationState: SetState<OperationState> = (key) => (value) =>
    setOperation({ ...operation, [key]: value });

  const Component = useMemo(() => {
    switch (operation.type) {
      case "biopsy": {
        return MacroBiopsyForm;
      }
      case "excision": {
        return MacroExcisionForm;
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
    <Section>
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
    </>
  );
};

const MacroShavingForm = ({
  setState,
}: {
  setState: SetState<OperationState>;
}) => {
  return <>TODO: MacroShavingForm</>;
};

// TODO: translate recoupe
const MacroRecoupeForm = ({
  setState,
}: {
  setState: SetState<OperationState>;
}) => {
  return <>TODO: MacroRecoupeForm</>;
};

const MicroscopyForm = ({
  lesionType,
  lesionCount,
  tumorType,
  excisionType,
  cutaneousDiseaseType,
  setState,
}: OperationState & { setState: SetState<OperationState> }) => {
  return (
    <>
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
              value={excisionType}
              options={EXCISION_TYPES}
              onChange={setState("excisionType")}
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
        <>TODO: complete</>
      )}
    </>
  );
};
