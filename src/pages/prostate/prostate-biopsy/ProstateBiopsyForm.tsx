import { Mode } from "fs";
import { useMemo, useState } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { ModePicker } from "../../../common/ModePicker";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { IhcState } from "../../../common/immunohistochemistry/helpers";
import { validateIhc } from "../../../common/immunohistochemistry/validation";
import {
  DEFAULT_LANGUAGE,
  FORM_MAX_WIDTH,
  InputNumber,
  Language,
  NestedItem,
  Section,
  Select,
  SelectBoolean,
  SelectNumber,
  Stack,
  Summary,
  ValidationErrors,
  isDebug,
  noop,
  patchState,
  range,
  sum,
  sumArrays,
  useForm,
} from "../../../ui";
import { reduceErrors } from "../../../validation";
import {
  PROSTATE_ANTIBODY_GROUPS,
  PROSTATE_ANTIBODY_PROPERTIES,
  TUMOR_TYPES,
  TumorType,
} from "../helpers";
import { PiradsSelect } from "./PiradsSelect";
import { ProstateBiopsyTable } from "./ProstateBiopsyTable";
import {
  CONTAINER_COUNT_OPTIONS,
  LOCATIONS,
  MAX_TARGET_COUNT,
  PiradsItem,
  ProstateBiopsyFormId,
  Row,
  RowWithMetadata,
  Score,
  anEmptyPiradsItem,
  anEmptyRow,
  getMaximumByGleasonScore,
} from "./helpers";
import { generateReport } from "./report";
import { validateBiopsyTable } from "./validation";

// TODO clean: test extensively
// CAUTION: be very cautious about counting only visible items
const getScore = (rows: Row[]): Score => {
  // CAUTION: only count non-disabled rows (i.e. the ones with a tumorCount)
  const rowsWithTumor = rows.filter((row) => row.tumorCount);
  const tumorCount = sum(rows.map((row) => row.tumorCount));
  const tumorScore = tumorCount
    ? {
        tumorSize: sumArrays(rowsWithTumor.map((row) => row.tumorSize)),
        tumorGleason: getMaximumByGleasonScore(
          rowsWithTumor.map((row) => row.tumorGleason),
        ),
        tumorEpn: rowsWithTumor.map((row) => row.tumorEpn).some(Boolean),
        tumorTep: rowsWithTumor.map((row) => row.tumorTep).some(Boolean),
      }
    : {};

  return {
    biopsyCount: sum(rows.map((row) => row.biopsyCount)),
    // CAUTION: only count visible inputs for size (not the hidden ones)
    biopsySize: sumArrays(
      rows.map((row) => row.biopsySize.slice(0, row.biopsyCount)),
    ),
    tumorCount,
    ...tumorScore,
  };
};

export type FormState = {
  // Clinical info
  // Standard mode
  clinicalInfo: string;

  // Expert mode
  hasInfo: boolean;
  hasTarget: boolean;
  targetCount: number;
  hasMri: boolean;
  psaRate: number;
  containerCount: number;
  piradsItems: PiradsItem[];

  // Biopsy table
  rows: Row[];
  tumorType: TumorType;

  // Immunohistochemistry
  ihc: IhcState;

  // Additional comments
  comments: string;
};

const getPiradsItems = () => range(MAX_TARGET_COUNT).map(anEmptyPiradsItem);

const getRows = () => [
  // 6 sextants (each for one location)
  ...LOCATIONS.map((location, index) =>
    anEmptyRow({ index, location, type: "sextant" }),
  ),
  // 3 targets
  ...range(MAX_TARGET_COUNT).map((_, index) =>
    anEmptyRow({ index: index + LOCATIONS.length, type: "target" }),
  ),
];

const getInitialState = (): FormState => ({
  clinicalInfo: "",
  hasInfo: isDebug,
  hasTarget: isDebug,
  targetCount: 0,
  hasMri: isDebug,
  psaRate: 0,
  containerCount: 6, // Minimum value
  piradsItems: getPiradsItems(),
  rows: getRows(),
  tumorType: "acinar-adenocarcinoma-conventional",
  ihc: {
    hasIhc: false,
    blocks: [],
  },
  comments: "",
});

type Props = {
  formId: ProstateBiopsyFormId;
};

// TODO CLEAN: refactor ModePicker
export const ProstateBiopsyForm = ({ formId }: Props) => {
  const [mode, setMode] = useState<Mode>();

  if (typeof mode === "undefined") {
    return (
      <FormPage formId={formId} isPickingMode onClear={noop}>
        <ModePicker onPick={setMode} />
      </FormPage>
    );
  }

  return <ProstateBiopsyFormContent formId={formId} mode={mode} />;
};

const ProstateBiopsyFormContent = ({
  formId,
  mode,
}: {
  formId: ProstateBiopsyFormId;
  mode: Mode;
}) => {
  const isExpertMode = mode === "expert";

  const sextantName =
    formId === "prostate-biopsy-transrectal"
      ? "sextant"
      : "biopsie systématique";

  // State
  const { state, setState, setField, clearState } = useForm(getInitialState);
  const {
    clinicalInfo,
    piradsItems,
    containerCount,
    targetCount,
    tumorType,
    ihc,
    comments,
  } = state;

  const rows: RowWithMetadata[] = useMemo(
    () =>
      state.rows.map((row) => ({
        ...row,
        biopsySizeInputCount: isExpertMode
          ? row.biopsyCount
          : Math.min(row.biopsyCount, 1),
        tumorSizeInputCount: isExpertMode
          ? row.tumorCount
          : Math.min(row.tumorCount, 1),
      })),
    [isExpertMode, state.rows],
  );

  // Computed
  // TODO clean: consider extracting this as one function

  const visibleRows = useMemo(
    () => rows.slice(0, containerCount),
    [rows, containerCount],
  );
  const visiblePiradsItems = useMemo(
    () => piradsItems.slice(0, targetCount),
    [piradsItems, targetCount],
  );
  const score = getScore(visibleRows);
  const biopsyTableErrors = validateBiopsyTable({
    sextantName,
    containerCount,
    tumorType,
    rows: visibleRows,
    piradsItems: visiblePiradsItems,
  });
  const ihcErrors = validateIhc(ihc);
  const hasErrors = reduceErrors(biopsyTableErrors) || reduceErrors(ihcErrors);

  const getReportContent = (language: Language) =>
    generateReport(
      {
        formId,
        ...state,
        score,
        piradsItems: visiblePiradsItems,
        rows: visibleRows,
      },
      language,
      isExpertMode,
    );

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        {isExpertMode ? (
          <ClinicalInfoExpert
            index={1}
            formId={formId}
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

        <Section title="Biopsies" index={2}>
          {/* CAUTION:
          This question is redundant with some previous questions but it is on
          done on purpose, as info given to anatomical pathologists is not
          always standardized.
        */}
          <Select
            value={containerCount}
            // FIXME: reword
            label="Combien de pots avez-vous ?"
            options={CONTAINER_COUNT_OPTIONS}
            onChange={setField("containerCount")}
          />
        </Section>

        <Stack spacing="md">
          {/* NOTE: the table can extend beyond FORM_MAX_WIDTH for better UX */}
          <ProstateBiopsyTable
            formId={formId}
            language={DEFAULT_LANGUAGE}
            rows={rows}
            visibleRowCount={containerCount}
            score={score}
            onChange={setField("rows")}
            errors={biopsyTableErrors.rows}
          />
          <Stack maxWidth={FORM_MAX_WIDTH} spacing="md">
            {score.tumorCount ? (
              <Select
                label="Type histologique de la tumeur"
                options={TUMOR_TYPES}
                value={tumorType}
                onChange={setField("tumorType")}
              />
            ) : undefined}
            <ValidationErrors
              header="Le tableau comporte les erreurs suivantes :"
              errors={biopsyTableErrors.errors}
            />
          </Stack>
        </Stack>

        <Section title="Immunohistochimie" index={3}>
          <Immunohistochemistry
            containerCount={containerCount}
            groups={PROSTATE_ANTIBODY_GROUPS}
            properties={PROSTATE_ANTIBODY_PROPERTIES}
            state={ihc}
            setState={setField("ihc")}
            errors={ihcErrors}
          />
        </Section>

        <AdditionalRemarks
          index={4}
          value={comments}
          onChange={setField("comments")}
        />

        {hasErrors ? undefined : (
          <Summary
            getContent={getReportContent}
            // NOTE: the table can extend beyond FORM_MAX_WIDTH for better UX
            getTable={(language) => (
              <ProstateBiopsyTable
                formId={formId}
                language={language}
                visibleRowCount={containerCount}
                rows={rows}
                score={score}
                isReadOnly
                onChange={noop}
              />
            )}
          />
        )}
      </Stack>
    </FormPage>
  );
};

type ClinicalInfoState = Pick<
  FormState,
  "hasInfo" | "hasTarget" | "targetCount" | "hasMri" | "psaRate" | "piradsItems"
>;

const ClinicalInfoExpert = ({
  index,
  formId,
  state,
  setState,
}: {
  index?: number;
  formId: ProstateBiopsyFormId;
  state: ClinicalInfoState;
  setState: (state: ClinicalInfoState) => void;
}) => {
  const setField = patchState(state, setState);
  const { hasInfo, hasTarget, targetCount, hasMri, psaRate, piradsItems } =
    state;

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [...piradsItems];
    updatedArray[index] = value;
    setField("piradsItems")(updatedArray);
  };

  return (
    <Section title="Renseignements cliniques" index={index}>
      <SelectBoolean
        value={hasInfo}
        label="Avez-vous des renseignements cliniques ?"
        onChange={setField("hasInfo")}
      />
      {hasInfo ? (
        <>
          <InputNumber
            value={psaRate}
            label="Taux de PSA"
            unit="ng-per-mL"
            size="lg"
            isDecimal
            onChange={setField("psaRate")}
          />
          <SelectBoolean
            value={hasMri}
            label="Avez-vous une IRM ?"
            onChange={setField("hasMri")}
          />
          {hasMri ? (
            <>
              <SelectBoolean
                value={hasTarget}
                label="Avez-vous au moins une cible ?"
                onChange={setField("hasTarget")}
              />
              {hasTarget ? (
                <>
                  <SelectNumber
                    value={targetCount}
                    label="Nombre de cibles"
                    max={MAX_TARGET_COUNT}
                    onChange={setField("targetCount")}
                  />
                  {targetCount ? (
                    <NestedItem>
                      <PiradsSelect
                        formId={formId}
                        visibleRowCount={targetCount}
                        items={piradsItems}
                        onChange={onUpdatePiradsItem}
                      />
                    </NestedItem>
                  ) : undefined}
                </>
              ) : undefined}
            </>
          ) : undefined}
        </>
      ) : undefined}
    </Section>
  );
};
