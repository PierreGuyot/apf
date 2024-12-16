import {
  ErrorList,
  InputNumber,
  InputText,
  InputTextArea,
  Line,
  NestedItem,
  patchState,
  Section,
  Select,
  SelectBoolean,
  SelectTroolean,
  Stack,
} from "../../../../ui";
import {
  ASPECT_OPTIONS,
  DIMENSION_2D_OPTIONS,
  DIMENSION_3D_OPTIONS,
  Inking,
  INKING_COLORS_OPTIONS,
  ORIENTATION_METHOD_OPTIONS,
  ORIENTATION_OPTIONS,
} from "../helpers";
import { MacroscopyState } from "./state";
import { MacroscopyErrors } from "./validation";

type Props = {
  index: number;
  state: MacroscopyState;
  setState: (value: MacroscopyState) => void;
  errors: MacroscopyErrors;
};

// FIXME: translate form
export const Macroscopy = ({ index, state, setState, errors }: Props) => {
  const setField = patchState(state, setState);

  return (
    <Section index={index} title="Macroscopie">
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
  );
};

type SpecimenState = Pick<
  MacroscopyState,
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
